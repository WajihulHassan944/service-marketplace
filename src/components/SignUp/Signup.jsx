'use client';

import React, { useEffect, useState } from 'react';
import './Signup.css';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGoogleLogin } from '@react-oauth/google';
import { baseUrl } from '@/const';
import { FiCheckCircle } from 'react-icons/fi';
import { FaCheck } from 'react-icons/fa';
import Select from "react-select";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { getCountries, getCountryCallingCode } from "libphonenumber-js";

import { toast } from 'react-hot-toast';
countries.registerLocale(enLocale);

const countryOptions = Object.entries(countries.getNames("en")).map(
  ([code, name]) => ({
    value: code,
    label: name,
  })
);

const phoneCodeOptions = getCountries().map((countryCode) => {
  const callingCode = getCountryCallingCode(countryCode);
  return {
    value: `+${callingCode}`,
    label: `${countryCode} (+${callingCode})`, // ✅ AE (+971)
  };
});


const SignupForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'buyer';
  const [agreedToTerms, setAgreedToTerms] = useState(false);
const [passwordErrors, setPasswordErrors] = useState([]);
const [isPasswordValid, setIsPasswordValid] = useState(false);

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
   phoneCountryCode: '',   // ✅ NEW
  phoneNumber: '',        // ✅ NEW
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
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8) errors.push("Minimum 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least 1 uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least 1 lowercase letter");
  if (!/[0-9]/.test(password)) errors.push("At least 1 number");
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("At least 1 special character (!@#$%^&*)");

  setPasswordErrors(errors);
  setIsPasswordValid(errors.length === 0);
};
 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));

  if (name === "password") {
    validatePassword(value);
  }
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
    }
  };

  fetchCountry();
}, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (formData.phoneCountryCode || formData.phoneNumber) {
      if (!formData.phoneCountryCode) {
        toast.error("Please select a country code.");
        setLoading(false);
        return;
      }
    
      const fullNumber = `${formData.phoneCountryCode}${formData.phoneNumber}`;
      const phoneNumber = parsePhoneNumberFromString(fullNumber);
    
      if (!phoneNumber || !phoneNumber.isValid()) {
        toast.error("Please enter a valid phone number.");
        setLoading(false);
        return;
      }
    }
    
if (!isPasswordValid) {
  setError("Password does not meet security requirements.");
  toast.error("Password does not meet security requirements.");
  setLoading(false);
  return;
}
 if (!agreedToTerms) {
  toast.error("You must agree to the terms and conditions before signing up.");
  setLoading(false);
  return;
}

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('country', formData.country);
    data.append('role', role);

    
if (formData.phoneCountryCode) data.append("phoneCountryCode", formData.phoneCountryCode);
if (formData.phoneNumber) data.append("phoneNumber", formData.phoneNumber);


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
      }  else if (result.message === 'User Already Exists') {
  toast.error(
    "This email is already registered. Please log in with your email and password or use ‘Forgot Password’ to reset."
  );
  router.push('/login');
} else {
  toast.error(result.message || 'Registration failed');
}
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
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
          body: JSON.stringify({
  token: tokenResponse.access_token,
  referrerId: localStorage.getItem("referrerId") || null,
  country: formData.country
}),

        });
        const result = await response.json();
       if (response.ok) {
  toast.success(result.message);
  router.push('/login');
} else if (result.message === 'User already exists. Please login.') {
  toast.error("This email is already registered. Please log in with your email and password or use ‘Forgot Password’ to reset."); // or toast.warning()
  router.push('/login');
} else {
  toast.error(result.message || 'Something went wrong');
}
      } catch (err) {
        console.error(err);
        toast.error('Google login failed. Please try again.');
      }
    },
    onError: () => toast.error('Google login was cancelled or failed.'),
  });

  return (
    <>
    <div className='signup-wrap'>
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
{/* inline password rules */}
{formData.password && (
  <ul className="password-rules">
    <li className={formData.password.length >= 8 ? "valid" : "invalid"}>
      Minimum 8 characters
    </li>
    <li className={/[A-Z]/.test(formData.password) ? "valid" : "invalid"}>
      At least 1 uppercase letter
    </li>
    <li className={/[a-z]/.test(formData.password) ? "valid" : "invalid"}>
      At least 1 lowercase letter
    </li>
    <li className={/[0-9]/.test(formData.password) ? "valid" : "invalid"}>
      At least 1 number
    </li>
    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? "valid" : "invalid"}>
      At least 1 special character (!@#$%^&*)
    </li>
  </ul>
)}

         <Select
  options={countryOptions}
  value={countryOptions.find((opt) => opt.label === formData.country)}
  onChange={(selected) =>
    setFormData((prev) => ({ ...prev, country: selected?.label || "" }))
  }
  
  placeholder="Select your country"
  className="country-select"
  classNamePrefix="select"
/>

<div className="phoneNo-wrapper">
  <label className="phoneNo-label">Phone Number</label>
  <div className="phoneNo-flexed-div">
    <div className="phoneNo-code-group">
      <Select
        options={phoneCodeOptions}
        value={phoneCodeOptions.find(
          (opt) => opt.value === formData.phoneCountryCode
        )}
        onChange={(selected) =>
          setFormData((prev) => ({
            ...prev,
            phoneCountryCode: selected?.value || "",
          }))
        }
        placeholder="Code"
        className="country-select"
        classNamePrefix="select"
      />
    </div>

    <div className="phoneNo-input-group">
      <input
        type="text"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
         placeholder="123 456 789"
      />
    </div>
  </div>
</div>

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
  disabled={loading}
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
      </div>
    </>
  );
};

export default SignupForm;
