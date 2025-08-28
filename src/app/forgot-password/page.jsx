'use client';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './ForgotPassword.css';
import { baseUrl } from '@/const';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email) {
      setError("Email is required.");
      return;
    }
    if (!captchaToken) {
      setError("Please complete the reCAPTCHA.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${baseUrl}/users/reset-password-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, captchaToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong. Please try again.");
      } else {
        setMessage(data.message || "Password reset link has been sent to your email.");
        setEmail('');
        setCaptchaToken(null);
      }
    } catch (err) {
      console.error("Forgot password error:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgotpass-container">
      <div className="forgotpass-card">
        <h2 className="forgotpass-title">Forgot Password</h2>
        <p className="forgotpass-subtitle">
          Enter your registered email address to receive a password reset link.
        </p>

        <form className="forgotpass-form" onSubmit={handleSubmit}>
          <label htmlFor="email" className="forgotpass-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="forgotpass-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="forgotpass-recaptcha">
            <ReCAPTCHA
              sitekey="6Ld27GUrAAAAAEZM8X_t0dK7d3kb6m8xz0eEHUR3"
              onChange={setCaptchaToken}
            />
          </div>

          <button type="submit" className="forgotpass-submit" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {error && <p className="forgotpass-error">{error}</p>}
        {message && <p className="forgotpass-success">{message}</p>}

        <div className="forgotpass-footer">
          <a href="/login">Back to Login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
