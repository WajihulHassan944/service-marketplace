import React from "react";
import { FaStar } from "react-icons/fa";

const ReviewsSection = () => {
  return (
    <div className="reviews">
      <h3>Reviews from freelancers</h3>
      <div className="rating-box">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} color="#f7b500" />
        ))}
        <p>mfurqan2002 doesn't have any reviews yet.</p>
      </div>
    </div>
  );
};

export default ReviewsSection;

