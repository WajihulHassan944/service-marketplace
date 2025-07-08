'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './InfoSettings.css';
import { FaUserCircle } from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';
const InfoSettings = () => {
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    linkedUrl: '',
    speciality: '',
    description: '',
    skills: [],
    profileImg: null,
  });
  const [editableEmail, setEditableEmail] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
const [newSkill, setNewSkill] = useState('');

const handleAddSkill = () => {
  if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill.trim()],
    }));
    setNewSkill('');
  }
};

const handleRemoveSkill = (skillToRemove) => {
  setFormData((prev) => ({
    ...prev,
    skills: prev.skills.filter((skill) => skill !== skillToRemove),
  }));
};
  useEffect(() => {
    if (user) {
      setFormData({
        userId: user._id,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        country: user.country || '',
        linkedUrl: user.sellerDetails?.linkedUrl || '',
        speciality: user.sellerDetails?.speciality || '',
        profileImg: null,
        description: user.sellerDetails?.description || '',
        skills: user.sellerDetails?.skills || [],
      });
      setPreviewImg(user.profileUrl || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImg: file }));
      setPreviewImg(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const form = new FormData();
      form.append('userId', formData.userId);
      if (formData.firstName) form.append('firstName', formData.firstName);
      if (formData.lastName) form.append('lastName', formData.lastName);
      if (formData.email) form.append('email', formData.email);
      if (formData.country) form.append('country', formData.country);
      if (formData.linkedUrl) form.append('linkedUrl', formData.linkedUrl);
      if (formData.speciality) form.append('speciality', formData.speciality);
      if (formData.profileImg) form.append('profileImg', formData.profileImg);
if (formData.description) form.append('description', formData.description);
if (formData.skills.length) form.append('skills', JSON.stringify(formData.skills));

      const res = await fetch(`${baseUrl}/users/update-profile`, {
        method: 'PUT',
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed.');

      setMessage('✅ Profile updated successfully.');
      window.location.reload();
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="parent-container">
      <Sidebar />
      <form className="account-containers" onSubmit={handleSubmit}>
        <h2>My Info</h2>

        <div className="flexed-div">
          <div className="form-group">
            <label>First Name <span>*</span></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label>Last Name <span>*</span></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            placeholder="Enter your country"
          />
        </div>

        <div className="form-group">
          <label>Email <span>*</span></label>
          <div className="email-row">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!editableEmail}
            />
            <button
              type="button"
              className="change-email-btn"
              onClick={() => setEditableEmail(true)}
            >
              Change Email
            </button>
          </div>
        </div>

       {user.currentDashboard === "seller" && (
        <>
        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="text"
            name="linkedUrl"
            value={formData.linkedUrl}
            onChange={handleInputChange}
            placeholder="e.g. linkedin.com/in/your-profile"
          />
        </div>

        <div className="form-group">
          <label>Speciality</label>
          <input
            type="text"
            name="speciality"
            value={formData.speciality}
            onChange={handleInputChange}
            placeholder="e.g. Fullstack Web Development"
          />
        </div>
<div className="form-group">
  <label>Description</label>
  <textarea
    name="description"
    value={formData.description}
    onChange={handleInputChange}
    placeholder="Write something about yourself..."
    className='textarea-info'
  ></textarea>
</div>

<div className="form-group">
  <label>Skills</label>
  <div className="skills-input-row">
    <input
      type="text"
      value={newSkill}
      onChange={(e) => setNewSkill(e.target.value)}
      placeholder="Add a skill and press Enter"
      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
    />
    <button type="button" className="change-email-btn" onClick={handleAddSkill}>
      Add
    </button>
  </div>
  <div className="skills-list">
    {formData.skills.map((skill, idx) => (
      <span key={idx} className="skill-tag">
        {skill}
        <button type="button" onClick={() => handleRemoveSkill(skill)}>✕</button>
      </span>
    ))}
  </div>
</div>
</>
)}




        <div className="form-group profile-photo">
          <label>Profile Photo</label>
          <div className="profile-pic">
            {previewImg ? (
              <Image src={previewImg} alt="Profile" width={50} height={50} className="avatar" style={{objectFit:"contain"}} />
            ) : (
              <FaUserCircle size={50} color="#888" />
            )}
            <label className="edit-btn">
              Edit
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </label>
          </div>
          <small>(jpg or png format)</small>
        </div>

        <div className="form-group view-profile">
          <a href={`/profile/${user._id}`}>My Profile</a>
        </div>

        <button type="submit" className="save-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        {message && <p className="form-message">{message}</p>}
      </form>
    </div>
  );
};

export default InfoSettings;
