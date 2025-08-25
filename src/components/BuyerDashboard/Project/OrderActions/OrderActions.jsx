'use client';
import React, { useState } from "react";
import "./OrderActions.css";
import Link from "next/link";
import { baseUrl } from "@/const";
import {
  FiStar,
  FiHeadphones,
  FiUserPlus,
  FiChevronDown
  , FiTool
} from "react-icons/fi";
import InviteModal from "../InviteModal/InviteModal";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

export default function OrderActions({ order, setShowReviewPopup, fetchOrder }) {
  const [showResolutionForm, setShowResolutionForm] = useState(false);
  const [coworkerPopup, setCoworkerPopup] = useState(false);
const [showCoworkers, setShowCoworkers] = useState(false);
  const [showReviewDetails, setShowReviewDetails] = useState(false);
  const user = useSelector((state) => state.user);
const [resolutionReason, setResolutionReason] = useState("");
const [resolutionMessage, setResolutionMessage] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);
  if (!order || !user) return null;

  const isBuyer = user?.currentDashboard === "buyer";
  const review = isBuyer ? order.buyerReview : order.sellerReview;
  const reviewSubmitted = !!review?.review;

  const toggleReview = () => setShowReviewDetails((prev) => !prev);

  const renderStars = (count = 0) => {
    return [...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`star-icon ${index < count ? "filled" : ""}`}
      >
        &#9733;
      </span>
    ));
  };

  const renderReviewDetails = () => {
    if (!review) return null;

    const ratingValue = review.overallRating || review.rating;

    return (
      <div className="submitted-review-box">
        {ratingValue && (
          <div className="overall-badge">
            <span className="star">&#9733;</span>
            <span>{ratingValue.toFixed(1)}</span>
          </div>
        )}

        {review.recommendToFriend !== undefined && (
          <p className="review-category">
            Recommend to a friend {renderStars(review.recommendToFriend)}
          </p>
        )}
        {review.communicationLevel !== undefined && (
          <p className="review-category">
            Communication level {renderStars(review.communicationLevel)}
          </p>
        )}
        {review.serviceAsDescribed !== undefined && (
          <p className="review-category">
            Service as described {renderStars(review.serviceAsDescribed)}
          </p>
        )}

        <div className="submitted-review-label">Your Review:</div>
        <p className="submitted-review-text">{review.review}</p>
      </div>
    );
  };

