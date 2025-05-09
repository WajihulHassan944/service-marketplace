'use client';
import React from "react";
import "./notifications.css";
import { FiCreditCard, FiUsers } from "react-icons/fi";

const Notifications = () => {
  return (
    <div className="notifications-wrapper-buyer">
      <div className="card notifications-card-buyer">
        <div className="card-header notificationHeader">
          <h3>Notifications</h3>
        </div>

        <div className="notification-item sent">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
          </div>
          <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MasterCard</p>
          <span className="notif-time">5 mins ago</span>
        </div>

        <div className="notification-item ended">
          <div className="notif-title">
            <FiUsers className="notif-icon" /> <strong>Contract Ended</strong>
          </div>
          <p><a href="#">John Dnoe</a> ended your <a href="#">contract</a> “Dashboard Web Design”</p>
          <span className="notif-time">2 days ago</span>
        </div>

        <div className="notification-item sent">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
          </div>
          <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MasterCard</p>
          <span className="notif-time">5 mins ago</span>
        </div>

        <div className="notification-item sent">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
          </div>
          <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MasterCard</p>
          <span className="notif-time">5 mins ago</span>
        </div>
        <div className="notification-item sent">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
          </div>
          <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MasterCard</p>
          <span className="notif-time">5 mins ago</span>
        </div>
        <div className="notification-item sent">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
          </div>
          <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MasterCard</p>
          <span className="notif-time">5 mins ago</span>
        </div>
        
        <div className="notification-item sent">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
          </div>
          <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MasterCard</p>
          <span className="notif-time">5 mins ago</span>
        </div>
        <div className="notification-item received">
          <div className="notif-title">
            <FiCreditCard className="notif-icon" /> <strong>Payment Received</strong>
          </div>
          <p><a href="#">Elon Musk</a> sent you a <a href="#">payment</a> of $2 500 000 000 000 000 000 000</p>
          <span className="notif-time">5 days ago</span>
        </div>

       
      </div>
    </div>
  );
};

export default Notifications;
