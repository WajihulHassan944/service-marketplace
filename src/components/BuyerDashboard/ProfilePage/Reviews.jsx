import Image from "next/image";
import { Star } from "lucide-react";

export default function Reviews({ buyerReviews = [] }) {
  if (buyerReviews.length === 0) {
    return (
      <div className="reviews-container">
        <h3>Reviews</h3>
        <p className="no-gig-message">No reviews available yet.</p>
      </div>
    );
  }

  return (
    <div className="reviews-container">
      <h3>
        {buyerReviews.length} Review{buyerReviews.length > 1 ? "s" : ""}
      </h3>

      {buyerReviews.map((review, idx) => {
        const seller = review.reviewedSeller || {};
        const buyer = review.reviewerBuyer || {};
        const sellerName = `${seller.firstName || "Unknown"} ${
          seller.lastName || ""
        }`;
        const sellerCountry = seller.country || "Unknown";
        const sellerFlag = getFlagEmoji(sellerCountry);
        const sellerProfile = seller.profileUrl || "/assets/default-user.png";

        // rating stars
        const rating = Math.round(review.overallRating || 0);

        return (
          <div className="review-card" key={idx}>
            <div className="review-top">
              <Image
                src={buyer.profileUrl || "/assets/default-user.png"}
                alt="Reviewer"
                width={50}
                height={50}
                className="review-avatar"
              />
              <div className="reviewer-details">
                <div className="reviewer-name">
                  <strong>
                    {buyer.firstName} {buyer.lastName}
                  </strong>{" "}
                  <span className="badge">Buyer</span>
                </div>
                <div className="reviewer-location">
                  {getFlagEmoji(buyer.country)} {buyer.country || "Unknown"}
                </div>
              </div>
            </div>

            <div className="review-rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  fill={i < rating ? "#FFD700" : "none"}
                  stroke={i < rating ? "#FFD700" : "#ccc"}
                />
              ))}
              <span className="review-time">• {review.timeAgo}</span>
            </div>

            <p className="review-text">{review.review}</p>

            {/* Extra details */}
            <div className="review-extra">
              <p>
                <strong>Seller:</strong> {sellerName} ({sellerFlag}{" "}
                {sellerCountry})
              </p>
              {review.reviewedGig?.title && (
                <p>
                  <strong>Gig:</strong> {review.reviewedGig.title}
                </p>
              )}
              <p>
                <strong>Ratings:</strong> Communication {review.communicationLevel} | 
                Service {review.serviceAsDescribed} | Recommend{" "}
                {review.recommendToFriend}
              </p>
            </div>

            <div className="review-helpful">
              Helpful? <button>👍 Yes</button> <button>👎 No</button>
            </div>
          </div>
        );
      })}

      <button className="view-gig">View all reviews</button>
    </div>
  );
}

// Utility to get flag emoji from country name
function getFlagEmoji(country) {
  const flags = {
    Pakistan: "🇵🇰",
    "United States": "🇺🇸",
    Canada: "🇨🇦",
    India: "🇮🇳",
    Germany: "🇩🇪",
    France: "🇫🇷",
    UK: "🇬🇧",
    Australia: "🇦🇺",
    Malaysia: "🇲🇾",
    China: "🇨🇳",
    Japan: "🇯🇵",
    Brazil: "🇧🇷",
    Nigeria: "🇳🇬",
  };
  return flags[country] || "🌍";
}
