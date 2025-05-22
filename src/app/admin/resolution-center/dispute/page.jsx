'use client';
import React, { useState } from 'react';
import { FaChevronDown, FaHashtag, FaEdit } from 'react-icons/fa';
import './disputeDetails.css';

const Index = () => {
  const [description, setDescription] = useState('');
  const maxLength = 500;

  return (
    <div className="resolution-wrapper-new">
      <div className="resolution-card">
        <div className="ticket-no">
          <FaHashtag className="ticket-icon" />
          Ticket No: <strong>#123456</strong>
        </div>

        <h2 className="resolution-header">Dispute Resolution Details</h2>
        <p className="resolution-description">
          Please fill out the necessary details about this dispute. Ensure accuracy so our resolution team can assist you better.
        </p>

        <div className="resolution-section-title">
          <FaEdit className="section-icon" />
          Dispute Resolution
        </div>

        <div className="resolution-form-row">
          <div className="resolution-form-group">
            <label>Resolution Title</label>
            <input type="text" placeholder="Enter dispute title" />
          </div>

          <div className="resolution-form-group custom-select-wrapper">
            <label>Dispute Type</label>
            <div className="custom-select">
              <select defaultValue="">
                <option value="" disabled>Select Dispute Type</option>
                <option>Payment Issue</option>
                <option>Communication Problem</option>
                <option>Delivery Delay</option>
              </select>
              <FaChevronDown className="select-icon" />
            </div>
          </div>

          <div className="resolution-form-group custom-select-wrapper">
            <label>Category</label>
            <div className="custom-select">
              <select defaultValue="">
                <option value="" disabled>Select Category</option>
                <option>Buyer</option>
                <option>Seller</option>
                <option>Platform</option>
              </select>
              <FaChevronDown className="select-icon" />
            </div>
          </div>
        </div>

        <div className="resolution-form-group">
          <label>Resolution Description</label>
          <textarea
            placeholder="Describe the issue in detail..."
            maxLength={maxLength}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="char-count">{description.length} / {maxLength}</div>
        </div>

        <button className="resolution-submit-btn">Submit Dispute</button>
      </div>
    </div>
  );
};

export default Index;
