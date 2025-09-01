'use client';
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './reset-password.css';
import { baseUrl } from '@/const';

import toast from 'react-hot-toast';
// Password validator (returns array of missing rules)
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("Minimum 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least 1 uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least 1 lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("At least 1 number");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password)) errors.push("At least 1 special character (!@#$%^&*)");
  return errors;
};

const ResetPasswordConfirm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const router = useRouter();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [confirmError, setConfirmError] = useState('');

  const computeRuleStatus = (pwd) => ({
    minLen: pwd.length >= 8,
    upper: /[A-Z]/.test(pwd),
    lower: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...formData, [name]: value };
    setFormData(newForm);

    if (name === 'newPassword' || name === 'confirmPassword') {
      const validationErrors = validatePassword(newForm.newPassword);
      setErrors(validationErrors);

      if (newForm.confirmPassword && newForm.newPassword !== newForm.confirmPassword) {
        setConfirmError('Passwords do not match.');
      } else {
        setConfirmError('');
      }

    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmError('');

    if (!token) {
      toast.error("Missing or invalid token.");
      return;
    }

    const validationErrors = validatePassword(formData.newPassword);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setConfirmError('Passwords do not match.');
      toast.error("Passwords do not match.")
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${baseUrl}/users/reset-password-confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Something went wrong.');

      setLoading(false);
      toast.success('Password has been reset successfully.');
      setFormData({ newPassword: '', confirmPassword: '' });
      setErrors([]);
      setConfirmError('');

      setTimeout(() => router.push('/login'), 1200);
    } catch (err) {
      
      setLoading(false);
      toast.error(err.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  const ruleStatus = computeRuleStatus(formData.newPassword);
  const isPasswordValid = validatePassword(formData.newPassword).length === 0;
  const isConfirmMatching = formData.newPassword === formData.confirmPassword && formData.confirmPassword.length > 0;

  return (
    <div className="reset-confirm-container">
      <div className="reset-confirm-box">
        <h2 className="reset-title">Set New Password</h2>
        <form onSubmit={handleSubmit} className="reset-form" noValidate>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
            autoComplete="new-password"
          />

          {/* Live password rule list */}
            {formData.newPassword && (
          <ul className="password-rules" aria-live="polite">
            <li className={ruleStatus.minLen ? 'valid' : 'invalid'}>Minimum 8 characters</li>
            <li className={ruleStatus.upper ? 'valid' : 'invalid'}>At least 1 uppercase letter</li>
            <li className={ruleStatus.lower ? 'valid' : 'invalid'}>At least 1 lowercase letter</li>
            <li className={ruleStatus.number ? 'valid' : 'invalid'}>At least 1 number</li>
            <li className={ruleStatus.special ? 'valid' : 'invalid'}>At least 1 special character (!@#$%^&*)</li>
          </ul>
            )}
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
            autoComplete="new-password"
          />

          {confirmError && <p className="reset-confirm-error">{confirmError}</p>}

       
          <button
            type="submit"
            className="reset-btn"
            disabled={loading || !token || !isPasswordValid || !isConfirmMatching}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
