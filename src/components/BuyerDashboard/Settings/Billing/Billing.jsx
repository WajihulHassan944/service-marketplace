import React from 'react';
import './billing.css';
import Sidebar from '../Sidebar/Sidebar';

const Billing = () => {
  return (
    <div className="settings-container">
    <Sidebar />
      <main className="billing-content">
        <h2>Billing & payments</h2>

        <section className="balance-section">
          <div>
            <h3>Balance</h3>
            <p>Your balance is <strong>$0.00</strong></p>
          </div>
          <button className="pay-now" disabled>Pay Now</button>
        </section>

        <section className="manage-billing">
          <div className="manage-header">
            <h3>Manage billing methods</h3>
            <button className="add-btn">Add a New Billing Method</button>
          </div>
          <p className="desc">Add, update, or remove your billing methods</p>

          <div className="billing-card primary">
            <div>
              <span className="card-label">Primary</span>
              <p>Your primary billing method is used for all recurring payments</p>
              <div className="card-info">
                <img src="/assets/mastercard.png" alt="Mastercard" />
                <span>MasterCard ending in 1111</span>
              </div>
            </div>
            <div className="actions">
              <span className="edit">Edit</span>
              <span className="remove">Remove</span>
            </div>
          </div>

          <div className="billing-card">
            <div className="card-info">
              <img src="/assets/visa.png" alt="Visa" />
              <span>Visa ending in 1111</span>
            </div>
            <div className="actions">
              <span className="edit">Edit</span>
              <span className="set-primary">Set As Primary</span>
              <span className="remove">Remove</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Billing;
