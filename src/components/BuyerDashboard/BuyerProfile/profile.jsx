// buyer's
"use client";

import React, { useState } from "react";
import SidebarProfile from "./SidebarProfile";
import ProfileChecklist from "./Check";
import ReviewsSection from "./ReviewsSection";
import ProfileDrawer from "./ProfileDrawer";
import "./profile.css";

const BuyerProfile = ({buyerData}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="profile-container">
      <div className="main-content">
        <SidebarProfile onOpen={() => setIsDrawerOpen(true)} buyer={buyerData.user}/>
        <div className="right-section">
          <ProfileChecklist />
          <ReviewsSection buyerReviews={buyerData.buyerReviews} />
        </div>
      </div>

      <ProfileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} buyer={buyerData.user} buyerReviews={buyerData.buyerReviews} />
    </div>
  );
};

export default BuyerProfile;
