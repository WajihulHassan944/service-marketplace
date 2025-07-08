'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './CreatePortfolio.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
const CreatePortfolio = () => {
  const user = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const router = useRouter();
  const portfolioId = searchParams.get('portfolioId');
const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [previewType, setPreviewType] = useState('image');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [linkPreview, setLinkPreview] = useState('');
  const [file, setFile] = useState(null);
  const [showInfo, setShowInfo] = useState(true);

  const toggleInfo = () => setShowInfo((prev) => !prev);

  useEffect(() => {
    if (portfolioId) {
      fetch(`${baseUrl}/portfolio/single/${portfolioId}`)
        .then((res) => res.json())
        .then((data) => {
          const pf = data.portfolio;
          setTitle(pf.title);
          setPreviewType(pf.previewType);
          setDescription(pf.description);
          if (pf.previewType === 'image') {
            setImagePreview(pf.imageUrl);
          } else {
            setLinkPreview(pf.websiteLink);
          }
        })
        .catch((err) => console.error("Failed to load portfolio:", err));
    }
  }, [portfolioId]);

  const handleImageChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setImagePreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
setLoading(true);
    const formData = new FormData();
    formData.append('userId', user._id);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('previewType', previewType);

    if (previewType === 'image' && file) {
      formData.append('previewImage', file);
    } else if (previewType === 'link') {
      formData.append('websiteLink', linkPreview);
    }

    try {
      const res = await fetch(
        portfolioId
          ? `${baseUrl}/portfolio/update/${portfolioId}`
          : `${baseUrl}/portfolio/create`,
        {
          method: portfolioId ? 'PUT' : 'POST',
          body: formData,
          credentials: 'include',
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert(`Portfolio ${portfolioId ? 'updated' : 'created'} successfully`);
        window.location.reload(); // or refresh current page
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting portfolio:", error);
    }finally {
    setLoading(false);
  }
  };

  return (
    <div className="portfolio-create-container">
      <Sidebar />
      <div className="portfolio-create-content">
        <h2 className="title">{portfolioId ? 'Update' : 'Create'} Your Portfolio</h2>
        <p className="description">
          Showcase your work to potential clients. Add a title, upload an image or provide a website link, and describe your work.
        </p>

        <form className="portfolio-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="portfolio-title">Title</label>
            <input
              type="text"
              id="portfolio-title"
              placeholder="Enter portfolio title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
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
              <div className="input-with-info">
                <input
                  type="text"
                  id="portfolio-link"
                  placeholder="Enter website URL"
                  value={linkPreview}
                  onChange={(e) => setLinkPreview(e.target.value)}
                />
                <AiOutlineInfoCircle className="info-icon" onClick={toggleInfo} />
              </div>
              {showInfo && (
                <div className="info-tooltip">
                  Do not include your full portfolio URL unless permitted.
                </div>
              )}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="portfolio-desc">Description</label>
            <textarea
              id="portfolio-desc"
              rows="4"
              placeholder="Describe your work..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

         <button type="submit" className="save-button" disabled={loading}>
  {loading
    ? 'Saving, please wait...'
    : portfolioId
    ? 'Update Portfolio'
    : 'Save Portfolio'}
</button>

        </form>

      </div>
    </div>
  );
};

export default CreatePortfolio;