const handleResolutionSubmit = async () => {
  if (!resolutionReason || !resolutionMessage) {
    return toast.error("Please select a reason and enter a message.");
  }

  setIsSubmitting(true);

  try {
    const res = await fetch(`${baseUrl}/orders/resolution/${order._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason: resolutionReason,
        message: resolutionMessage,
        requestedBy: user._id,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Resolution request submitted successfully.");
       fetchOrder();
      setShowResolutionForm(false);
      setResolutionReason("");
      setResolutionMessage("");
    } else {
      toast.error(data.message || "Failed to submit resolution request.");
    }
  } catch (err) {
    console.error("Error submitting resolution request:", err);
    toast.error("An error occurred. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};
const handleResolutionAction = async (action) => {
  try {
    const res = await fetch(
      `${baseUrl}/orders/resolution-response/${order._id}?action=${action}&userId=${user._id}`
    );

    const data = await res.json();

    if (res.ok && data.success) {
      toast.success(`Resolution ${action}ed successfully.`);
      fetchOrder();
      // Optional: refresh state or page
    } else {
      toast.error(`Failed to ${action}: ${data.message || "Unknown error"}`);
    }
  } catch (err) {
    toast.error(`❌ Network error while trying to ${action} resolution.`);
  }
};


  return (
    <div className="recent-files-container" >
      <div className="recent-files-header orderactionheader">Order Actions</div>

      <div className="order-actions-links">
        {!isBuyer && order.status != "disputed" && (
          <button className="action-of-order" onClick={() => setCoworkerPopup(true)}>
            <FiUserPlus size={20} /> Invite a coworker
          </button>
        )}

{order?.coworkers?.length > 0 && (
  <div className="coworker-toggle-wrapper">
    <button
      className="action-of-order coworker-dropdown-btn"
      onClick={() => setShowCoworkers((prev) => !prev)}
    >
      <FiUserPlus size={18} style={{ marginRight: "1px" }} />
      View Added Coworkers
      <FiChevronDown
        size={18}
        className={`review-dropdown-icon ${showCoworkers ? "open" : ""}`}
        
      />
    </button>

    {showCoworkers && (
      <div className="coworker-list">
        {order.coworkers.map((c) => (
          <div key={c._id} className="coworker-card">
  <img
    src={c.sellerId?.profileUrl}
    alt="coworker"
    className="coworker-image"
  />
  <div className="coworker-details">
    <div className="coworker-name-row">
      <span className="coworker-name">
        {c.sellerId?.firstName} {c.sellerId?.lastName}
      </span>
     
    </div>
    <p className="coworker-comp">
      {c.priceType === "hourly"
        ? `$${c.rate}/hr · ${c.maxHours} hr(s)`
        : `$${c.rate} (fixed)`}
    </p>
  </div>
  <span className={`status-badge ${c.status}`}>
        {c.status}
      </span>
  <Link
    href={`/messages?receiverId=${c.sellerId?._id}`}
    className="message-button"
  >
    Message
  </Link>
</div>

        ))}
      </div>
    )}
  </div>
)}




        <Link
          href={`/messages?receiverId=6836a8ab3503274446274b32`}
          className="action-of-order"
        >
          <FiHeadphones size={20} /> Contact admin
        </Link>
{["pending", "in progress", "delivered", "disputed"].includes(order.status) && (
  <>
    <button
      className="action-of-order"
      onClick={() => setShowResolutionForm((prev) => !prev)}
    >
      <FiTool size={20} />
      Resolution Center
    </button>

    {showResolutionForm && (
      <>
        {/* If dispute is open and current user is NOT the one who raised it, show response options */}
        {order.status === "disputed" && order.resolutionRequest?.status === "open" ? (
          user._id === order.resolutionRequest.requestedBy ? (
            // User who raised the request - see their own details
            <div className="resolution-seller-box">
              <div className="resolution-header">Your Submitted Resolution</div>
              <p className="resolution-item">
                <strong>Reason:</strong> {order.resolutionRequest.reason}
              </p>
              <p className="resolution-item">
                <strong>Message:</strong> {order.resolutionRequest.message}
              </p>
            </div>
          ) : (
            // Opposing party - see details + action options
            <div className="resolution-other-box">
              <div className="resolution-header">Resolution Request</div>
              <p className="resolution-item">
                <strong>Reason:</strong> {order.resolutionRequest.reason}
              </p>
              {/* <p className="resolution-item">
                <strong>Message:</strong> {order.resolutionRequest.message}
              </p> */}

              <div className="resolution-actions">
              <button
  className="resolution-accept-btn"
  onClick={() => handleResolutionAction("accept")}
>
  Accept
</button>

<button
  className="resolution-reject-btn"
  onClick={() => handleResolutionAction("reject")}
>
  Reject
</button>

                <Link
                  href={`/messages?receiverId=${
                    user.currentDashboard === "seller" ? order.buyerId._id : order.sellerId._id
                  }`}
                  className="resolution-msg-btn"
                >
                  Message {user.currentDashboard === "seller" ? "Buyer" : "Seller"}
                </Link>
              </div>
            </div>
          )
        ) : (
          // Resolution form (both buyer/seller can submit a request if not disputed yet)
          <div className="resolution-center-box">
            <div className="custom-select-wrapper">
              <label htmlFor="reason-select" className="resolution-label">
                Select Reason
              </label>
              <div className="custom-select">
                <select
                  id="reason-select"
                  className="custom-select-element"
                  value={resolutionReason}
                  onChange={(e) => setResolutionReason(e.target.value)}
                >
                  <option value="">Select Reason</option>
                  {user.currentDashboard === "buyer" ? (
                    <>
                      <option value="delayed">Order is delayed</option>
                      <option value="not-responding">Seller not responding</option>
                      <option value="poor-quality">Unsatisfactory delivery</option>
                    </>
                  ) : (
                    <>
                      <option value="delayed">Order is delayed</option>
                      <option value="not-responding">Buyer not responding</option>
                      <option value="poor-quality">Unclear requirements</option>
                    </>
                  )}
                  <option value="other">Other</option>
                </select>
                <FiChevronDown className="select-dropdown-icon" />
              </div>
            </div>

            <label htmlFor="message" className="resolution-label">
              Short Message
            </label>
            <textarea
              id="message"
              className="resolution-message"
              placeholder="Write a brief explanation..."
              value={resolutionMessage}
              onChange={(e) => setResolutionMessage(e.target.value)}
            />

            <button
              className="resolution-submit-btn"
              onClick={handleResolutionSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        )}
      </>
    )}
  </>
)}


        <div className="review-action-wrapper">
         {(order.status === "completed" ) && (
          <button
            className="action-of-order"
            onClick={() => !reviewSubmitted && setShowReviewPopup(true)}
            disabled={reviewSubmitted}
          >
            <FiStar size={20} />
            {reviewSubmitted ? "Feedback Submitted" : "Submit Feedback"}
          </button>
) }
          {reviewSubmitted && (
            <FiChevronDown
              size={18}
              className={`review-dropdown-icon ${showReviewDetails ? "open" : ""}`}
              onClick={toggleReview}
            />
          )}
        </div>

        {showReviewDetails && review && renderReviewDetails()}
      </div>

      {coworkerPopup && <InviteModal onClose={() => setCoworkerPopup(false)} order={order} />}
    </div>
  );
}
