"use client";

import React, { useRef } from "react";
import "./GigGallery.css";
import { FaTrash } from 'react-icons/fa';
const GigGallery = ({ onNext, onBack, gigData, setGigData }) => {
  const fileInputRefs = {
    images: useRef(null),
    pdf: useRef(null),
  };
const handleDrop = (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files).filter(file =>
    file.type.startsWith("image/")
  );

  const previews = files.map(file => ({
    file,
    preview: URL.createObjectURL(file),
  }));

  setGigData(prev => ({
    ...prev,
    images: [...prev.images, ...previews].slice(0, 3), // max 3
  }));
};

const handleDragOver = (e) => {
  e.preventDefault(); // allows drop
};

  const handleImageChange = (e) => {
  const selectedFiles = Array.from(e.target.files);

  const validFiles = selectedFiles.filter(file => file.size <= 1024 * 1024);
  const tooLarge = selectedFiles.find(file => file.size > 1024 * 1024);

  if (tooLarge) {
    alert("Each image must be 1MB or smaller.");
    return;
  }

  setGigData(prev => {
    const existingImages = prev.images || [];

    const newImages = validFiles.slice(0, 3 - existingImages.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    return {
      ...prev,
      images: [...existingImages, ...newImages].slice(0, 3), // cap at 3
    };
  });

  // Clear file input to allow uploading the same file again if needed
  e.target.value = "";
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
  {[0, 1, 2].map((idx) => {
    const img = gigData.images?.[idx];

    if (img) {
      const preview = img.preview || img.url; // handle both local and uploaded
      return (
        <div key={idx} className="upload-box image-box">
          <img
            src={preview}
            alt={`Gig image ${idx + 1}`}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <button
            className="delete-btn-gig"
            onClick={() => {
              setGigData(prev => {
                const updated = [...prev.images];
                const [removed] = updated.splice(idx, 1);
                const toDelete = removed.public_id
                  ? [...(prev.imagesToDelete || []), removed.public_id]
                  : (prev.imagesToDelete || []);
                return { ...prev, images: updated, imagesToDelete: toDelete };
              });
            }}
          >
           <FaTrash />
          </button>
        </div>
      );
    }

    return (
     <div
  className="upload-box"
  onClick={() => fileInputRefs.images.current.click()}
  onDrop={handleDrop}
  onDragOver={handleDragOver}
>
  Drag & drop a Photo or <span>Browse</span>
</div>

    );
  })}
</div>

       <input
  type="file"
  accept="image/*"
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

  <div
    className="upload-box-group"
    onDrop={(e) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type === "application/pdf" && file.size <= 1 * 1024 * 1024) {
        setGigData((prev) => ({
          ...prev,
          pdf: { file, name: file.name },
        }));
      } else {
        alert("Please upload a valid PDF under 1MB");
      }
    }}
    onDragOver={(e) => e.preventDefault()}
  >
    {gigData.pdf?.url || gigData.pdf?.name ? (
      <div className="upload-box">
        <p>{gigData.pdf.name || gigData.pdf.url.split("/").pop()}</p>
        <button
          type="button"
          onClick={() =>
            setGigData((prev) => ({
              ...prev,
              pdf: null,
              removePdf: true, // flag to let backend know to delete old PDF
            }))
          }
          style={{
            marginTop: "0.5rem",
            background: "#dc3545",
            color: "white",
            border: "none",
            padding: "5px 10px",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Remove PDF
        </button>
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
    onChange={(e) => {
      const file = e.target.files[0];
      if (file?.type === "application/pdf" && file.size <= 1 * 1024 * 1024) {
        setGigData((prev) => ({
          ...prev,
          pdf: { file, name: file.name },
        }));
      } else {
        alert("Please upload a valid PDF under 1MB");
      }
    }}
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
