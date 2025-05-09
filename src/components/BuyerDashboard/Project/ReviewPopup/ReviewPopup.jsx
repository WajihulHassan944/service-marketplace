import React, { useState } from "react";
import "./ReviewPopup.css";

const criteria = [
  "Recommend to a friend",
  "Communication level",
  "Service as described",
];

const ReviewPopup = ({ onClose }) => {
  const [ratings, setRatings] = useState({
    recommend: 0,
    communication: 0,
    service: 0,
  });
  const [reviewDesc, setReviewDesc] = useState("");

  const handleStarClick = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Review:", ratings, reviewDesc);
    onClose();
  };

  return (
    <div className="review-popup-overlay">
      <div className="review-popup">
        <h2 className="popup-title">DosTask Reviews</h2>

        <div className="review-flex-container">
          <div className="overall-rating">
            <div className="rating-box">
              <span className="star" style={{color:'#fff'}}>&#9733;</span>
              <span className="score">4.3</span>
            </div>
            <p className="overall-text">Overall Rating</p>
          </div>

          <div className="criteria-ratings">
            {criteria.map((label, idx) => {
              const key = Object.keys(ratings)[idx];
              return (
                <div key={key} className="rating-section">
                  <label>{label}</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${
                          ratings[key] >= star ? "filled" : ""
                        }`}
                        onClick={() => handleStarClick(key, star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <label className="desc-label">Review Desc</label>
        <textarea
          className="review-textarea"
          value={reviewDesc}
          onChange={(e) => setReviewDesc(e.target.value)}
          placeholder="Write your feedback..."
        />

        <button className="submit-review-btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
