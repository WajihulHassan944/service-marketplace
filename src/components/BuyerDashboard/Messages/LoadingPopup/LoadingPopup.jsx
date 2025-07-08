import React from "react";
import { FiX } from "react-icons/fi";
import "../ZoomPopup/ZoomPopup.css";

const LoadingPopup = ({ message = "Creating a meeting...", icon = null, onClose }) => {
  return (
    <div className="zoom-popup-overlay">
      <div className="zoom-popup">
        <div className="zoom-popup-content" style={{ alignItems: "center" }}>
          <div className="zoom-popup-header" style={{ width: "100%" }}>
            <h2>Zoom Meeting</h2>
            <FiX className="close-icon" onClick={onClose} />
          </div>

          {icon ? (
            <div style={{ fontSize: "48px", color: "#28a745", marginTop: "20px" }}>
              {icon}
            </div>
          ) : (
            <div className="loader" />
          )}

          <p className="popup-subtext" style={{ marginTop: "20px", textAlign: "center" }}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPopup;
