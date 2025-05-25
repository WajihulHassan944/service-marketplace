import React from "react";
import Image from "next/image";
import {  FiMessageCircle, FiSend, FiPaperclip, FiSearch } from "react-icons/fi";
import "./MessagesMainAdmin.css";

const MessagesMainAdmin = () => {
  return (
    <div className="chat-wrapper">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <Image src="/assets/myimg.jpg" alt="user" width={40} height={40} className="radiusedImg" />
          <div className="sidebar-header-info">
            <h4>Mathew Anderson</h4>
            <p>Designer</p>
          </div>
        </div>

        <div className="chat-search">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search Contact" />
        </div>

        <div className="recent-chats">
          <p className="recent-title">Recent Chats</p>
          <ul>
            <li className="activeMessage">
              <Image src="/assets/gigs/avatar.png" alt="user" width={35} height={35} className="radiusedImg" />
              <div className="chat-info">
                <h5>Mitchell Flintoff</h5>
                <p>You: Yesterday was great...</p>
              </div>
              <span className="chat-time">15</span>
            </li>
            <li>
              <Image src="/assets/users/one.png" alt="user" width={35} height={35} className="radiusedImg" />
              <div className="chat-info">
                <h5>Bianca Anderson</h5>
                <p>Nice looking dress you...</p>
              </div>
              <span className="chat-time">30</span>
            </li>
            <li>
              <Image src="/assets/users/two.png" alt="user" width={35} height={35} className="radiusedImg" />
              <div className="chat-info">
                <h5>Andrew Johnson</h5>
                <p>Sent a photo</p>
              </div>
              <span className="chat-time">2 hours</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Chat */}
      <div className="chat-main">
        <div className="chat-top-bar">
          <div className="chat-top-user">
            <Image src="/assets/gigs/avatar.png" alt="user" width={40} height={40} className="radiusedImg" />
            <div>
              <h4>Andrew Johnson</h4>
              <p>Away</p>
            </div>
          </div>
          <div className="chat-actions">
            <FiMessageCircle className="icon" />
          </div>
        </div>

        <div className="chat-messages">
          {/* Left Message */}
          <div className="message-block left">
            <div className="message-meta">
              <Image src="/assets/gigs/avatar.png" alt="user" width={24} height={24} className="radiusedImg" />
              <span className="meta-text">Andrew, 2 hours ago</span>
            </div>
            <div className="message left">
              <p>If I don’t like something, I’ll stay away from it.</p>
            </div>
          </div>

          {/* Right Message */}
          <div className="message-block right">
            <div className="message-meta right-meta">
              <span className="meta-text">2 hours ago</span>
            </div>
            <div className="message right">
              <p>If I don’t like something, I’ll stay away from it.</p>
            </div>
          </div>

          {/* Left Message */}
          <div className="message-block left">
            <div className="message-meta">
              <Image src="/assets/gigs/avatar.png" alt="user" width={24} height={24} className="radiusedImg" />
              <span className="meta-text">Andrew, 2 hours ago</span>
            </div>
            <div className="message left">
              <p>I want more detailed information.</p>
            </div>
          </div>

          {/* Right Message */}
          <div className="message-block right">
            <div className="message-meta right-meta">
              <span className="meta-text">2 hours ago</span>
            </div>
            <div className="message right">
              <p>If I don’t like something, I’ll stay away from it.</p>
              <p>They got there early, and they got really good seats.</p>
            </div>
          </div>
        </div>

        <div className="chat-input-bar">
          <input type="text" placeholder="Type a Message" />
          <div className="chat-input-icons">
            <FiPaperclip className="icon" />
            <FiSend className="icon send-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesMainAdmin;
