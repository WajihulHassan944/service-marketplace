'use client';
import React, { useEffect, useState } from 'react';
import './Messages.css';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import MessageChats from './MessageChats';
import MessageProfile from './MessageProfile';
import { useRouter } from 'next/navigation';

const Messages = () => {
  
  const [isMobile, setIsMobile] = useState(null);

  const router = useRouter();


useEffect(() => {
  const checkMobile = () => setIsMobile(window.innerWidth <= 768);
  checkMobile();
  window.addEventListener("resize", checkMobile);
  return () => window.removeEventListener("resize", checkMobile);
}, []);

if (isMobile === null) {
  // Optionally render a loading state or nothing
  return null;
}
  const handleImageClick = (e) => {
    if (isMobile) {
      e.stopPropagation(); // prevent container click from firing
      router.push('/messages/profile');
    }
  };

  const handleContactClick = () => {
    if (isMobile) {
      router.push('/messages/chat');
    }
  };

  return (
    <div className="messages-container">
      {/* Sidebar */}
      <div className="sidebar-messages">
        <h1 className="sidebar-title-messages">Messages</h1>
        <div className="searchBarWrapper-messages">
          <div className="search-bar-messages">
            <FaSearch />
            <input type="text" placeholder="Search" />
          </div>
          <FaSlidersH size={23} className="filterIcon" />
        </div>

        <div className="usersInMessagesWrapper">
          <div className="contact-messages active-messages" onClick={handleContactClick}>
            <img
              src="/assets/users/one.png"
              alt="Amina"
              onClick={handleImageClick}
            />
            <div className="contact-info-messages">
              <h4>Amina Okonkwo</h4>
              <p>Data Analyst – E-commerce Insights</p>
            </div>
            <span className="timestamp">12:02 AM</span>
          </div>

          <div className="contact-messages" onClick={handleContactClick}>
            <img
              src="/assets/users/one.png"
              alt="Amina"
              onClick={handleImageClick}
            />
            <div className="contact-info-messages">
              <h4>Amina Okonkwos</h4>
              <p>Data Analyst – E-commerce Insights</p>
            </div>
            <span className="timestamp">12:02 AM</span>
          </div>
        </div>
      </div>

      {/* Render these only if not on mobile */}
      {!isMobile && <MessageChats />}
      {!isMobile && <MessageProfile />}
    </div>
  );
};

export default Messages;
