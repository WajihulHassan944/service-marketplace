import React, { useState, useMemo } from "react";
import "./ReviewPopup.css";
import { useSelector } from "react-redux";
import { baseUrl } from "@/const";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const ReviewPopup = ({ onClose, orderId,  fetchOrder }) => {
  const user = useSelector((state) => state.user);
  const isBuyer = user?.currentDashboard === "buyer";

  const [ratings, setRatings] = useState(
    isBuyer
      ? { recommend: 0, communication: 0, service: 0 }
      : { overall: 0 }
  );
  const [reviewDesc, setReviewDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStarClick = (key, value) => {
    setRatings((prev) => ({ ...prev, [key]: value }));
  };

  const overallScore = useMemo(() => {
    if (isBuyer) {
      const total =
        ratings.communication +
        ratings.service +
        ratings.recommend;
      const count = 3;
      return count ? (total / count).toFixed(1) : "0.0";
    } else {
      return ratings.overall.toFixed(1);
    }
  }, [ratings, isBuyer]);

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const url = `${baseUrl}/orders/${isBuyer ? "buyer-review" : "seller-review"}/${orderId}`;
      const payload = isBuyer
        ? {
            overallRating: parseFloat(overallScore),
            communicationLevel: ratings.communication,
            serviceAsDescribed: ratings.service,
            recommendToFriend: ratings.recommend,
            review: reviewDesc,
          }
        : {
            rating: ratings.overall,
            review: reviewDesc,
          };

      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
          fetchOrder();
          toast.success("Your review has been submitted successfully!");
        setTimeout(onClose, 2000);
      } else {
      toast.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("❌ Review submission failed:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-popup-overlay" onClick={onClose}>
      <div className="review-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn-review-popup" onClick={onClose}>
          <X size={18} />
        </button>
        <h2 className="popup-title">doTask Reviews</h2>

        <div className="review-flex-container">
          <div className="overall-rating">
            <div className="rating-box">
              <span className="star" style={{ color: "#fff" }}>&#9733;</span>
              <span className="score">{overallScore}</span>
            </div>
            <p className="overall-text">Overall Rating</p>
          </div>

          <div className="criteria-ratings">
            {isBuyer ? (
              <>
                <div className="rating-section">
                  <label>Recommend to a friend</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${ratings.recommend >= star ? "filled" : ""}`}
                        onClick={() => handleStarClick("recommend", star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rating-section">
                  <label>Communication level</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${ratings.communication >= star ? "filled" : ""}`}
                        onClick={() => handleStarClick("communication", star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rating-section">
                  <label>Service as described</label>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${ratings.service >= star ? "filled" : ""}`}
                        onClick={() => handleStarClick("service", star)}
                      >
                        &#9733;
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="rating-section">
                <label>Overall Experience</label>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${ratings.overall >= star ? "filled" : ""}`}
                      onClick={() => handleStarClick("overall", star)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <label className="desc-label">Review Desc</label>
        <textarea
          className="review-textarea"
          value={reviewDesc}
          onChange={(e) => setReviewDesc(e.target.value)}
          placeholder="Write your feedback..."
        />

        {submitted ? (
          <p className="submitted-message">Thank you for your review!</p>
        ) : (
          <button
            className="submit-review-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewPopup;
