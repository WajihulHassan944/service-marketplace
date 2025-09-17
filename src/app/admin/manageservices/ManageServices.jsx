'use client';
import React, { useState } from 'react';
import { FaCalendarAlt, FaTrash, FaCheckCircle, FaTimesCircle, FaEdit } from 'react-icons/fa';
import './manageJobs.css';
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
const JobCard = ({ gigId, title, postedDate, status, sellerName, sellerImage, refreshGigs,modificationRequests }) => {
  const [message, setMessage] = useState('');
  const [showReasonInput, setShowReasonInput] = useState(false);
const [reason, setReason] = useState({});
 const [showRequestedDetails, setShowRequestedDetails] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);

const handleAction = async (type) => {
  setIsSubmitting(true);

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
      body:
        type === "requiresmodification"
          ? JSON.stringify({
              modifications: Object.entries(reason).map(([field, reason]) => ({
                field,
                reason,
              })),
            })
          : null,
    });

    let toastMsg = "";
    if (type === 'delete') {
      const data = await res.json();
      toastMsg = data.success
        ? "Gig deleted successfully."
        : `Failed to delete gig: ${data.message}`;
      if (data.success) refreshGigs();
    } else {
      const text = await res.text();
      const cleanText = text.replace(/<[^>]+>/g, '').trim();
      toastMsg = cleanText;
      if (res.ok) refreshGigs();
    }

    setMessage(toastMsg);
    toast.success(toastMsg);

    // Reset state if modification flow
    if (type === 'requiresmodification') {
      setShowReasonInput(false);
      setReason('');
    }
  } catch (error) {
    console.error(`Error during ${type}:`, error);
    setMessage(`Error performing ${type} action.`);
    toast.error(`Error performing ${type} action.`);
  } finally {
    setIsSubmitting(false);
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
        {status === "requiresmodification" && (
  <button
    className="btn-view-requests"
    onClick={() => setShowRequestedDetails(true)}
  >
    View Requested Details
  </button>
)}

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
{showReasonInput && (
  <div className="reason-overlay">
    <div className="reason-box">
      {/* Close (X) Button */}
      <button
        className="reason-close"
        onClick={() => setShowReasonInput(false)}
      >
        ×
      </button>

      <h4>Select fields that require modification:</h4>

      {/* Scrollable Content */}
      <div className="reason-content">
        {[
          { key: "gigTitle", label: "Title" },
          { key: "gigDescription", label: "Description" },
          { key: "packages", label: "Pricing" },
          { key: "faqs", label: "FAQ" },
          { key: "images", label: "Gallery" },
          { key: "videoIframes", label: "Video" },
          { key: "pdf", label: "Gig document" },
          { key: "category", label: "Category" },
          { key: "subcategory", label: "Subcategory" },
          { key: "subcategorychild", label: "Subcategory Child" },
          { key: "positiveKeywords", label: "Positive Keywords" },
          { key: "hourlyRate", label: "Hourly Rate" },
        ].map(({ key, label }) => (
          <div key={key} className="field-item">
            <label>
              <input
                type="checkbox"
                checked={reason[key] !== undefined}
                onChange={(e) => {
                  if (e.target.checked) {
                    setReason((prev) => ({ ...prev, [key]: "" }));
                  } else {
                    setReason((prev) => {
                      const copy = { ...prev };
                      delete copy[key];
                      return copy;
                    });
                  }
                }}
              />
              {label}
            </label>
            {reason[key] !== undefined && (
              <textarea
                value={reason[key]}
                onChange={(e) =>
                  setReason((prev) => ({ ...prev, [key]: e.target.value }))
                }
                placeholder={`Enter reason for ${label.toLowerCase()}...`}
                className="reason-textarea"
              />
            )}
          </div>
        ))}
      </div>

      {/* Sticky Action Buttons */}
      <div className="reason-actions">
        <button
          className="btn-cancel-reason"
          onClick={() => setShowReasonInput(false)}
        >
          Cancel
        </button>
       <button
  className="btn-submit-reason"
  onClick={() => handleAction("requiresmodification")}
  disabled={isSubmitting || Object.values(reason).every((r) => !r.trim())}
>
  {isSubmitting ? "Submitting..." : "Submit Modification Request"}
</button>

      </div>
    </div>
  </div>
)}
{showRequestedDetails && (
  <div className="reason-overlay">
    <div className="reason-box">
      <button
        className="reason-close"
        onClick={() => setShowRequestedDetails(false)}
      >
        ×
      </button>
      <h4>Requested Modification Details</h4>
      <div className="reason-content">
        {(!modificationRequests || modificationRequests.length === 0) ? (
          <p>No modification requests found.</p>
        ) : (
          modificationRequests.map((req) => (
            <div key={req._id} className="field-item">
              <strong>{req.field}</strong>
              <p>{req.reason}</p>
              <small>
                Requested on{" "}
                {new Date(req.requestedAt).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>
      <div className="reason-actions">
        <button
          className="btn-cancel-reason"
          onClick={() => setShowRequestedDetails(false)}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default JobCard;
