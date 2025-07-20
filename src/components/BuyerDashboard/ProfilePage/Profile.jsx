'use client';
// pages/index.js seller's
import Header from "./Header";
import About from "./About";
import Skills from "./Skills";
import Gigs from "./Gigs";
import Portfolio from "./Portfolio";
import Reviews from "./Reviews";

import "./Styles.css";
import ContactCard from "./ContactCard";
import { useEffect, useState } from "react";
export default function Profile({ sellerData }) {
  const [loading, setLoading] = useState(!sellerData);

  useEffect(() => {
    if (sellerData) {
      setLoading(false);
    }
  }, [sellerData]);

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="main-container">
      <div className="left-content">
        <div className="header-sec">
          <Header seller={sellerData.user} />
          <ContactCard seller={sellerData.user} />
        </div>
        <About
          description={
            sellerData.user?.sellerDetails?.description
              ? sellerData.user.sellerDetails.description
              : "No description added yet"
          }
        />
        <Skills skills={sellerData.user?.sellerDetails?.skills ? sellerData.user.sellerDetails.skills : "No Skills added yet"} />
        <Gigs gigs={sellerData.gigs} />
        <Portfolio
          portfolios={sellerData.portfolios}
          id={sellerData.user._id}
          name={sellerData.user.firstName}
        />
        <Reviews sellerReviews={sellerData.sellerReviews} />
      </div>
    </div>
  );
}
