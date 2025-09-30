'use client';
import React, { useState } from 'react';
import './GigCard.css';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { FiShare2 } from 'react-icons/fi';

import toast from 'react-hot-toast';
export default function GigCard({ data }) {
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
console.log(data);
  const fallbackData = {
    gigId: 'sample123',
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

  // 🔍 Check if this gig is wishlisted
  const isWishlisted = user?.wishlist?.includes(gig.gigId);

  const handleClick = () => {
    router.push(`/services-details?gigId=${gig.gigId}`);
  };
const handleShareClick = (e) => {
  e.stopPropagation();
  if (!user?._id) return;

  const url = `${window.location.origin}/services-details?gigId=${gig.gigId}&referrerId=${user._id}`;
  navigator.clipboard.writeText(url);
  toast.success('Link copied to clipboard!');
};

  const toggleWishlist = async (e) => {
    e.stopPropagation(); // prevent card click

    if (!user?._id) {
      toast.error("Please log in to use the wishlist.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/users/toggle-wishlist`, {
        method: 'POST',
       credentials: 'include',
headers: {
  'Content-Type': 'application/json',
}
,
        body: JSON.stringify({ gigId: gig.gigId }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Toggle wishlist error:", err);
      toast.error("Error toggling wishlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gig-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="gig-image-wrapper">
        <img src={gig.image} alt="Gig thumbnail" className="gig-image" />
       <button
  className={`heart-btn ${isWishlisted ? 'wishlisted' : ''}`}
  onClick={toggleWishlist}
  disabled={loading}
>
  {isWishlisted ? <AiFillHeart size={20} color="#e0245e" /> : <AiOutlineHeart size={20} />}
</button>
{user?._id && (
  <button className="share-btn" onClick={handleShareClick}>
    <FiShare2 size={18} />
  </button>
)}

      </div>

      <div className="gig-info">
        <div className="seller-info">
          <div className="display-flex">
            <img src={gig.avatar} alt="Seller" className="seller-avatar-gigcard" />
            <span className="seller-name">{gig.sellerName}</span>

          </div>
          <span className="vetted-badge">{gig.badge}</span>
        </div>

        <p className="gig-title-gigcard">{gig.title}</p>

      <div className="gig-rating">
  <span className="star">★</span>
  {Number(gig.reviews) === 0 ? (
    <span className="no-reviews">No reviews yet</span>
  ) : (
    <>
      <span className="rating-score">{gig.rating}</span>
      <span className="rating-count">({gig.reviews})</span>
    </>
  )}
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
