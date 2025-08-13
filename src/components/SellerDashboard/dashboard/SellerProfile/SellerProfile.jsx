'use client';
import React from 'react'
import { FaEnvelope, FaMoneyBillWave, FaBriefcase, FaStickyNote } from 'react-icons/fa';

import '../../../BuyerDashboard/Messages/Messages.css';
import Link from 'next/link';
import { useSelector } from 'react-redux';
const SellerProfile = () => {
 const user = useSelector((state) => state.user);
 
  return (
  <div className="info-panel" style={{marginLeft:'0'}}>

          <img src={user.profileUrl} alt="Mercedes" className="user-avatar" style={{padding:'3px', background:'#e4e8f3'}} />
          <h4>{user.firstName} {user.lastName}</h4>
          <p className="role">🌐 {user.sellerDetails.speciality}</p>
           {user.sellerReviews && user.sellerReviews.length > 0 ? (
  <p className="time">
    ⭐ {(
      user.sellerReviews.reduce((sum, review) => sum + (review.rating || 0), 0) / user.sellerReviews.length
    ).toFixed(1)} Rating ({user.sellerReviews.length} reviews)
  </p>
) : (
  <p className="time">No reviews yet</p>
)}
     <p className="time">{user.sellerDetails.level}</p>
        
          <div className="action-buttons">
          <Link href={`/profile/${user.userName}`} className="view-proposal-btn"> Preview profile</Link>
          </div>
  
         <div className="info-section">
  <Link href="/messages" className="info-item"><FaEnvelope /> Messages</Link>
  <Link href="/seller/earnings" className="info-item"><FaMoneyBillWave /> Earnings</Link>
  <Link href="/seller/services" className="info-item"><FaBriefcase /> My Services</Link>
  <Link href="/seller/notepad" className="info-item"><FaStickyNote /> Personal Notepad</Link>
</div>
        </div>
  )
}

export default SellerProfile
