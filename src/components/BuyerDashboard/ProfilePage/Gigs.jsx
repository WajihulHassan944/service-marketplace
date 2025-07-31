'use client';
import "./Styles.css";
import Link from "next/link";
import { useState } from "react";
import GigCard from "../../../components/Gigs/GigCard"; // Make sure you import this if it's external

export default function Gigs({ sellerData }) {
  console.log(sellerData);
  const [visibleCount, setVisibleCount] = useState(4); // Show 4 initially
 const gigs = sellerData.gigs;
  const activeGigs = gigs?.filter(gig => gig.status === 'active') || [];
console.log("active gigs are", activeGigs);
  const handleViewMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const isAllVisible = visibleCount >= activeGigs.length;

  if (!gigs || gigs.length === 0) {
    return (
      <div className="gigs-container">
        <h3>My Gigs</h3>
        <p className="no-gig-message">No gigs available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="gigs-container">
      <h3>My Gigs</h3>
      <div className="popular-services-homeoage-wrap">
        {activeGigs.length === 0 ? (
          <p className="no-gigs-message">
            No active gigs found at the moment. Please check back later.
          </p>
        ) : (
          activeGigs
            .slice(0, visibleCount)
            .map((gig) => (
              <GigCard
                key={gig._id}
                data={{
                  gigId: gig._id,
                  image: gig.images?.[0]?.url,
                  avatar: sellerData.user.profileUrl,
                  sellerName: `${gig.userId?.firstName || ''} ${gig.userId?.lastName || ''}`,
                  badge: 'New Seller',
                  title: gig.gigTitle,
                  rating: 5,
                  reviews: 0,
                  price: `$${gig.packages?.basic?.price || gig.packages?.standard?.price || 'N/A'}`,
                  offersVideo: true,
                }}
              />
            ))
        )}
      </div>
      {!isAllVisible && (
        <button className="view-gig" onClick={handleViewMore}>
          View more ({Math.max(activeGigs.length - visibleCount, 0)} remaining)
        </button>
      )}
    </div>
  );
}
