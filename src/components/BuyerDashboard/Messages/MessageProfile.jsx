'use client';
import { FaGlobeAsia, FaRegClock } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import Link from 'next/link';
import './Messages.css';
import { baseUrl } from '@/const';
import { useSelector } from 'react-redux';

const getTimeOffsetFromCountry = (country) => {
  const offsets = {
    "Pakistan": 5,
    "India": 5.5,
    "United States": -4,
    "Canada": -4,
    "United Kingdom": 0,
    "Germany": 1,
    "France": 1,
    "Australia": 10,
    "UAE": 4,
    "China": 8,
    "Japan": 9,
    "Malaysia": 8,
  };

  const offset = offsets[country] ?? 0;
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const userTime = new Date(utc + offset * 3600000);

  return userTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  }) + ` (UTC${offset >= 0 ? '+' : ''}${offset})`;
};

const MessageProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
 const [buyerReviews, setBuyerReviews] = useState([]);
const [sellerReviews, setSellerReviews] = useState([]);
  const [localTime, setLocalTime] = useState('');
 const reduxUser = useSelector((state) => state.user);
const isSeller = reduxUser.currentDashboard === "seller";
  // Fetch profile data
  useEffect(() => {
    if (userId) {
      fetch(`${baseUrl}/users/getSellerProfileData/${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUser(data.user);
            setBuyerReviews(data.buyerReviews || []);
             setSellerReviews(data.sellerReviews || []);
          }
        });
    }
  }, [userId]);

  // Update time every minute
  useEffect(() => {
    if (!user?.country) return;

    const updateTime = () => {
      const time = getTimeOffsetFromCountry(user.country);
      setLocalTime(time);
    };

    updateTime(); // initial call
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, [user?.country]);

  if (!user) return null;

  return (
    <div className="info-panel">
      <img src={user.profileUrl || '/assets/users/placeholder.png'} alt={user.firstName} className="user-avatar" />
      <h4>{user.firstName} {user.lastName}</h4>
   
<p className="role">
  <FaGlobeAsia style={{ marginRight: '6px' }} /> {user.country}
</p>
<p className="time">
  <FaRegClock style={{ marginRight: '6px' }} /> {localTime}
</p>

      <div className="action-buttons">
   <Link
  href={`${isSeller ? '/buyer' : ''}/profile?id=${userId}`}
  className="view-proposal-btn"
>
  View profile
</Link>


      </div>

<div className="info-section">
  <h5>{isSeller ? 'Buyer Reviews' : 'Seller Reviews'}</h5>

  {(isSeller ? buyerReviews : sellerReviews).length > 0 ? (
    (isSeller ? buyerReviews : sellerReviews).map((review, idx) => {
      const reviewer = isSeller
        ? review.reviewedGigSeller
        : review.reviewedGigBuyer;

      return (
        <div className="review-box" key={idx}>
          <div className="reviewer-info">
            <img
              src={reviewer?.profileUrl || '/assets/users/placeholder.png'}
              alt="Reviewer"
              className="reviewer-avatar"
            />
            <div>
              <strong>{reviewer?.firstName} {reviewer?.lastName}</strong>
              <p className="review-time">{review.timeAgo}</p>
            </div>
          </div>
          <p className="review-text">"{review.review}"</p>
        </div>
      );
    })
  ) : (
    <div className="no-reviews">
      <div>
        {[...Array(5)].map((_, i) => (
          <FaRegStar key={i} className="empty-star" />
        ))}
      </div>
      <p>No reviews yet from {isSeller ? 'freelancers' : 'buyers'}</p>
    </div>
  )}
</div>

    </div>
  );
};

export default MessageProfile;
