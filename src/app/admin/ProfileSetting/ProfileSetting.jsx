"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { FaUpload, FaEdit } from "react-icons/fa";
import "./profilesetting.css";
import { baseUrl } from "@/const";

const ProfileSetting = () => {
  const user = useSelector((state) => state.user);

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
    form.newPassword === form.repeatPassword;

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
      setMessage({ type: "success", text: "Profile updated successfully." });
      somethingChanged = true;
    }

    if (passwordChanged) {
      const res = await fetch(`${baseUrl}/users/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ type: "success", text: "Password changed successfully." });
      somethingChanged = true;
    }

    if (!formChanged && !passwordChanged) {
      setMessage({ type: "error", text: "No changes detected." });
    }

    // 🔁 Refresh if either profile or password was updated
    if (somethingChanged) {
      setTimeout(() => window.location.reload(), 1000);
    }

  } catch (err) {
    setMessage({
      type: "error",
      text: err.message || "Something went wrong.",
    });
  } finally {
    setLoading(false);
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