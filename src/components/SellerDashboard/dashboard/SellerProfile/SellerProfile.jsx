import React from 'react'
import { FaSearch, FaUserFriends, FaFileAlt, FaStickyNote } from 'react-icons/fa';
import '../../../BuyerDashboard/Messages/Messages.css';
import Link from 'next/link';
const SellerProfile = () => {
  return (
  <div className="info-panel" style={{marginLeft:'0'}}>
{/*           <button className="close-btn">✖</button>
 */}          <img src="/assets/users/three.png" alt="Mercedes" className="user-avatar" />
          <h4>Mercedes Hodkiewicz</h4>
          <p className="role">🌐 International Data Analyst</p>
            <p className="time">5 Rating (36 reviews)</p>
     <p className="time">Level 2 Seller</p>
        
          <div className="action-buttons">
          <Link href="/profile" className="view-proposal-btn"> Preview profile</Link>
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

export default SellerProfile
