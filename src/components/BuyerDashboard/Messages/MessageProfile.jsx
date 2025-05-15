import React from 'react'
import { FaSearch, FaUserFriends, FaFileAlt, FaStickyNote } from 'react-icons/fa';
import './Messages.css';
import Link from 'next/link';
const MessageProfile = () => {
  return (
  <div className="info-panel">
{/*           <button className="close-btn">✖</button>
 */}          <img src="/assets/users/three.png" alt="Mercedes" className="user-avatar" />
          <h4>Mercedes Hodkiewicz</h4>
          <p className="role">🌐 International Data Analyst</p>
          <p className="time">🕒 6:41 PM CDT (4h ahead)</p>
  
          <div className="action-buttons">
            <Link href="/buyer/profile" className="view-proposal-btn"> View profile</Link>
          </div>
  
          <div className="info-section">
            <div className="info-item"><FaSearch /> Search messages</div>
            <div className="info-item"><FaUserFriends /> People</div>
            <div className="info-item"><FaFileAlt /> Files and links</div>
            <div className="info-item"><FaStickyNote /> Personal notepad</div>
          </div>
        </div>
  )
}

export default MessageProfile
