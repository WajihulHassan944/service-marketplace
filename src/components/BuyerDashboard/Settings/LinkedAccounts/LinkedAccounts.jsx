import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './linkedaccounts.css';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';

const LinkedAccounts = () => {
  return (
    <div className="linked-container">
      <Sidebar />
      <div className="linked-content">
        
        <h2 className="title">Linked Accounts</h2>
        <p className="description">
          Taking the time to verify and link your accounts can upgrade your credibility and help us provide you with more business. Don't worry, your information is and always will remain private.
        </p>
        

        <div className="social-section">
          <h4 className="section-title">Your Social Presence <span className="private-label">(Private)</span></h4>

          <div className="account-row">
            <div className="account-info">
              <FaGoogle className="icon google" />
              <span className="account-name">Google</span>
              <span className="verified">✓ Verified</span>
            </div>
            <button className="connected-btn">Connected</button>
          </div>

          <div className="account-row">
            <div className="account-info">
              <FaFacebookF className="icon facebook" />
              <span className="account-name">Facebook</span>
            </div>
            <button className="connect-btn">Connect</button>
          </div>

          <div className="account-row">
            <div className="account-info">
              <FaTwitter className="icon twitter" />
              <span className="account-name">Twitter</span>
            </div>
            <button className="connect-btn">Connect</button>
          </div>
        </div>

        <button className="continue-button">Continue</button>
      </div>
    </div>
  );
};

export default LinkedAccounts;
