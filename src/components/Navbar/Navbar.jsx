'use client';
import React, { useState } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { FiHeart, FiBell } from 'react-icons/fi';
import { FiMessageSquare } from "react-icons/fi";
import SearchBar from './Search/SearchBar';
import MessagePopup from './MessagePopup/MessagePopup';
import NotificationPopup from './NotificationPopup/NotificationPopup';
import SubNavbar from './SubNavbar/SubNavbar';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
 const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navSecOne">
          <Link href="/seller/dashboard">
            <div className="navbar-logo">
              <Image src="/assets/logo.png" alt="logo" width={50} height={50} style={{objectFit:'cover', width:'60px', height:'auto', borderRadius:'50%'}} />
            </div>
          </Link>
             <ul className="navbar-menu">
        <Link href="/seller/dashboard" className='navLink'><li className="navbar-item">Dashboard</li>
        </Link>
       <Link href="/buyer/orders" className='navLink'> <li className="navbar-item">Orders</li>
       </Link>
       <Link href="/seller/services" className='navLink'> <li className="navbar-item">Services</li>
       </Link>
       <Link href="/seller/earnings" className='navLink'> <li className="navbar-item">Earnings</li>
       </Link>
       
       <Link href="/buyer/settings/billing" className='navLink'> <li className="navbar-item">Billing</li>
       </Link>
       </ul>
        </div>

        <div className="navbar-right">
          <div className="burger" onClick={() => setMenuOpen(true)}>
            <FaBars size={22} />
          </div>
          <div className="navbar-actions">
          
        <div className="nav-message-container">
      <div className="nav-icon" onClick={() => setShowPopup(!showPopup)}>
        <FiMessageSquare />
      </div>
      {showPopup && <MessagePopup closePopup={() => setShowPopup(false)} />}
    </div>
         
             <div className="nav-message-container">
      <div
        className="nav-icon notification-icon"
        onClick={() => setShowNotificationPopup(!showNotificationPopup)}
      >
        <FiBell />
        <span className="red-dot" />
      </div>
      {showNotificationPopup && (
        <NotificationPopup closePopup={() => setShowNotificationPopup(false)} />
      )}
    </div>
            <div className="user-avatar-wrapper-nav" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src="/assets/myimg.jpg" alt="User" className="user-avatar-nav" />
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu-user">
                <div className="dropdown-header-user">
                  <img src="/assets/myimg.jpg" alt="User" className="dropdown-avatar-user" />
                  <div className="dropdown-name-user">Jane Doe</div>
                  <div className="dropdown-role-user">Client</div>
                </div>
                <div className="dropdown-status-user">
                  <button className="status-btn-user active">Online</button>
                  <button className="status-btn-user">Invisible</button>
                </div>
                <ul className="dropdown-links-user">
                  <Link href="/profile" onClick={() => setDropdownOpen(false)}><li><FaUser /> Profile</li></Link>
                  <Link href="/buyer/settings/myinfo" onClick={() => setDropdownOpen(false)}><li><FaCog /> Settings</li></Link>
                  <Link href="/" onClick={() => setDropdownOpen(false)}><li><FaSignOutAlt /> Log out</li></Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
      
{menuOpen && (
  <div className="mobile-menu">
    <div className="mobile-menu-header">
      <Link href="/" onClick={() => setMenuOpen(false)}>
        <div className="navbar-logo">
          <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
        </div>
      </Link>
      <FaTimes size={22} onClick={() => setMenuOpen(false)} className="close-icon" />
    </div>

    {/* User Info Section */}
    <div className="mobile-user-info">
      <img src="/assets/myimg.jpg" alt="User" className="mobile-user-avatar" />
      <div className="mobile-user-name">Jane Doe</div>
      <div className="mobile-user-role">Client</div>
    </div>

    <ul className="mobile-nav-links">
      <Link href="/buyer/dashboard" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Dashboard</li>
      </Link>
      <Link href="/buyer/orders" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Orders</li>
      </Link>
      <Link href="/services" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Services</li>
      </Link>
      <Link href="/messages" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Messages</li>
      </Link>
      <Link href="/buyer/settings/billing" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Billing</li>
      </Link>
      <Link href="/buyer/liked-services" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Liked Services</li>
      </Link>
      <Link href="/buyer/notifications" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Notifications</li>
      </Link>
      <Link href="/profile" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Profile</li>
      </Link>
      <Link href="/buyer/settings/billing" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Settings</li>
      </Link>
      <Link href="/" className="mobile-navLink" onClick={() => setMenuOpen(false)}>
        <li className="mobile-nav-item">Log out</li>
      </Link>
    </ul>
  </div>
)}

    </>
  );
};

export default Navbar;
