"use client";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUpload, FaEdit } from "react-icons/fa";
import "./profilesetting.css";
import { baseUrl } from "@/const";
import toast from 'react-hot-toast';
import { refreshAndDispatchUser } from "@/utils/refreshUser";

const ProfileSetting = () => {
  const user = useSelector((state) => state.user);
const dispatch = useDispatch();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
    twoStepEnabled: true,
  });

  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef();
const [passwordErrors, setPasswordErrors] = useState([]);

  useEffect(() => {
    if (user) {
      setForm({
        ...form,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        country: user.country || "",
      });
      setPreview(user.profileUrl || "");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    
   if (name === 'newPassword') {
    setPasswordErrors(validatePassword(value));
   }
  };
const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) errors.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errors.push('At least 1 uppercase letter');
    if (!/[a-z]/.test(password)) errors.push('At least 1 lowercase letter');
    if (!/[0-9]/.test(password)) errors.push('At least 1 number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.push('At least 1 special character');
    return errors;
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImg(file);
      setPreview(URL.createObjectURL(file));
    }
  };
const handleSubmit = async () => {
  setMessage({ type: "", text: "" });
  setLoading(true);

  const formChanged =
    form.firstName !== user.firstName ||
    form.lastName !== user.lastName ||
    form.email !== user.email ||
    form.country !== user.country ||
    profileImg;

  const passwordChanged =
    form.currentPassword &&
    form.newPassword &&
    form.repeatPassword;

  try {
    let somethingChanged = false;

    if (formChanged) {
      const profileForm = new FormData();
      profileForm.append("userId", user._id);
      profileForm.append("firstName", form.firstName);
      profileForm.append("lastName", form.lastName);
      profileForm.append("email", form.email);
      profileForm.append("country", form.country);
      if (profileImg) profileForm.append("profileImg", profileImg);

      const res = await fetch(`${baseUrl}/users/update-profile`, {
        method: "PUT",
        body: profileForm,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Profile updated successfully.");
      somethingChanged = true;
    }

    if (passwordChanged) {
        if (form.newPassword !== form.repeatPassword) {
    toast.error('New password and confirm password do not match.');
    return;
  }

      if (passwordErrors.length > 0) {
    toast.error('Please fix password requirements.');
    return;
  }  
if (form.currentPassword === form.newPassword) {
  toast.error('New password cannot be the same as your current password.');
  return;
} 
      const res = await fetch(`${baseUrl}/users/change-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmPassword:form.repeatPassword
        }),
         credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Password changed successfully.");
     setForm((prev) => ({
  ...prev,
  currentPassword: "",
  newPassword: "",
  repeatPassword: "",
}));
      somethingChanged = true;
    }

    if (!formChanged && !passwordChanged) {
      setMessage({ type: "error", text: "No changes detected." });
    }

    // 🔁 Refresh if either profile or password was updated
    if (somethingChanged) {
      refreshAndDispatchUser(dispatch);
    }

  } catch (err) {
    toast.error(err.message || "Something went wrong.");
  } finally {
    setLoading(false);
      setPasswordErrors([]);
  }
};

  return (
    <div className="settings-container">
      <h2>Profile Settings</h2>

      {message.text && (
        <p className={`message ${message.type}`}>{message.text}</p>
      )}

      <div className="card">
        <h3 className="section-title">My Account</h3>
        <div className="account-section">
          <div className="avatar-placeholder">
            {preview ? (
              <>
                <img src={preview} alt="profile" className="profile-img" />
                <FaEdit
                  className="edit-icon"
                  onClick={() => fileInputRef.current.click()}
                />
              </>
            ) : (
              <label htmlFor="profile-upload">
                <FaUpload size={28} />
              </label>
            )}
            <input
              id="profile-upload"
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>

          <div className="form-groups-wrapper">
            <div className="form-group-admin">
              <label>First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
              <label>Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-admin">
              <label>Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
              <label>Country</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">Password & Security</h3>
        <div className="password-section">
          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
          />
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat New Password"
            value={form.repeatPassword}
            onChange={handleChange}
          />
        </div>
          {form.newPassword && (
            <ul className="password-rules" style={{marginTop:'10px'}}>
              <li className={form.newPassword.length >= 8 ? 'valid' : 'invalid'}>
                Minimum 8 characters
              </li>
              <li className={/[A-Z]/.test(form.newPassword) ? 'valid' : 'invalid'}>
                At least 1 uppercase letter
              </li>
              <li className={/[a-z]/.test(form.newPassword) ? 'valid' : 'invalid'}>
                At least 1 lowercase letter
              </li>
              <li className={/[0-9]/.test(form.newPassword) ? 'valid' : 'invalid'}>
                At least 1 number
              </li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(form.newPassword) ? 'valid' : 'invalid'}>
                At least 1 special character
              </li>
            </ul>
          )}

        <div className="checkbox-row">
          <input
            type="checkbox"
            name="twoStepEnabled"
            checked={form.twoStepEnabled}
            onChange={handleChange}
          />
          <label>Verification enabled</label>
        </div>
      </div>

      <button className="save-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <span className="spinner"></span> : "Save Changes"}
      </button>
    </div>
  );
};

export default ProfileSetting;