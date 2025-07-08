'use client';
import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import ReCAPTCHA from 'react-google-recaptcha';
import { baseUrl } from '@/const';
const ResetPassword = () => {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: user.email || '',
    currentPassword: '',
  });
  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the reCAPTCHA.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/users/reset-password-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Something went wrong');
      alert(data.message);
    } catch (err) {
      alert(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resetpass-container-updated">
      <Sidebar />
      <main className="resetpass-content-updated">
        <h2 className="reset-title-updated">Reset your password</h2>

        <form className="resetpass-form-updated" onSubmit={handleSubmit}>
          <label htmlFor="email" className="reset-label">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="reset-input"
            value={formData.email}
            placeholder={formData.email}
            disabled
          />

          <label htmlFor="currentPassword" className="reset-label">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="reset-input"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <div className="recaptcha-placeholder">
            <ReCAPTCHA
              sitekey='6Ld27GUrAAAAAEZM8X_t0dK7d3kb6m8xz0eEHUR3'
              onChange={setCaptchaToken}
            />
          </div>

          <button type="submit" className="reset-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
