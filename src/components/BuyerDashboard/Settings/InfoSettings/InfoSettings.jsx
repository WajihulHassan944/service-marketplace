import React from "react";
import Image from "next/image";
import "./InfoSettings.css";
import { FaUserCircle } from "react-icons/fa";
import Sidebar from '../Sidebar/Sidebar';
const InfoSettings = () => {
  return (
    <div className="parent-container">
       <Sidebar />
    <div className="account-containers">
        <h2>My Info</h2>
   

      <div className="form-group">
        <label>Full Name <span>*</span></label>
        <input type="text" placeholder="Enter your full name" />
      </div>

      <div className="form-group">
        <label>Phone Number</label>
        <input type="tel" placeholder="e.g. +1234567890" />
      </div>

      <div className="form-group">
        <label>Email <span>*</span></label>
        <div className="email-row">
          <input type="email" value="user@example.com" readOnly />
          <button className="change-email-btn">Change Email</button>
        </div>
      </div>

      <div className="form-group">
        <label>Admin Language</label>
        <select>
          <option>English</option>
          <option>Spanish</option>
        </select>
      </div>


      <div className="form-group">
        <label>Bio</label>
        <input type="text" placeholder="Add a short bio..." />
      </div>

      <div className="form-group profile-photo">
        <label>Profile Photo</label>
        <div className="profile-pic">
          <FaUserCircle size={40} color="#888" />
          <button className="edit-btn">Edit</button>
        </div>
        <small>(jpg or png format)</small>
      </div>

      <div className="form-group view-profile">
        <a href="#">My Profile</a>
      </div>
    </div>
    </div>
  );
};

export default InfoSettings;
