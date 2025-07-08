import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewsSection = ({ buyerReviews = [] }) => {
  const hasReviews = buyerReviews.length > 0;

  return (
    <div className="reviews">
      <h3>Reviews from freelancers</h3>

      {hasReviews ? (
        buyerReviews.map((review, idx) => (
          <div key={idx} className="rating-box">
            <div className="stars">
              {[...Array(review.rating || 5)].map((_, i) => (
                <FaStar key={i} color="#f7b500" />
              ))}
            </div>
            <p className="review-text">"{review.review}"</p>
          </div>
        ))
      ) : (
        <div className="rating-box">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color="#ccc" />
          ))}
          <p>This user doesn't have any reviews yet.</p>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
