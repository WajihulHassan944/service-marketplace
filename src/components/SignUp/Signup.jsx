'use client';

import React, { useEffect, useState } from 'react';
import './Signup.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { baseUrl } from '@/const';
import { FiCheckCircle } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';

const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'buyer';
  const [agreedToTerms, setAgreedToTerms] = useState(false);


  /* ---------- pop‑up state ---------- */
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    linkedUrl: '',
    speciality: '',
  description: '',
  personalportfoliolink: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
const [resumeFile, setResumeFile] = useState(null);

const handleResumeChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 1024 * 1024) { // 1MB in bytes
      setError('Resume must be less than 1MB');
      return;
    }
    setResumeFile(file);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 1024 * 1024) { // 1MB in bytes
      setError('Profile image must be less than 1MB');
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }
};
useEffect(() => {
  const fetchCountry = async () => {
    try {
      const res = await fetch('https://ipwho.is/');
      const data = await res.json();
      if (data && data.success && data.country) {
        setFormData(prev => ({ ...prev, country: data.country }));
      } else {
        setFormData(prev => ({ ...prev, country: 'Unknown' }));
      }
    } catch (err) {
      console.error('Failed to fetch country:', err);
      setFormData(prev => ({ ...prev, country: 'Unknown' }));
    } finally {
      setLoadingCountry(false);
    }
  };

  fetchCountry();
}, []);


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
        data.append('sellerDetails[description]', formData.description);
       data.append('sellerDetails[personalportfoliolink]', formData.personalportfoliolink);
if (resumeFile) data.append('resume', resumeFile);

    }
    if (image) data.append('profileImage', image);
const referrerId = localStorage.getItem("referrerId");
if (referrerId) data.append("referrerId", referrerId);

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
    if (!agreedToTerms) {
  setError("You must agree to the terms and conditions before signing up.");
  setLoading(false);
  return;
}

  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(`${baseUrl}/users/google-register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
  token: tokenResponse.access_token,
  referrerId: localStorage.getItem("referrerId") || null,
  country: formData.country
}),

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

           <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            disabled
          />
          {role === 'seller' && (
            <>
              <input
                type="text"
                name="linkedUrl"
                placeholder="LinkedIn Profile URL (optional)"
                value={formData.linkedUrl}
                onChange={handleChange}
              />
              <input
                type="text"
                name="speciality"
                placeholder="Specialities"
                value={formData.speciality}
                onChange={handleChange}
                required
              />
               <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="personalportfoliolink"
                placeholder="Personal Portfolio Link  (optional)"
                value={formData.personalportfoliolink}
                onChange={handleChange}
              />
              <div className="resume-upload-wrapper">
  <label htmlFor="resumeUpload" className="custom-file-label">
    {resumeFile ? resumeFile.name : 'Click to upload your CV or Resume'}
  </label>
  <input
    id="resumeUpload"
    type="file"
    accept=".pdf,.doc,.docx"
    onChange={handleResumeChange}
    style={{ display: 'none' }}
  />
</div>

            </>
          )}

          {/* <div className="image-upload-wrapper">
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
          </div> */}


          {error && <p className="error-text">{error}</p>}
  <div className="terms-checkbox">
      <label className="custom-checkbox-wrapper">
        <div
          className={`custom-checkbox ${agreedToTerms ? 'checked' : ''}`}
          onClick={() => setAgreedToTerms(!agreedToTerms)}
        >
          {agreedToTerms && <FaCheck size={12} color="#fff" />}
        </div>
        <span>
          I agree to&nbsp;
          <Link href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">
            doTask Service Marketplace Terms and Conditions
          </Link>
          , including policies on payments, disputes, and user conduct.
        </span>
      </label>
    </div>
          <button
  type="submit"
  className="submit-btn"
  disabled={loading || !agreedToTerms}
>
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
