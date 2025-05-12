"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Use this in App Router
import { FaMapMarkerAlt, FaCalendarAlt, FaGlobe,FaClock } from "react-icons/fa";

const SidebarProfile = ({ onOpen }) => {
  const router = useRouter();

  return (
    <div className="sidebar">
      <img src="/assets/myimg.jpg" alt="Profile" className="avatar" />
      <h3 className="name-heading">Muhammad F</h3>
      <p className="username">@mfurqan2002</p>

      {/* Basic Info */}
      <ul className="profile-info">
        <li><FaMapMarkerAlt /> Located in Pakistan</li>
        <li><FaCalendarAlt /> Joined in March 2025</li>
        <li><FaClock /> Preferred working hours</li>
      </ul>

      {/* Language Info */}
      <ul className="profile-info">
        <li><FaGlobe /> English (Conversational)</li>
        <li><FaGlobe /> Spanish (Conversational)</li>
        <li><FaGlobe /> Hebrew (Conversational)</li>
        <li><FaGlobe /> French (Conversational)</li>
      </ul>

      <button className="btn" onClick={onOpen}>
        Preview public profile
      </button>
      
      {/* Navigate to home */}
      <button className="btn outline" onClick={() => router.push("/")}>
        Explore Todo
      </button>
    </div>
  );
};

export default SidebarProfile;
