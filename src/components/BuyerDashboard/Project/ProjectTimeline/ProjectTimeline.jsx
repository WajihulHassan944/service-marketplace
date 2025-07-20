'use client';
import React, { useState } from 'react';
import './ProjectTimeline.css';
import SubmitWorkPopup from '../SubmitWorkPopup/SubmitWorkPopup';
import { useSelector } from 'react-redux';
import { FiCheckCircle, FiStar } from "react-icons/fi";
import { baseUrl } from '@/const';
import toast from 'react-hot-toast';
export default function ProjectTimeline({ order, setShowReviewPopup,  fetchOrder }) {
  if (!order) return null;
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const buyerName = `${order.buyerId.firstName} ${order.buyerId.lastName}`;
  const sellerName = `${order.sellerId.firstName} ${order.sellerId.lastName}`;
const user = useSelector((state) => state.user);


const dueDate = new Date(order.deliveryDueDate);
  const now = new Date();
  const diffMs = dueDate - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  // Determine which steps are completed based on order status
  const steps = [
    {
      id: 1,
      title: 'Order placed',
      time: new Date(order.createdAt).toLocaleString(),
      completed: true,
    },
    {
      id: 2,
      title: `${buyerName} submitted the requirements`,
      completed: true,
    },
    {
      id: 3,
      title: `${sellerName} reviewed the requirements`,
      completed: true,
    },
    {
      id: 4,
      title: `${sellerName} delivers the order`,
      completed: order.status === 'delivered' || order.status === 'completed',
    },
    {
      id: 5,
      title: `${buyerName} reviews and approves the work`,
      completed: order.status === 'completed',
    },
    {
      id: 6,
      title: 'Project complete',
      completed: order.status === 'completed',
    },
  ];


   const handleApproveDelivery = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/orders/approve/${order._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccessPopup(true);
         fetchOrder();
      } else {
    toast.error(data.message || "Failed to approve delivery.");
      }
    } catch (error) {
      console.error("❌ Error approving delivery:", error);
      toast.error("Something went wrong while approving the delivery.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="timeline-container">
      <h2 className="timeline-title">Project Timeline</h2>
      <ol className="timeline-list">
        {steps.map((step, index) => {
          const current = !step.completed && steps[index - 1]?.completed;
          return (
            <li
              key={index}
              className={`timeline-item ${step.completed ? 'completed' : ''} ${current ? 'current' : ''}`}
            >
              <div className="timeline-icon">
                {step.completed ? '✓' : current ? '●' : ''}
              </div>
              <div className="timeline-content">
                <h3>{step.title}</h3>
                {step.time && <p className="timeline-time">{step.time}</p>}
              </div>
            </li>
          );
        })}
      </ol>

    {user.currentDashboard === "seller" && order.status !== 'completed' && order.status !== 'cancelled' && (
  <>
    <p className="timeline-due">
      Due in {diffDays} days {diffHours} hours
    </p>
    <button className="submit-btn" onClick={() => setShowPopup(true)}>
      {order.deliveries && order.deliveries.length > 0 ? "Submit Work Again" : "Submit Work"}
    </button>
  </>
)}
  {user.currentDashboard === "buyer" && order.status === "delivered" && (
        <div className="approve-delivery-box">
          <p className="timeline-due">
            Please review the delivery made by the seller by viewing the deliveries section.
          </p>

          <button
            className="submit-btn"
            onClick={handleApproveDelivery}
            disabled={loading}
            style={{ backgroundColor: "#007bff" }}
          >
            {loading ? "Processing..." : "Approve Final Delivery"}
          </button>

           </div>
      )}
{showSuccessPopup && (
  <div className="success-popup">
    <FiCheckCircle size={36} color="#007bff" />
    <h3 style={{ color: "#007bff" }}>Order Completed!</h3>
    <p>Your approval has been recorded. Thank you for confirming the delivery.</p>

   {(!order.buyerReview || !order.buyerReview.overallRating) && order.status === 'completed' && (
      <button
        className="review-btn"
        onClick={() => setShowReviewPopup(true)}
      >
        <FiStar size={18} style={{ marginRight: 6 }} />
        Give a Review
      </button>
    )}
  </div>
)}



      {showPopup && <SubmitWorkPopup onClose={() => setShowPopup(false)} orderId={order._id} />}
    </div>

  );
}
