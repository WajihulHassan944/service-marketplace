import React from 'react';
import './OrdersDetails.css';

export default function OrderDetails() {
  return (
    <div className="order-card">
      <h3 className="order-title">Order Details</h3>
      <img
        src="/assets/gigs/dummy.png"
        alt="Order"
        className="order-image"
      />
      <div className="order-info">
        <div className="order-price">
          <span className="product-name">Starter</span> · <span className="price">$80.00</span>
        </div>
        <div className="escrow">
          <span>(in escrow)</span>
          <span className="help-icon">❓</span>
        </div>
        <div className="status-chip">Waiting For Jodie</div>
        <div className="due-time">
          <span className="due-icon">○</span>
          Due in 9 days 23 hours
        </div>
      </div>
    </div>
  );
}
