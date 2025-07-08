'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './reset-password.css';
import { baseUrl } from '@/const';
const ResetPasswordConfirm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
const router = useRouter();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return setMessage('Passwords do not match.');
    }

    if (!token) {
      return setMessage('Missing or invalid token.');
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/users/reset-password-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');

      setMessage('✅ Password has been reset successfully.');
      setTimeout(() => {
      router.push('/');
    }, 1000);
    } catch (err) {
      setMessage(err.message || '❌ Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-confirm-container">
      <div className="reset-confirm-box">
        <h2 className="reset-title">Set New Password</h2>
        <form onSubmit={handleSubmit} className="reset-form">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />

          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />

          {message && <p className="reset-message">{message}</p>}

          <button type="submit" className="reset-btn" disabled={loading || !token}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
