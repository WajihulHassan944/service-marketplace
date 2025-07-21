'use client';

import React, { useState } from 'react';
import './Signup.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { baseUrl } from '@/const';
import { FiCheckCircle } from 'react-icons/fi';
const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'buyer';

  /* ---------- pop‑up state ---------- */
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: 'Pakistan',
    linkedUrl: '',
    speciality: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('country', formData.country);
    data.append('role', role);

    if (role === 'seller') {
      data.append('sellerDetails[linkedUrl]', formData.linkedUrl);
      data.append('sellerDetails[speciality]', formData.speciality);
    }
    if (image) data.append('profileImage', image);

    try {
      const response = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        body: data,
      });
      const result = await response.json();

      if (response.ok) {
        /* ---------- open pop‑up instead of redirecting ---------- */
        const message =
          role === 'seller'
            ? 'Your application has been sent to the admin for approval.'
            : 'A verification email has been sent to your email account. Kindly verify it.';
        setPopupMessage(message);
        setShowPopup(true);
      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(`${baseUrl}/users/google-register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: tokenResponse.access_token }),
        });
        const result = await response.json();
        if (response.ok || result.message === 'User already exists. Please login.') {
          router.push('/login');
        } else {
          setError(result.message || 'Google login failed.');
        }
      } catch (err) {
        console.error(err);
        setError('Google login failed. Please try again.');
      }
    },
    onError: () => setError('Google login was cancelled or failed.'),
  });

  return (
    <>
      <div className="signup-container">
        <h2>{role !== 'seller' ? 'Sign up' : 'Apply as Freelancer'}</h2>

        {role !== 'seller' && (
          <>
            <div className="social-buttons">
              <button className="google-btn" onClick={() => googleLogin()}>
                <img src="/assets/google.jpeg" alt="Google" className="google-logo" />
                Continue with Google
              </button>
            </div>
            <div className="divider"><span>or</span></div>
          </>
        )}

        <form
          className="signup-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="name-fields">
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Work email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (8 or more characters)"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <select name="country" value={formData.country} onChange={handleChange}>
            <option>Pakistan</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>India</option>
            <option>Germany</option>
          </select>

          {role === 'seller' && (
            <>
              <input
                type="text"
                name="linkedUrl"
                placeholder="LinkedIn Profile URL"
                value={formData.linkedUrl}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="speciality"
                placeholder="Specialities"
                value={formData.speciality}
                onChange={handleChange}
                required
              />
            </>
          )}

          <div className="image-upload-wrapper">
            <label htmlFor="imageUpload" className="custom-file-label">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="image-preview" />
              ) : (
                'Click to upload profile image'
              )}
            </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? <span className="loader"></span> : 'Create my account'}
          </button>

          <p className="login-text">
            Already have an account? <Link href="/login">Log In</Link>
          </p>
        </form>
      </div>

      {/* ---------- success pop‑up ---------- */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <FiCheckCircle className="popup-icon" />
            <p>{popupMessage}</p>
            <button className="done-btn" onClick={() => router.push('/login')}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupForm;
