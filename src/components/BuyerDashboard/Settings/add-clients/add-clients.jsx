'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { baseUrl } from '@/const';
import './AddClients.css';

const AddClients = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !country || !profileImage) {
      return setMessage('All fields are required.');
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('country', country);
      formData.append('profileImage', profileImage);

      const token = localStorage.getItem('token'); // or get from cookies
      const res = await fetch(`${baseUrl}/clients`, {
        method: 'POST',
        credentials: "include",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to add client.');

      setMessage('Client added successfully!');
      setName('');
      setCountry('');
      setProfileImage(null);
      e.target.reset(); // reset form input
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="client-form-container">
      <Sidebar />
      <div className="client-form-content">
        <h2 className="client-form-title">Add New Client</h2>
        <p className="client-form-description">
          Please fill out all fields to add a new client.
        </p>

        <form className="client-form-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="client-name">Full Name</label>
            <input
              type="text"
              id="client-name"
              placeholder="Enter client name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="client-country">Country</label>
            <input
              type="text"
              id="client-country"
              placeholder="Enter client country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          <div className="form-group custom-upload">
            <label htmlFor="client-image">Profile Image</label>
            <div className="upload-box">
              <input
                type="file"
                id="client-image"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => setProfileImage(e.target.files[0])}
                required
              />
              <label htmlFor="client-image" className="upload-button">
                Upload Image
              </label>
              {profileImage && (
                <span className="file-name-display">{profileImage.name}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="client-form-save-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Save Client'}
          </button>

          {message && (
            <p
              style={{
                marginTop: '10px',
                color: message.includes('success') ? 'green' : 'red',
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddClients;
