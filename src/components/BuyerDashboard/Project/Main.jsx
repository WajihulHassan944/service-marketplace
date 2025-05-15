'use client';
import React, { useState } from "react";
import ProjectTimeline from "./ProjectTimeline/ProjectTimeline";
import OrderDetails from "./OrdersDetails/OrdersDetails";
import RecentFiles from "./RecentFiles/RecentFiles";
import SubmittedRequirements from "./SubmittedRequirements/SubmittedRequirements";
import InviteModal from "./InviteModal/InviteModal";
import ReviewPopup from "./ReviewPopup/ReviewPopup";
import "./Main.css";

export default function Main() {
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  
  return (
    <div className="main-container">
      <div className="top-grid">
        <div className="left-column">
          <ProjectTimeline />
          <RecentFiles />
          <center className="flexed-div">
            <button
              className="give-review-btn"
              onClick={() => setShowReviewPopup(true)}
            >
              Give Review
            </button>
                 <InviteModal />
          </center>
        </div>
        <div className="right-column">
          <OrderDetails />
          <SubmittedRequirements />
        </div>
      </div>

      {showReviewPopup && <ReviewPopup onClose={() => setShowReviewPopup(false)} />}
   
     </div>
  );
}
