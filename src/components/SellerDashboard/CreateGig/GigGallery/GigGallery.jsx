'use client';

import React from 'react';
import './GigGallery.css';

const GigGallery = ({ onNext, onBack }) => {
  return (
    <div className="gig-gallery-container">
      <h2>Showcase Your Services In A Gig Gallery</h2>
      <p className="subtitle">
        Encourage buyers to choose your Gig by featuring a variety of your work.
      </p>

      <div className="notice-box">
        <p>
          ⚠️ To comply with Todo’s terms of service, make sure to upload only content you either own or you have the permission or license to use.
        </p>
        <a href="#">Gig image guidelines</a>
      </div>

      {/* Images */}
      <div className="section">
        <h4>Images (up to 3)</h4>
        <p>Get noticed by the right buyers with visual examples of your services.</p>
        <div className="upload-box-group">
          <div className="upload-box">Drag & drop a Photo or <span>Browse</span></div>
          <div className="upload-box empty"></div>
          <div className="upload-box empty"></div>
        </div>
        <p className="error-msg">Please select at least 1 image</p>
      </div>

      {/* Video */}
      <div className="section">
        <h4>Video (one only)</h4>
        <p>
          Capture buyer’s attention with a video that showcases your service.<br />
          Please choose a video shorter than 75 seconds and smaller than 50MB.
        </p>
        <div className="upload-box wide">Drag & drop a Video or <span>Browse</span></div>
      </div>

      {/* Documents */}
      <div className="section">
        <h4>Documents (up to 2)</h4>
        <p>Show some of the best work you created in a document (PDFs only).</p>
        <div className="upload-box-group">
          <div className="upload-box">Drag & drop a PDF or <span>Browse</span></div>
          <div className="upload-box empty"></div>
        </div>
      </div>

      {/* Static Navigation */}
      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>Back</button>
        <button className="submit-btn" onClick={onNext}>Save & Continue</button>
      </div>
    </div>
  );
};

export default GigGallery;
