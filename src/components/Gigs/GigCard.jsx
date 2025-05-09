'use client';
import React from 'react';
import './GigCard.css';
import { useRouter } from 'next/navigation';

export default function GigCard({ data, index = 0 }) {
  const router = useRouter();

  const handleClick = () => {
    router.push('/services-details');
  };

  const fallbackData = {
    image: '/assets/gigs/dummy.png',
    avatar: '/assets/gigs/avatar.png',
    sellerName: 'Kaushal',
    badge: 'Vetted Pro',
    title: 'I will convert figma to react nextjs with responsive tailwind CSS',
    rating: 5.0,
    reviews: 5,
    price: 'PKR 30,983',
    offersVideo: true,
  };

  const gig = data || fallbackData;

  return (
    <div className="gig-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="gig-image-wrapper">
        <img src={gig.image} alt="Gig thumbnail" className="gig-image" />
        <button className="heart-btn">♡</button>
      </div>

      <div className="gig-info">
        <div className="seller-info">
          <div className="display-flex">
            <img src={gig.avatar} alt="Seller" className="seller-avatar" />
            <span className="seller-name">{gig.sellerName}</span>
          </div>
          <span className="vetted-badge">{gig.badge}</span>
        </div>

        <p className="gig-title">{gig.title}</p>

        <div className="gig-rating">
          <span className="star">★</span>
          <span className="rating-score">{gig.rating}</span>
          <span className="rating-count">({gig.reviews})</span>
        </div>

        <div className="gig-price">
          <span className="from-text">From</span>
          <span className="price">{gig.price}</span>
        </div>

        {gig.offersVideo && (
          <div className="gig-extras">
            <span className="video-icon">📹</span>
            <span className="extra-text">Offers video consultations</span>
          </div>
        )}
      </div>
    </div>
  );
}
