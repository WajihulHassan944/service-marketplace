import React from "react";
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaGlobe } from "react-icons/fa";
import ReviewsSection from "./ReviewsSection";

const ProfileDrawer = ({ isOpen, onClose }) => {
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <h2>Your Profile</h2>
        <FaTimes className="close-icon" onClick={onClose} />
      </div>
      <div className="drawer-content">
        <img src="/assets/myimg.jpg" alt="Profile" className="avatar-large" />
        <h3>Muhammad F</h3>
        <p className="username">@mfurqan2002</p>
        <ul className="info-list-1">
          <li><FaMapMarkerAlt /> Located in Pakistan</li>
          <li><FaCalendarAlt /> Joined in March 2025</li>
        </ul>
        <ul className="info-list-2">
          <li><FaGlobe /> English (Conversational)</li>
          <li><FaGlobe /> Spanish (Conversational)</li>
          <li><FaGlobe /> Hebrew (Conversational)</li>
          <li><FaGlobe /> French (Conversational)</li>
        </ul>
        <ReviewsSection />
      </div>
    </div>
  );
};

export default ProfileDrawer;
