'use client';
import React, { useEffect, useState } from 'react';
import './ResetPassword.css';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';

const ChangePassword = () => {
  const user = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
const [samePasswordError, setSamePasswordError] = useState('');

  useEffect(() => {
    if (user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: user.email
      }));
    }
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState([]);

  // ✅ Password validation rules
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

   if (name === 'newPassword') {
    setPasswordErrors(validatePassword(value));

    // ✅ check against current password live
    if (formData.currentPassword && value === formData.currentPassword) {
      setSamePasswordError('New password cannot be the same as your current password.');
    } else {
      setSamePasswordError('');
    }
  }
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  // check password validation
  if (passwordErrors.length > 0) {
    toast.error('Please fix password requirements.');
    return;
  }

  if (formData.newPassword !== formData.confirmPassword) {
    toast.error('New password and confirm password do not match.');
    return;
  }
  
if (formData.currentPassword === formData.newPassword) {
  setSamePasswordError('New password cannot be the same as your current password.');
  toast.error('New password cannot be the same as your current password.');
  return;
} else {
  setSamePasswordError('');
}

  setLoading(true);

  try {
    const res = await fetch(`${baseUrl}/users/change-password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword, // ✅ added
      }),
      credentials: 'include',
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update password');

    toast.success('Password updated successfully!');
    setFormData((prev) => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }));
    setPasswordErrors([]);
  } catch (err) {
    toast.error(err.message || 'Something went wrong.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="changepass-container">
      <Sidebar />
      <main className="changepass-content">
        <h2 className="changepass-title">Change Password</h2>

        <form className="changepass-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="changepass-label">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="changepass-input"
            value={formData.email}
            disabled
          />

          <label htmlFor="currentPassword" className="changepass-label">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            className="changepass-input"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
            required
          />

          <label htmlFor="newPassword" className="changepass-label">New Password</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            className="changepass-input"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
{samePasswordError && (
  <p className="error-message">{samePasswordError}</p>
)}
          {/* ✅ Inline password rules */}
          {formData.newPassword && (
            <ul className="password-rules">
              <li className={formData.newPassword.length >= 8 ? 'valid' : 'invalid'}>
                Minimum 8 characters
              </li>
              <li className={/[A-Z]/.test(formData.newPassword) ? 'valid' : 'invalid'}>
                At least 1 uppercase letter
              </li>
              <li className={/[a-z]/.test(formData.newPassword) ? 'valid' : 'invalid'}>
                At least 1 lowercase letter
              </li>
              <li className={/[0-9]/.test(formData.newPassword) ? 'valid' : 'invalid'}>
                At least 1 number
              </li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.newPassword) ? 'valid' : 'invalid'}>
                At least 1 special character
              </li>
            </ul>
          )}

          <label htmlFor="confirmPassword" className="changepass-label">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="changepass-input"
            placeholder="Re-enter new password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="changepass-submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ChangePassword;
