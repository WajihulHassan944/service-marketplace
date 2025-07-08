'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaClock } from "react-icons/fa";

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

const getLocalTime = (country) => {
  try {
    const timezone = countryTimezoneMap[country] || 'UTC';
    return new Date().toLocaleTimeString('en-US', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return 'Unknown';
  }
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

const SidebarProfile = ({ onOpen, buyer }) => {
  const router = useRouter();

  return (
    <div className="sidebar">
      <img src={buyer.profileUrl} alt="Profile" className="avatar" />
      <h3 className="name-heading">{buyer.firstName} {buyer.lastName}</h3>
      <p className="username">{buyer.userName}</p>

      {/* Basic Info */}
      <ul className="profile-info">
        <li><FaMapMarkerAlt /> Located in {buyer.country}</li>
        <li><FaCalendarAlt /> Joined in {getJoinedDate(buyer.createdAt)}</li>
        <li><FaClock /> {getLocalTime(buyer.country)} local time</li>
      </ul>

      {/* Language Info */}
      <ul className="profile-info">
        <li><FaGlobe /> English</li>
      </ul>

      <button className="btn" onClick={onOpen}>
        View profile
      </button>

      <button className="btn outline" onClick={() => router.push("/services")}>
        Explore Services
      </button>
    </div>
  );
};

export default SidebarProfile;
