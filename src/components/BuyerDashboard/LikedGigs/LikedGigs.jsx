'use client';
import React, { useEffect, useState } from 'react';
import "./LikedGigs.css";
import GigCard from '@/components/Gigs/GigCard';
import { useSelector } from 'react-redux';
import { baseUrl } from '@/const';
const LikedGigs = () => {
  const user = useSelector((state) => state.user);
  const [likedGigs, setLikedGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedGigs = async () => {
      try {
        const res = await fetch(`${baseUrl}/users/wishlisted-gigs`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await res.json();
        console.log(data);
        if (data.success) {
          setLikedGigs(data.gigs);
        }
      } catch (err) {
        console.error('Failed to fetch liked gigs', err);
      } finally {
        setLoading(false);
      }
    };

      fetchLikedGigs();
  }, [user]);

  return (
    <div className='liked-services-container'>
      <h1 className='liked-head'>Liked Services</h1>

      <div className='results-liked'>
        {loading ? (
          <span>Loading liked gigs...</span>
        ) : likedGigs.length > 0 ? (
          <span>{likedGigs.length} result{likedGigs.length > 1 ? 's' : ''}</span>
        ) : (
          <span>No liked gigs found</span>
        )}
      </div>

      <div className='liked-services-wrap'>
        {!loading && likedGigs.map((gig) => (
          <GigCard
            key={gig._id}
            data={{
              gigId: gig._id,
              image: gig.images?.[0]?.url || '/assets/gigs/dummytwo.png',
              avatar: gig.userId?.profileUrl || '/assets/gigs/avatar.png',
              sellerName: `${gig.userId?.firstName || ''} ${gig.userId?.lastName || ''}`,
              badge: gig.userId?.sellerDetails?.level || 'New Seller',
              title: gig.gigTitle,
              rating: gig.userId?.averageRating || "0.0",
              reviews: gig.userId?.ratingCount || 0,
              price: `$${gig.packages?.basic?.price || 'N/A'}`,
              offersVideo: gig.videoIframes?.length > 0,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedGigs;
