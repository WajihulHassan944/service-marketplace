'use client';

import React from "react";
import { FaTimes, FaMapMarkerAlt, FaCalendarAlt, FaGlobe } from "react-icons/fa";
import ReviewsSection from "./ReviewsSection";

// Utility to map and format local time based on country
const countryTimezoneMap = {
  'United States': 'America/New_York',
  'Canada': 'America/Toronto',
  'United Kingdom': 'Europe/London',
  'Germany': 'Europe/Berlin',
  'France': 'Europe/Paris',
  'Italy': 'Europe/Rome',
  'Spain': 'Europe/Madrid',
  'India': 'Asia/Kolkata',
  'Pakistan': 'Asia/Karachi',
  'Bangladesh': 'Asia/Dhaka',
  'United Arab Emirates': 'Asia/Dubai',
  'Saudi Arabia': 'Asia/Riyadh',
  'China': 'Asia/Shanghai',
  'Japan': 'Asia/Tokyo',
  'South Korea': 'Asia/Seoul',
  'Malaysia': 'Asia/Kuala_Lumpur',
  'Australia': 'Australia/Sydney',
  'Brazil': 'America/Sao_Paulo',
  'Mexico': 'America/Mexico_City',
  'Russia': 'Europe/Moscow',
  'South Africa': 'Africa/Johannesburg',
  'Indonesia': 'Asia/Jakarta',
  'Nigeria': 'Africa/Lagos',
  'Argentina': 'America/Argentina/Buenos_Aires',
};

const getJoinedDate = (createdAt) => {
  try {
    const date = new Date(createdAt);
    const options = { month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  } catch {
    return 'Unknown';
  }
};

const ProfileDrawer = ({ isOpen, onClose, buyer, buyerReviews }) => {
  if (!buyer) return null;

  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <h2>User Profile</h2>
        <FaTimes className="close-icon" onClick={onClose} />
      </div>

      <div className="drawer-content">
        <img
          src={buyer.profileUrl || "/assets/default-user.png"}
          alt="Profile"
          className="avatar-large"
        />
        <h3>{buyer.firstName} {buyer.lastName}</h3>
        <p className="username">{buyer.userName}</p>

        <ul className="info-list-1">
          <li><FaMapMarkerAlt /> Located in {buyer.country || "Unknown"}</li>
          <li><FaCalendarAlt /> Joined in {getJoinedDate(buyer.createdAt)}</li>
        </ul>

        <ul className="info-list-2">
          <li><FaGlobe /> English</li>
        </ul>

        <ReviewsSection buyerReviews={buyerReviews} />
      </div>
    </div>
  );
};

export default ProfileDrawer;
