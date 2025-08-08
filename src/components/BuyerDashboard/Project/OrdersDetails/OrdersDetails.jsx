import React from 'react';
import './OrdersDetails.css';
import CapitalizeFirstWord from '@/utils/CapitalizeFirstWord';

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
<h5 className='gig-title-order-details'><CapitalizeFirstWord>{gigId.gigTitle}</CapitalizeFirstWord></h5>
      <img
        src={gigId?.images?.[0]?.url || '/assets/gigs/dummy.png'}
        alt="gig image"
        className="order-image"
      />

      <div className="order-info">
        <div className="order-price">
          <span className="product-name"><CapitalizeFirstWord>{packageDetails?.packageName || 'N/A'}</CapitalizeFirstWord> package</span> ·{' '}
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

        {order.status != "cancelled" && <div className="due-time">
          <span className="due-icon">○</span>
          Due in {diffDays} days {diffHours} hours
        </div>}
      </div>
    </div>
  );
}
