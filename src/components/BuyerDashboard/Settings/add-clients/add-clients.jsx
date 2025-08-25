'use client';

import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { baseUrl } from '@/const';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './AddClients.css';

const AddClients = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [workDate, setWorkDate] = useState(null); // holds month & year
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !country || !profileImage || !workDate || !description) {
      return setMessage('All fields are required.');
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('country', country);
      formData.append('profileImage', profileImage);
      formData.append('workMonth', workDate.toLocaleString("default", { month: "long" }));
      formData.append('workYear', workDate.getFullYear());
      formData.append('description', description);

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
      setWorkDate(null);
      setDescription('');
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

          {/* Work Month + Year */}
          <div className="form-group">
            <label htmlFor="work-date">Work Month & Year</label>
            <DatePicker
              selected={workDate}
              onChange={(date) => setWorkDate(date)}
              dateFormat="MMMM yyyy"
              showMonthYearPicker
              placeholderText="Select month and year"
              className="date-picker-input"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="client-description">Description</label>
            <textarea
  id="client-description"
  placeholder="Enter description (max 200 chars)"
  value={description}
  onChange={(e) => {
    if (e.target.value.length <= 130) {
      setDescription(e.target.value);
    }
  }}
  rows={4}
/>
<div className='flex-end'><small style={{ color: description.length === 130 ? 'red' : '#555' }}>
  {description.length}/130 characters
</small></div>

          </div>

          {/* Profile Image */}
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
              <label htmlFor="client-image" className="upload-button-custom">
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
