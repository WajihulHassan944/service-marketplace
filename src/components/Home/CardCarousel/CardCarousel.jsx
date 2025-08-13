'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './Card.css';
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { FaStar, FaRegStar } from 'react-icons/fa';

import { baseUrl } from '@/const';
export default function CardCarousel() {
  const carouselRef = useRef(null);
  const router = useRouter();

  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const goToProfile = (userName) => {
    router.push(`/profile/${userName}`);
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await fetch(`${baseUrl}/users/seller-homepage-profile`);
        const data = await res.json();
        if (data.success) {
          setSellers(data.sellers);
        }
      } catch (error) {
        console.error('Failed to fetch sellers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  return (
    <div className="carousel-container">
      <button className="arrowleft" onClick={scrollLeft}>
        <IoChevronBack />
      </button>

      <div className="carousel" ref={carouselRef}>
        {loading ? (
          <p>Loading sellers...</p>
        ) : sellers.length === 0 ? (
          <p>No sellers found.</p>
        ) : (
          sellers.map((person, idx) => (
            <div
              key={idx}
              className="card"
              onClick={() => goToProfile(person.userName)}
              style={{ cursor: 'pointer' }}
            >
              <div className="image-container">
                <Image
                  src={person.profileUrl}
                  alt={person.firstName}
                  width={150}
                  height={150}
                  className="profile-image"
                />
              </div>
             <div className="details">
  <h3>{person.firstName} {person.lastName}</h3>
  <p className="role">
    <span className="verified">✔ Verified Expert</span> in {person.speciality || 'N/A'}
  </p>
  {/* <p className="title">{person.level}</p> */}

  <div className="rating-stats">
    <p className="orders-completed">
      Orders Completed: {person.ordersCompletedCount > 0 ? person.ordersCompletedCount : '0'}
    </p>

    <div className="stars">
      {parseFloat(person.averageRating) > 0 ? (
        Array.from({ length: 5 }).map((_, i) =>
          i < Math.round(person.averageRating) ? (
            <FaStar key={i} className="star-icon filled" />
          ) : (
            <FaRegStar key={i} className="star-icon" />
          )
        )
      ) : (
        <FaRegStar className="star-icon" />
      )}

      <span className="average-rating">
        {parseFloat(person.averageRating) > 0 ? person.averageRating : '0.0'}
      </span>

      <span className="review-count">
        ({person.totalReviews !== 'No reviews yet' ? person.totalReviews : 'No reviews yet'})
      </span>
    </div>
  </div>
</div>

            </div>
          ))
        )}
      </div>

      <button className="arrowright" onClick={scrollRight}>
        <IoChevronForward />
      </button>
    </div>
  );
}
