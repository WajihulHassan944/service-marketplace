'use client';
import React, { useState } from "react";
import "./BuyerHome.css";
import { FiMoreHorizontal, FiCreditCard, FiUsers, FiFolder, FiChevronDown, FiChevronUp } from "react-icons/fi";

const BuyerHome = () => {
  const [openFAQ, setOpenFAQ] = useState(0); // 0: first one open by default

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    {
      title: "1. Post a job to the marketplace",
      content: (
        <>
          Provide enough detail for great talent to figure out if the work is right for them.
          (You can always edit your post, or send an invite to reach out to people directly.)
          <br />
          <a href="#">Check out examples of effective job posts</a>
        </>
      ),
    },
    {
      title: "2. Get proposals from talent",
      content: <>Talented freelancers will send proposals tailored to your needs and budget.</>,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Welcome</h2>
        <p className="user-name">Ramy Khuffash</p>
      </div>

      <div className="dashboard-main">
        <div className="left-column">
          <div className="card">
            <div className="card-header">
              <h3>Your Analytics</h3>
              <a href="#">See all orders</a>
            </div>
            <div className="posting-card">
              <div className="posting-title">
                <strong>NFT artist (2D, 3D, or pixel art)</strong>
                <FiMoreHorizontal className="icon-btn" />
              </div>
              <p className="posting-sub">Public - Hourly</p>
              <p className="posting-time">Ordered 2 minutes ago by You</p>
              <div className="posting-stats">
                <span>0<br />Notifications</span>
                <span>0<br />Messaged</span>
                <span>0<br />Hired</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>How to work with talent</h3>
            </div>
            <div className="faq-section">
              {faqData.map((item, index) => (
                <div key={index} className="faq-item">
                  <div className="faq-title" onClick={() => toggleFAQ(index)}>
                    <span>{item.title}</span>
                    {openFAQ === index ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                  {openFAQ === index && <div className="faq-content">{item.content}</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="card notifications-card">
  <div className="card-header notificationHeader">
    <h3>Notifications</h3>
  </div>
  <div className="notification-item sent">
    <div className="notif-title">
      <FiCreditCard className="notif-icon" /> <strong>Payment Sent</strong>
    </div>
    <p>You requested <a href="#">payment</a> of $124 from Upwork via Payoneer MaterCard</p>
    <span className="notif-time">5 mins ago</span>
  </div>

  <div className="notification-item ended">
    <div className="notif-title">
      <FiUsers className="notif-icon" /> <strong>Contract Ended</strong>
    </div>
    <p><a href="#">John Dnoe</a> ended your <a href="#">contract</a> “Dashboard Web Design”</p>
    <span className="notif-time">2 days ago</span>
  </div>

  <div className="notification-item received">
    <div className="notif-title">
      <FiCreditCard className="notif-icon" /> <strong>Payment Received</strong>
    </div>
    <p><a href="#">Elon Musk</a> sent you a <a href="#">payment</a> of $2 500 000 000 000 000 000 000</p>
    <span className="notif-time">5 days ago</span>
  </div>

  

  <a href="#" className="see-all">See All ↝</a>
</div>


        </div>

        <div className="right-column">
          <div className="card">
            <div className="card-header vertical">
              <h3>Getting started</h3>
              <div className="progress-bar">
                <div className="progress" style={{ width: "57%" }}></div>
              </div>
              <p className="progress-text">57% done – great work!</p>
            </div>
            <div className="task-button"><FiCreditCard /> Add billing method</div>
            <div className="task-button"><FiUsers /> Explore more talent</div>
            <div className="task-button"><FiFolder /> Explore services</div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Ready-to-buy services</h3>
            </div>
            <p className="project-text">
              Know what you need but not how to get it done? Buy a project priced and scoped for success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
