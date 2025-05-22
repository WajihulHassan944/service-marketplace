// JobCard.jsx
import React from 'react';
import { FaCalendarAlt, FaTrash,FaCheckCircle, FaTimesCircle  } from 'react-icons/fa';

import './manageJobs.css';

const JobCard = ({ title, postedDate, expiryDate, status, candidates, sellerName, sellerImage }) => {
  return (
    <div className="job-card">
      {/* Seller Info */}
      <div className="job-seller">
        <img src={sellerImage} alt={sellerName} className="seller-img" />
        <span className="seller-name">{sellerName}</span>
      </div>

      {/* Job Title and Status */}
      <div className="job-header">
        <h3 className='title-class'>{title}</h3>
        <span className={`status ${status.toLowerCase().replace(' ', '-')}`}>{status}</span>
      </div>

      {/* Posted Date */}
      <div className="job-meta">
        <p><FaCalendarAlt className="icon" /> Posted on {postedDate}</p>
      </div>

      {/* Action Buttons */}
      <div className="job-actions">
        
     <button className="btn-approve">
  <FaCheckCircle className="icon"  color='#fff'/> Approve
</button>
<button className="btn-disapprove">
  <FaTimesCircle className="icon" color='#fff' /> Disapprove
</button>

        <button className="btn-icon">
          <FaTrash className="icon" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
