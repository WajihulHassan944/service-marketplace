'use client';
import React, { useState } from 'react';
import { FaCalendarAlt, FaTrash, FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';
import './manageJobs.css';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';

const JobCard = ({ gigId, title, postedDate, status, sellerName, sellerImage, refreshGigs }) => {
  const [message, setMessage] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [reason, setReason] = useState('');
  const router = useRouter();
const handleAction = async (type) => {
  console.log(type);

  let url = '';
  if (type === 'approve' || type === 'reject' || type === 'requiresmodification') {
    url = `${baseUrl}/gigs/status/${type}/${gigId}`;
  } else if (type === 'delete') {
    url = `${baseUrl}/gigs/delete/${gigId}`;
  }

  try {
    const res = await fetch(url, {
      method: type === 'delete' ? 'DELETE' : type === 'requiresmodification' ? 'POST' : 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: type === 'requiresmodification' ? JSON.stringify({ reason }) : null,
    });

    if (type === 'delete') {
      const data = await res.json();
      if (data.success) {
        setMessage(`Gig deleted successfully.`);
        refreshGigs();
      } else {
        setMessage(`Failed to delete gig: ${data.message}`);
      }
    } else {
      const text = await res.text();
      const cleanText = text.replace(/<[^>]+>/g, '').trim();
      if (res.ok) {
        setMessage(cleanText);
        refreshGigs();
      } else {
        setMessage(cleanText);
      }
    }

    setTimeout(() => setMessage(''), 3000);

    // Reset state if modification flow
    if (type === 'requiresmodification') {
      setShowReasonInput(false);
      setReason('');
    }
  } catch (error) {
    console.error(`Error during ${type}:`, error);
    setMessage(`Error performing ${type} action.`);
    setTimeout(() => setMessage(''), 3000);
  }
};

  return (
    <div className="job-card">
      {/* Alert Message */}
      {message && <div className="alert">{message}</div>}

      {/* Seller Info */}
      <div className="job-seller">
        <img src={sellerImage} alt={sellerName} className="seller-img" />
        <span className="seller-name">{sellerName}</span>
      </div>

      {/* Job Title and Status */}
      <div className="job-header">
        <h3 className="title-class">{title}</h3>
        <span className={`status ${status.toLowerCase().replace(/\s+/g, '-')}`}>{status}</span>
      </div>

      {/* Posted Date */}
      <div className="job-meta">
        <p><FaCalendarAlt className="icon" /> Posted on {postedDate}</p>
      </div>

      {/* Action Buttons */}
      <div className="job-actions">
        <button className="btn-approve" onClick={() => handleAction('approve')}>
          <FaCheckCircle className="icon" color="#fff" /> Approve
        </button>
        <button className="btn-disapprove" onClick={() => handleAction('reject')}>
          <FaTimesCircle className="icon" color="#fff" /> Disapprove
        </button>
        <button
          className="btn-requiresmod"
          onClick={() => setShowReasonInput(!showReasonInput)}
        >
          <FaEdit className="icon" color="#fff" /> Requires Modification
        </button>
        <button
          className="btn-view-details"
          onClick={() => window.open(`/services-details?gigId=${gigId}&admin=true`, '_blank')}
          style={{ cursor: 'pointer' }}
        >
          View Details
        </button>
        <button className="btn-icon" onClick={() => handleAction('delete')}>
          <FaTrash className="icon" />
        </button>
      </div>

      {/* Reason Input (only shows if Requires Modification is clicked) */}
      {showReasonInput && (
        <div className="reason-box">
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for modification..."
            className="reason-textarea"
          />
          <button
            className="btn-submit-reason"
            onClick={() => handleAction('requiresmodification')}
            disabled={!reason.trim()}
          >
            Submit Reason
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
