'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import './addadmin.css';
import { FiMail, FiLock } from 'react-icons/fi';
import { baseUrl } from '@/const';
import { logoutUser } from '@/redux/features/userSlice';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddAdmin() {
  
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          role: 'admin',
        }),
      });

      const data = await res.json();
       if ([440, 401].includes(res.status)) {
  dispatch(logoutUser());
  toast.error(
    res.status === 440
      ? 'You have been logged out due to inactivity.'
      : 'Please log in to continue.'
  );
  router.push('/login');
  return; // ⛔ stop here
}
      if (res.ok) {
        setMessage({ type: 'success', text: 'Admin added successfully!' });
        setFormData({ firstName: '', email: '', password: '' });
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to add admin.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-header">
        <h1 className="login-heading">Add Admin</h1>
        <Link href="/admin/SeeAllAdmin">
          <button className="admin-button">See All Admin</button>
        </Link>
      </div>

      <div className="login-card">
        <h2 className="heading-form">We're glad to see you again!</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName" className="input-label">First Name</label>
            <div className="input-wrapper">
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">Email Address</label>
            <div className="input-wrapper">
              <FiMail className="icon" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">Password</label>
            <div className="input-wrapper">
              <FiLock className="icon" />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Admin'}
          </button>

          {message && (
            <p style={{ color: message.type === 'error' ? 'red' : 'green', marginTop: '1rem' }}>
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
