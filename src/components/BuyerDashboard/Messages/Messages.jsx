import React from 'react';
import './Messages.css';
import { FaSearch, FaSlidersH, FaPaperclip, FaRegSmile, FaSun, FaBold, FaPaperPlane, FaVideo, FaCamera, FaExpand, FaUserFriends, FaFileAlt, FaStickyNote } from 'react-icons/fa';

const Messages = () => {
  return (
    <div className="messages-container">
      
      {/* Sidebar */}
      <div className="sidebar">
       <h1 className='sidebar-title'>Messages</h1>
        <div className='searchBarWrapper'>
        <div className="search-bar">
          <FaSearch />
          <input type="text" placeholder="Search" />
        </div>
        <FaSlidersH size={23} className='filterIcon' />
        </div>
        <div className='usersInMessagesWrapper'>

        <div className="contact active">
          <img src="/assets/users/one.png" alt="Amina" />
          <div className="contact-info">
            <h4>Amina Okonkwo</h4>
            <p>Data Analyst – E-commerce Insights</p>
          </div>
          <span className="timestamp">12:02 AM</span>
        </div>

        <div className="contact">
          <img src="/assets/users/one.png" alt="Amina" />
          <div className="contact-info">
            <h4>Amina Okonkwo</h4>
            <p>Data Analyst – E-commerce Insights</p>
          </div>
          <span className="timestamp">12:02 AM</span>
        </div>
      </div>
</div>
      {/* Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <div className="chat-title">
            <h3>Amina Okonkwo</h3>
            <span>Data Analyst – E-commerce Insights</span>
          </div>
          <div className="chat-actions">
            <FaVideo className='video-icon' />
          </div>
        </div>

        <div className="chat-messages">
          <div className="message incoming">
            <img src="/assets/users/one.png" alt="Amina" />
            <div>
              <div><span className="sender">Amina Okonkwo</span> <span className="time">11:52 AM</span></div>
              <p>Absolutely! I anticipate I will primarily work with customer transaction data...</p>
            </div>
          </div>
          <div className="message outgoing">
            <img src="/assets/users/two.png" alt="Jayson" />
            <div>
              <div><span className="sender">Jayson Kuhick</span> <span className="time">11:52 AM</span></div>
              <p>That covers the main bases. We also have periodic market research data...</p>
            </div>
          </div>
        </div>

        <div className="chat-input">
          <input type="text" placeholder="Send a message..." />
          <div className="input-actions">
            <FaBold />
            <FaPaperclip />
            <FaSun />
            <FaRegSmile />
            <button className="send-btn"><FaPaperPlane /></button>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="info-panel">
        <button className="close-btn">✖</button>
        <img src="/assets/users/three.png" alt="Mercedes" className="user-avatar" />
        <h4>Mercedes Hodkiewicz</h4>
        <p className="role">🌐 International Data Analyst</p>
        <p className="time">🕒 6:41 PM CDT (4h ahead)</p>

        <div className="action-buttons">
          <button className="view-proposal-btn">View profile</button>
        </div>

        <div className="info-section">
          <div className="info-item"><FaSearch /> Search messages</div>
          <div className="info-item"><FaUserFriends /> People</div>
          <div className="info-item"><FaFileAlt /> Files and links</div>
          <div className="info-item"><FaStickyNote /> Personal notepad</div>
        </div>
      </div>

    </div>
  );
};

export default Messages;
