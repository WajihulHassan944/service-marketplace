import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import "./ZoomPopup.css";

const ZoomPopup = ({ onClose, onSubmit }) => {
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = () => {
    if (topic && duration) {
      onSubmit({ topic, duration });
    }
  };

  return (
    <div className="zoom-popup-overlay">
      <div className="zoom-popup">
        <div className="zoom-popup-content">
          <div className="zoom-popup-header">
            <h2>Zoom Meeting</h2>
            <FiX className="close-icon" onClick={onClose} />
          </div>
          <p className="popup-subtext">Please enter Zoom meeting details.</p>
          <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="zoom-input"
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="zoom-input"
          />
          <div className="zoom-popup-actions">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="submit-btn" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZoomPopup;
