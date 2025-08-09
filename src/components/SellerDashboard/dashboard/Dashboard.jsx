'use client';
import React, { useState } from "react";
import "../../BuyerDashboard/Home/BuyerHome.css";
import "./Dashboard.css";
import { FiMoreHorizontal, FiCreditCard, FiUsers, FiFolder, FiChevronDown, FiChevronUp } from "react-icons/fi";
import Link from "next/link";
import SellerProfile from "./SellerProfile/SellerProfile";
import { useSelector } from "react-redux";
import DashboardNotification from "./DashboardNotifications";

const Dashboard = () => {
  const [openFAQ, setOpenFAQ] = useState(null); // 0: first one open by default
  const user = useSelector((state) => state.user);
 const {
    activeOrdersCount,
    totalOrderValue,
    ordersCompletedCount,
    chatsCount,
    notificationsCount
  } = user.sellerDetails.analytics || {};
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };


 const faqData = [
  {
    title: "1. Create and publish your gig",
    content: (
      <>
        Start by setting up a clear and compelling gig that highlights your skills, services, and pricing.
        Make sure to include relevant examples and detailed descriptions so buyers know what to expect.
        <br />
        <a href="#">See examples of top-performing gigs</a>
      </>
    ),
  },
  {
    title: "2. Receive job invitations or get discovered",
    content: (
      <>
        Once your gig is live, buyers can find and invite you to apply for their jobs. You’ll also get
        notified when new opportunities match your skills.
      </>
    ),
  },
  {
    title: "3. Send tailored proposals",
    content: (
      <>
        When applying to posted jobs, write personalized proposals that show you understand the client’s
        needs and how you can deliver value. Stand out with relevant experience and a clear action plan.
      </>
    ),
  },
  {
    title: "4. Start working and deliver high-quality results",
    content: (
      <>
        Once hired, communicate regularly and deliver your work on time. Happy clients are more likely
        to leave great reviews and hire you again.
      </>
    ),
  },
];

  return (
    <div className="dashboard-buyer seller-dashboard-container">
      
      <div className="dashboard-buyer-main">
       <div className="right-column-buyer">
         <SellerProfile />
        </div>
        <div className="left-column-buyer">
     <div className="dashboard-seller-header">
          <div>
            <h2>{user.firstName} {user.lastName} <span className="tag">{user.sellerDetails.level}</span></h2>
            <p className="subtext">
              {user.userName}
            </p>
          </div>
        </div>

         <div className="card-buyer">
      <div className="card-header-buyer">
        <h3>Your Analytics</h3>
        <Link href="/orders">See all orders</Link>
      </div>

      <div className="posting-card-buyer">
        <div className="posting-title-buyer">
          <strong>Active Orders ({activeOrdersCount || 0})</strong>
          <FiMoreHorizontal className="icon-btn" />
        </div>

       {activeOrdersCount === 0 ? "" :  <p className="posting-sub">Public - {totalOrderValue || '$0'}</p>}

        <div className="posting-stats">
          <span>{notificationsCount || 0}<br />Notifications</span>
          <span>{chatsCount || 0}<br />Chats</span>
          <span>{ordersCompletedCount || 0}<br />Orders Completed</span>
        </div>
      </div>
    </div>
          <div className="card-buyer" style={{marginBottom:'45px'}}>
            <div className="card-header-buyer">
              <h3>How to work with Clients</h3>
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

       
      </div>
    </div>
  );
};

export default Dashboard;
