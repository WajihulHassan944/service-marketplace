'use client';
import React, { useState } from 'react';
import { FaCalendarAlt, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import './manageJobs.css';

const JobCard = ({ title, postedDate, expiryDate, status, candidates, sellerName, sellerImage }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="job-card">
      {/* Seller Info */}
      <div className="job-seller">
        <img src={sellerImage} alt={sellerName} className="seller-img" />
        <span className="seller-name">{sellerName}</span>
      </div>

      {/* Job Title and Status */}
      <div className="job-header">
        <h3 className="title-class">{title}</h3>
        <span className={`status ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
      </div>

      {/* Posted Date */}
      <div className="job-meta">
        <p><FaCalendarAlt className="icon" /> Posted on {postedDate}</p>
      </div>

      {/* Action Buttons */}
      <div className="job-actions">
        <button className="btn-approve">
          <FaCheckCircle className="icon" color="#fff" /> Approve
        </button>
        <button className="btn-disapprove">
          <FaTimesCircle className="icon" color="#fff" /> Disapprove
        </button>
        
        <button className="btn-view-details" onClick={togglePopup}>
          View Details
        </button>
        <button className="btn-icon">
          <FaTrash className="icon" />
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-content" onClick={e => e.stopPropagation()}>
<h2>About this service</h2>
            <h3>Personal Portfolio Website & Business Website | 100+ Projects Completed</h3>
            <p>
              Looking for a <strong>stunning personal portfolio website</strong> or a <strong>professional business presence online</strong>?
            </p>
            <p>
              Hi, I'm Hossain, a <strong>skilled web developer</strong> with <strong>7+ years of experience</strong> and <strong>100+ successful projects</strong> delivered. I specialize in creating <strong>SEO-optimized, W3-validated, and fully responsive</strong> digital platforms.
            </p>
            <button className="btn-close-popup" onClick={togglePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
