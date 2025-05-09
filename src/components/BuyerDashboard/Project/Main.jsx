'use client';
import React, { useState } from "react";
import ProjectTimeline from "./ProjectTimeline/ProjectTimeline";
import OrderDetails from "./OrdersDetails/OrdersDetails";
import RecentFiles from "./RecentFiles/RecentFiles";
import "./Main.css";
import SubmittedRequirements from "./SubmittedRequirements/SubmittedRequirements";
import ReviewPopup from "./ReviewPopup/ReviewPopup";

export default function Main() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="main-container">
      <div className="top-grid">
        <div className="left-column">
          <ProjectTimeline />
          <RecentFiles />
          <center>
            <button
              className="give-review-btn"
              onClick={() => setShowPopup(true)}
            >
              Give Review
            </button>
          </center>
        </div>
        <div className="right-column">
          <OrderDetails />
          <SubmittedRequirements />
        </div>
      </div>
      {showPopup && <ReviewPopup onClose={() => setShowPopup(false)} />}
    </div>
  );
}
