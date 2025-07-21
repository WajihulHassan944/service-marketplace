'use client';
import "./Styles.css";
import Link from "next/link";
import { useState } from "react";

export default function Gigs({ gigs }) {
  const [visibleCount, setVisibleCount] = useState(4); // Show 4 initially

  if (!gigs || gigs.length === 0) {
    return (
      <div className="gigs-container">
        <h3>My Gigs</h3>
        <p className="no-gig-message">No gigs available at the moment.</p>
      </div>
    );
  }

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const isAllVisible = visibleCount >= gigs.length;

  return (
    <div className="gigs-container">
      <h3>My Gigs</h3>
      <div className="gigs-grid">
        {gigs.slice(0, visibleCount).map((gig) => {
          const gigImage = gig.images?.[0]?.url || "/assets/gigs/dummy.png";
          const gigTitle = gig.gigTitle || "Untitled Gig";
         const price = gig.packages?.basic?.price
  ? `PKR ${gig.packages.basic.price * 278}`
  : gig.packages?.standard?.price
  ? `PKR ${gig.packages.standard.price * 278}`
  : gig.packages?.premium?.price
  ? `PKR ${gig.packages.premium.price * 278}`
  : "Price not set";


          return (
           <>{
  gig.status === 'active' ? (
    <Link
      href={`/services-details?gigId=${gig._id}`}
      key={gig._id}
      className="gig-card"
    >
      <img src={gigImage} alt={gigTitle} />
      <h4>{gigTitle}</h4>
      <p>{price}</p>
    </Link>
  ) : (
    <div
      key={gig._id}
      className="gig-card gig-card-disabled"
      title="This gig is not active"
      style={{ opacity: 0.5, cursor: 'not-allowed', pointerEvents: 'none' }}
    >
      <img src={gigImage} alt={gigTitle} />
      <h4>{gigTitle}</h4>
      <p>{price}</p>
    </div>
  )
}
</>
          );
        })}
      </div>

      {!isAllVisible && (
        <button className="view-gig" onClick={handleViewMore}>
          View more ({Math.max(gigs.length - visibleCount, 0)} remaining)
        </button>
      )}
    </div>
  );
}
