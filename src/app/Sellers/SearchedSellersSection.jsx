'use client';

import React, { useEffect, useState } from 'react';
import './SearchedSellers.css';
import { baseUrl } from '@/const';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaStar, FaRegStar } from 'react-icons/fa';

const SearchedSellersSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('search') || '';
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellers = async () => {
    
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${baseUrl}/users/search-users?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();

        if (data.success) {
          setSellers(data.users);
        } else {
          setError(data.message || 'Failed to fetch sellers.');
        }
      } catch (err) {
        setError('An error occurred while fetching sellers.');
      } finally {
        setLoading(false);
      }
    };

    fetchSellers();
  }, [searchQuery]);

  const handleCardClick = (userId) => {
    router.push(`/profile?id=${userId}`);
  };

  return (
    <section className="searched-sellers-section">
      <div className="searched-sellers-section__header">
        <h2 className="searched-sellers-section__title">Verified Experts</h2>
      {searchQuery && (
        <p className="searched-sellers-section__subtitle">
          Showing results for <strong>{searchQuery}</strong>
        </p> )}
      </div>

      {loading ? (
        <p className="searched-sellers-section__loading" />
      ) : error ? (
        <p className="searched-sellers-section__error">{error}</p>
      ) : sellers.length === 0 ? (
  <p className="searched-sellers-section__no-results">🚫 No sellers found for <strong>{searchQuery}</strong>.</p>
      ) : (
        <div className="searched-sellers-section__grid">
          {sellers.map((seller) => (
            <div
              key={seller._id}
              className="searched-sellers-section__card"
              onClick={() => handleCardClick(seller._id)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={seller.profileUrl || '/assets/default-avatar.png'}
                alt={seller.firstName}
                className="searched-sellers-section__image"
              />
              <div className="searched-sellers-section__overlay">
                <h3 className="searched-sellers-section__name">
                  {seller.firstName} {seller.lastName}
                </h3>
                <p className="searched-sellers-section__role">
                  {seller?.sellerDetails?.speciality || 'Freelancer'}
                </p>
               <p className="searched-sellers-section__role">
  Orders Completed: {seller.ordersCompletedCount > 0 ? seller.ordersCompletedCount : 'No orders yet'}
</p>

<div className="searched-sellers-section__rating">
  {seller.averageRating ? (
    <>
      {Array.from({ length: 5 }).map((_, i) =>
        i < Math.round(seller.averageRating) ? (
          <FaStar key={i} className="star-icon filled" />
        ) : (
          <FaRegStar key={i} className="star-icon" />
        )
      )}
      <span className="searched-sellers-section__rating-text">
        {seller.averageRating.toFixed(1)}
      </span> <span className='rev-count'>({seller.reviewCount})</span>
    </>
  ) : (
    <>
      <FaRegStar className="star-icon" />
      <span className="searched-sellers-section__rating-text">Not Rated</span>
    </>
  )}
</div>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchedSellersSection;
