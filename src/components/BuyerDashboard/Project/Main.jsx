'use client';
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProjectTimeline from "./ProjectTimeline/ProjectTimeline";
import OrderDetails from "./OrdersDetails/OrdersDetails";
import RecentFiles from "./RecentFiles/RecentFiles";
import SubmittedRequirements from "./SubmittedRequirements/SubmittedRequirements";
import "./Main.css";

import { FaSpinner } from 'react-icons/fa';
import "../../GigDetails/LoadingSpinner.css";
import { baseUrl } from "@/const";
import OrderActions from "./OrderActions/OrderActions";
import OrderDeliveries from "./OrderDeliveries/OrderDeliveries";
import ReviewPopup from "./ReviewPopup/ReviewPopup";
import RevisionRequest from "./RevisionRequest/RevisionRequest";
export default function Main() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
const [showReviewPopup, setShowReviewPopup] = useState(false);
  const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseUrl}/orders/order-by-id/${orderId}`);
        const data = await res.json();
        if (data.success) {
          setOrder(data.order);
        }
      } catch (err) {
        console.error("❌ Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
  
    if (orderId) fetchOrder();
  }, [orderId]);
if (loading) return (
  <div className="loading-container">
    <FaSpinner className="spinner" size={40} />
    <p className="loading-text">Loading order details...</p>
  </div>
);
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="main-container">
      <div className="top-grid">
        <div className="left-column">
       <ProjectTimeline order={order} setShowReviewPopup={setShowReviewPopup} fetchOrder={fetchOrder} />
     {order.revisionRequests && (  <RevisionRequest revisionRequests={order.revisionRequests} /> )}
<OrderDeliveries order={order} />
          <RecentFiles order={order} />
          </div>

        <div className="right-column">
          <OrderDetails order={order} />
          <SubmittedRequirements order={order} fetchOrder={fetchOrder} />
          <OrderActions order={order} setShowReviewPopup={setShowReviewPopup} fetchOrder={fetchOrder} />
          
        </div>
      </div>
  {showReviewPopup && <ReviewPopup onClose={() => setShowReviewPopup(false)} fetchOrder={fetchOrder} orderId={order._id} />}
    
    </div>
  );
}
