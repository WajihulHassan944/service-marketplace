'use client';
import React, { useState } from "react";
import "./BuyerHome.css";
import { FiMoreHorizontal, FiCreditCard, FiUsers, FiFolder, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import { useSelector } from "react-redux";
import DashboardNotification from "@/components/SellerDashboard/dashboard/DashboardNotifications";

const BuyerHome = () => {
      const user = useSelector((state) => state.user);
     const {
    ordersPlacedCount,
    totalSpent,
    ordersCompletedCount,
    chatsCount,
    notificationsCount
  } = user.buyerDetails?.analytics || {};


  const hasBillingMethod = user.wallet?.cards?.length > 0;
  const progress = hasBillingMethod ? 100 : 57;
  const progressText = hasBillingMethod ? '100% done – awesome!' : '57% done – great work!';



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
    <div className="dashboard-buyer">
      <div className="dashboard-buyer-header">
        <h2>Welcome</h2>
        <p className="user-name">{user.firstName} {user.lastName}</p>
      </div>

      <div className="dashboard-buyer-main">
        <div className="left-column-buyer">
          
          <div className="card-buyer">
      <div className="card-header-buyer">
        <h3>Your Analytics</h3>
        <Link href="/orders">See all orders</Link>
      </div>

      <div className="posting-card-buyer">
        <div className="posting-title-buyer">
          <strong>Active Orders ({ordersPlacedCount || 0})</strong>
          <FiMoreHorizontal className="icon-btn" />
        </div>

      {ordersPlacedCount === 0 ? "" :
      <>  <p className="posting-sub">Public - {totalSpent}</p> 
       <p className="posting-time">Orders by You</p> </> }

        <div className="posting-stats">
          <span>{notificationsCount || 0}<br />Notifications</span>
          <span>{chatsCount || 0}<br />Chats</span>
          <span>{ordersCompletedCount || 0}<br />Hired</span>
        </div>
      </div>
    </div>
          <div className="card-buyer">
            <div className="card-header-buyer">
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

<DashboardNotification />

        </div>

        <div className="right-column-buyer">
          
           <div className="card-buyer">
      <div className="card-header-buyer vertical">
        <h3>Getting started</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="progress-text">{progressText}</p>
      </div>

      <Link href="/settings/billing" className="task-button">
        <FiCreditCard /> {hasBillingMethod ? 'Billing method added' : 'Add billing method'}
      </Link>

      <Link href="/services" className="task-button">
        <FiUsers /> Explore more talent
      </Link>

      <Link href="/services" className="task-button">
        <FiFolder /> Explore services
      </Link>
    </div>
          <div className="card-buyer">
            <div className="card-header-buyer">
              <h3>Ready-to-buy services</h3>
            </div>
            <p className="project-text-buyer">
              Know what you need but not how to get it done? Buy a project priced and scoped for success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
