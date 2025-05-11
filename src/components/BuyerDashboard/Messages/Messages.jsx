'use client';
import React, { useEffect, useState } from 'react';
import './Messages.css';
import { FaSearch, FaSlidersH } from 'react-icons/fa';
import MessageChats from './MessageChats';
import MessageProfile from './MessageProfile';
import { useRouter } from 'next/navigation';

const Messages = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      <div className="sidebar">
        <h1 className="sidebar-title">Messages</h1>
        <div className="searchBarWrapper">
          <div className="search-bar">
            <FaSearch />
            <input type="text" placeholder="Search" />
          </div>
          <FaSlidersH size={23} className="filterIcon" />
        </div>

        <div className="usersInMessagesWrapper">
          <div className="contact active" onClick={handleContactClick}>
            <img
              src="/assets/users/one.png"
              alt="Amina"
              onClick={handleImageClick}
            />
            <div className="contact-info">
              <h4>Amina Okonkwo</h4>
              <p>Data Analyst – E-commerce Insights</p>
            </div>
            <span className="timestamp">12:02 AM</span>
          </div>

          <div className="contact" onClick={handleContactClick}>
            <img
              src="/assets/users/one.png"
              alt="Amina"
              onClick={handleImageClick}
            />
            <div className="contact-info">
              <h4>Amina Okonkwo</h4>
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
