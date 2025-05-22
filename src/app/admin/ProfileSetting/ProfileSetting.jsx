"use client";
import React, { useState } from "react";
import { FaUserCircle, FaLock } from "react-icons/fa";
import "./profilesetting.css";

const ProfileSetting = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
    twoStepEnabled: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  return (
    <div className="settings-container">
      <h2>Profile Settings</h2>

      <div className="card">
        <h3 className="section-title">
          My Account
        </h3>
        <div className="account-section">
          <div className="avatar-placeholder"></div>
          <div className="form-group">
            <label>Name</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <label>Email</label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="section-title">
         Password & Security
        </h3>
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
          <label>Enable Two-Step Verification via Email</label>
        </div>
      </div>

      <button className="save-btn">Save Changes</button>
    </div>
  );
};

export default ProfileSetting;
