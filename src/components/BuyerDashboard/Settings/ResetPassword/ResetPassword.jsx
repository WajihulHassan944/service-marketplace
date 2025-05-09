import React from 'react';
import './ResetPassword.css';
import Sidebar from '../Sidebar/Sidebar';

const ResetPassword = () => {
  return (
    <div className="resetpass-container-updated">
      <Sidebar />
      <main className="resetpass-content-updated">
        <h2 className="reset-title-updated">Reset your password</h2>
      
        <form className="resetpass-form-updated">
          <label htmlFor="email" className="reset-label">Username or Email</label>
          <input
            type="text"
            id="email"
            name="email"
            className="reset-input"
            placeholder="Enter your username or email"
          />
  <label htmlFor="email" className="reset-label">Current Password</label>
          <input
            type="text"
            id="email"
            name="email"
            className="reset-input"
            placeholder="Enter your current password"
          />

          <div className="recaptcha-placeholder">
            <img src="/assets/recaptcha.png" alt="reCAPTCHA" />
          </div>

          <button type="submit" className="reset-submit">
            Send Reset Email
          </button>
        </form>
      </main>
    </div>
  );
};

export default ResetPassword;
