import React from 'react';
import './OrdersDetails.css';

export default function OrderDetails({ order }) {
  if (!order) return null;

  const { gigId, packageDetails, totalAmount, status, deliveryDueDate, isPaid } = order;

  const dueDate = new Date(deliveryDueDate);
  const now = new Date();
  const diffMs = dueDate - now;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);

  const statusLabelMap = {
    pending: 'Work In Progress',
    delivered: 'Delivery Submitted',
    completed: 'Order Completed',
    cancelled: 'Order Cancelled',
    disputed: 'In Dispute',
  };

  return (
    <div className="order-card">
      <h3 className="order-title">Order Details</h3>

      <img
        src={gigId?.images?.[0]?.url || '/assets/gigs/dummy.png'}
        alt="gig image"
        className="order-image"
      />

      <div className="order-info">
        <div className="order-price">
          <span className="product-name">{packageDetails?.packageName || 'N/A'} package</span> ·{' '}
          <span className="price">${totalAmount?.toFixed(2)}</span>
        </div>

        <div className="escrow">
          {isPaid && (
<span>Payment Completed</span>
          )}
          {!isPaid && (
<span>Payment Pending</span>
          )}
          {/* <span className="help-icon">❓</span> */}
        </div>

        <div className="status-chip">
          {statusLabelMap[status] || 'In Progress'}
        </div>

        <div className="due-time">
          <span className="due-icon">○</span>
          Due in {diffDays} days {diffHours} hours
        </div>
      </div>
    </div>
  );
}
