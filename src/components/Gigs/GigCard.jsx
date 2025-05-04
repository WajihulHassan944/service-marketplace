'use client';
import React from 'react';
import './GigCard.css';
import { useRouter } from 'next/navigation';

export default function GigCard() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/services-details');
  };

  return (
    <div className="gig-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="gig-image-wrapper">
        <img src="/assets/gigs/dummy.png" alt="Gig thumbnail" className="gig-image" />
        <button className="heart-btn">♡</button>
      </div>

      <div className="gig-info">
        <div className="seller-info">
         <div className='display-flex'> <img src="/assets/gigs/avatar.png" alt="Seller" className="seller-avatar" />
         <span className="seller-name">Kaushal</span></div>
          <span className="vetted-badge">Vetted Pro</span>
        </div>

        <p className="gig-title">
          I will convert figma to react nextjs with responsive tailwind CSS
        </p>

        <div className="gig-rating">
          <span className="star">★</span>
          <span className="rating-score">5.0</span>
          <span className="rating-count">(5)</span>
        </div>

        <div className="gig-price">
          <span className="from-text">From</span>
          <span className="price">PKR 30,983</span>
        </div>

        <div className="gig-extras">
          <span className="video-icon">📹</span>
          <span className="extra-text">Offers video consultations</span>
        </div>
      </div>
    </div>
  );
}
