'use client';
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './CreatePortfolio.css';

const CreatePortfolio = () => {
  const [previewType, setPreviewType] = useState('image');
  const [imagePreview, setImagePreview] = useState(null);
  const [linkPreview, setLinkPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="portfolio-create-container">
      <Sidebar />
      <div className="portfolio-create-content">
        <h2 className="title">Create Your Portfolio</h2>
        <p className="description">
          Showcase your work to potential clients. Add a title, upload an image or provide a website link, and describe your work.
        </p>

        <form className="portfolio-form">
          <div className="form-group">
            <label htmlFor="portfolio-title">Title</label>
            <input type="text" id="portfolio-title" placeholder="Enter portfolio title" />
          </div>

          <div className="form-group">
            <label htmlFor="preview-type">Choose Preview Type</label>
            <select
              id="preview-type"
              value={previewType}
              onChange={(e) => setPreviewType(e.target.value)}
            >
              <option value="image">Add Image</option>
              <option value="link">Website Link</option>
            </select>
          </div>

          {previewType === 'image' ? (
          <div className="form-group custom-upload">
  <label htmlFor="portfolio-image">Upload Image</label>
  <div className="upload-box">
    <input
      type="file"
      id="portfolio-image"
      accept="image/*"
      onChange={handleImageChange}
    />
    <label htmlFor="portfolio-image" className="upload-button">
      Choose File
    </label>
    {imagePreview && (
      <img src={imagePreview} alt="Preview" className="image-preview" />
    )}
  </div>
</div>
) : (
            <div className="form-group">
              <label htmlFor="portfolio-link">Website Link</label>
              <input
                type="text"
                id="portfolio-link"
                placeholder="Enter website URL"
                value={linkPreview}
                onChange={(e) => setLinkPreview(e.target.value)}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="portfolio-desc">Description</label>
            <textarea id="portfolio-desc" rows="4" placeholder="Describe your work..." />
          </div>

          <button type="submit" className="save-button">
            Save Portfolio
          </button>
        </form>

        <div className="portfolio-section">
          <h3 className="portfolio-heading">My Portfolio</h3>
          <div className="portfolio-cards">
            <div className="portfolio-card">
              <img src="/assets/portfolio/two.png" alt="Portfolio 1" />
              <div className="card-info">
                <h4>Crypto Wallet Dashboard</h4>
                <p>Beautiful dark-themed finance UI for crypto wallets.</p>
              </div>
            </div>
            <div className="portfolio-card">
              <img src="/assets/portfolio/one.png" alt="Portfolio 2" />
              <div className="card-info">
                <h4>Mobile Bank App</h4>
                <p>Modern interface for mobile banking applications.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolio;
