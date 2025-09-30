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
const clients = sellerData?.clients || [];

  return (
    <div className="main-container">
      <div className="left-content">
        <div className="header-sec">
          <Header seller={sellerData.user} />
          <ContactCard seller={sellerData.user} />
        </div>
        <About seller={sellerData.user} />

        <Skills skills={sellerData.user?.sellerDetails?.skills ? sellerData.user.sellerDetails.skills : "No Skills added yet"} />
        <Gigs sellerData={sellerData} />
        <Portfolio
          portfolios={sellerData.portfolios}
          id={sellerData.user._id}
          name={sellerData.user.firstName}
        />
             {clients.length > 0 && (
    <>
    <strong style={{ fontSize: '18px', marginBottom: '10px', display: 'block', paddingTop: '5px'}}>Among my Clients</strong>
  
  <div style={{border: '1px solid #eee', borderRadius: '8px', maxWidth: '1300px', marginTop: '20px', }}>
    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', padding: '15px' }}>
      {clients.map((client) => (
        <div key={client._id} style={{ textAlign: 'center', maxWidth: '100px' }}>
          <img
            src={client.profileUrl}
            alt={client.name}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              objectFit: 'cover',
              marginBottom: '6px',
            }}
          />
          <div style={{ fontSize: '14px', fontWeight: '500' }}>{client.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{client.country}</div>
        </div>
      ))}
    </div>
  </div> </>
)}
      <Reviews buyerReviews={sellerData.buyerReviews} />

      </div>
    </div>
  );
}
