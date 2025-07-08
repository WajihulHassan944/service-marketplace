import Image from "next/image";

export default function Reviews({ sellerReviews = [] }) {
  if (sellerReviews.length === 0) {
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
        {sellerReviews.length} Review{sellerReviews.length > 1 ? "s" : ""}
      </h3>

      {sellerReviews.map((review, idx) => {
        const reviewer = review.reviewedGigBuyer || {};
        const reviewerName = `${reviewer.firstName || "Unknown"} ${reviewer.lastName || ""}`;
        const reviewerCountry = reviewer.country || "Unknown";
        const reviewerFlag = getFlagEmoji(reviewerCountry);
        const profileImage = reviewer.profileUrl || "/assets/default-user.png";

        return (
          <div className="review-card" key={idx}>
            <div className="review-top">
              <Image
                src={profileImage}
                alt="Reviewer"
                width={50}
                height={50}
                className="review-avatar"
              />
              <div className="reviewer-details">
                <div className="reviewer-name">
                  <strong>{reviewerName}</strong>{" "}
                  <span className="badge">Received as Seller</span>
                </div>
                <div className="reviewer-location">
                  {reviewerFlag} {reviewerCountry}
                </div>
              </div>
            </div>

            <div className="review-rating">
              <span>{"⭐".repeat(review.rating || 5)}</span>
              <span className="review-time">• {review.timeAgo}</span>
            </div>

            <p className="review-text">{review.review}</p>

            {(review.price || review.duration || review.tag) && (
              <div className="review-meta">
                {review.price && (
                  <div className="meta-box">
                    <strong>{review.price}</strong>
                    <span>Price</span>
                  </div>
                )}
                {review.duration && (
                  <div className="meta-box">
                    <strong>{review.duration}</strong>
                    <span>Duration</span>
                  </div>
                )}
                {review.tag && (
                  <div className="meta-box tag-box">
                    <span>{review.tag}</span>
                  </div>
                )}
              </div>
            )}

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

// Utility to get flag emoji from country name (basic)
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
