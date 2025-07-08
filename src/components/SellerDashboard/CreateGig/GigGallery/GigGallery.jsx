"use client";

import React, { useRef } from "react";
import "./GigGallery.css";

const GigGallery = ({ onNext, onBack, gigData, setGigData }) => {
  const fileInputRefs = {
    images: useRef(null),
    pdf: useRef(null),
  };

  // Handle image uploads (up to 3)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    // Convert files to URLs for preview, store files for upload or as you wish
    const images = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });
    setGigData((prev) => ({ ...prev, images }));
  };

  // Handle video URL input change
  const handleVideoChange = (e) => {
    const url = e.target.value;
    setGigData((prev) => ({ ...prev, videoIframes: url ? [url] : [] }));
  };

  // Handle PDF upload (1 file max)
  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGigData((prev) => ({ ...prev, pdf: file }));
    } else {
      setGigData((prev) => ({ ...prev, pdf: null }));
    }
  };

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
          {gigData.images && gigData.images.length > 0 ? (
            gigData.images.map((img, idx) => (
              <div key={idx} className="upload-box">
                <img
                  src={img.preview}
                  alt={`Gig image ${idx + 1}`}
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </div>
            ))
          ) : (
            <>
              <div
                className="upload-box"
                onClick={() => fileInputRefs.images.current.click()}
              >
                Drag & drop a Photo or <span>Browse</span>
              </div>
              {[...Array(2)].map((_, i) => (
                <div key={i} className="upload-box empty"></div>
              ))}
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: "none" }}
          ref={fileInputRefs.images}
          onChange={handleImageChange}
        />
        {!gigData.images || gigData.images.length === 0 ? (
          <p className="error-msg">Please select at least 1 image</p>
        ) : null}
      </div>

      {/* Video */}
      <div className="section">
        <h4>Video (one only)</h4>
        <p>
          Capture buyer’s attention with a video that showcases your service.
          <br />
          Please choose a video shorter than 75 seconds and smaller than 50MB.
        </p>
        <input
          type="url"
          placeholder="Paste video URL here"
          className="upload-box wide"
          value={gigData.videoIframes && gigData.videoIframes.length > 0 ? gigData.videoIframes[0] : ""}
          onChange={handleVideoChange}
        />
      </div>

      {/* Documents */}
      <div className="section">
        <h4>Documents (1 file maximum size 1MB)</h4>
        <p>Show some of the best work you created in a document (PDFs only).</p>
        <div className="upload-box-group">
          {gigData.pdf ? (
            <div className="upload-box">
              <p>{gigData.pdf.name}</p>
            </div>
          ) : (
            <>
              <div
                className="upload-box"
                onClick={() => fileInputRefs.pdf.current.click()}
              >
                Drag & drop a PDF or <span>Browse</span>
              </div>
              <div className="upload-box empty"></div>
            </>
          )}
        </div>
        <input
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          ref={fileInputRefs.pdf}
          onChange={handlePdfChange}
        />
      </div>

      {/* Navigation buttons */}
      <div className="submit-container">
        <button className="back-btn" onClick={onBack}>
          Back
        </button>
        <button
          className="submit-btn"
          onClick={onNext}
          disabled={!gigData.images || gigData.images.length === 0}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default GigGallery;
