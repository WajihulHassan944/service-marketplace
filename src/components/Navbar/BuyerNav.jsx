'use client';
import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { FiHeart, FiBell, FiMessageSquare } from 'react-icons/fi';
import SearchBar from './Search/SearchBar';
import MessagePopup from './MessagePopup/MessagePopup';
import NotificationPopup from './NotificationPopup/NotificationPopup';
import SubNavbar from './SubNavbar/SubNavbar';
import useLogout from '@/hooks/useLogout';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { baseUrl } from '@/const';
import { setCurrentDashboard } from '@/redux/features/userSlice';
import { toast } from 'react-hot-toast';
import GTranslateWidget from '../GTranslateWidget';

const BuyerNav = () => {
  const logout = useLogout();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const user = useSelector((state) => state.user);
 const dispatch = useDispatch();
  const dropdownRef = useRef(null);
useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 const handleSwitchToSelling = async () => {
    const hasSellerRole = user.role.includes('seller') && user.sellerStatus;

    if (hasSellerRole) {
      if (user.sellerStatus) {
        router.push('/seller/dashboard');
         dispatch(setCurrentDashboard('seller'));
      } else {
        toast.error('Your account approval is pending.');
      }
    } 
  };

  return (
    <>
      <nav className="navbar">
        <div className="navSecOne">
          <Link href="/">
            <div className="navbar-logo">
              <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
            </div>
          </Link>
          <SearchBar />
          <ul className="navbar-menu">
            <Link href="/buyer/dashboard" className='navLink'><li className="navbar-item">Dashboard</li></Link>
            <Link href="/orders" className='navLink'><li className="navbar-item">Orders</li></Link>
            <Link href="/services" className='navLink'><li className="navbar-item">Services</li></Link>
            <Link href="/settings/billing" className='navLink'><li className="navbar-item">Billing</li></Link>
          </ul>
        </div>

        <div className="navbar-right">
          <div className="burger" onClick={() => setMenuOpen(true)}>
            <FaBars size={22} />
          </div>
          <div className="navbar-actions">
         <GTranslateWidget />
          {user.role.includes('seller') && user.sellerStatus && (
           <h4 className="cursor-pointer" onClick={handleSwitchToSelling}>Switch to selling</h4> )}
            <Link href="/buyer/liked-services"><div className="nav-icon"><FiHeart /></div></Link>

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
  <div ref={dropdownRef} className="dropdown-container-user">

            <div className="user-avatar-wrapper-nav" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <img src={user.profileUrl} alt="User" className="user-avatar-nav" />
            </div>

            {dropdownOpen && (
              <div className="dropdown-menu-user">
                <div className="dropdown-header-user">
                  <img src={user.profileUrl} alt="User" className="dropdown-avatar-user" />
                  <div className="dropdown-name-user">{user.firstName} {user.lastName}</div>
                  <div className="dropdown-role-user">{user.currentDashboard}</div>
                </div>
                <ul className="dropdown-links-user">
                  <Link href={`/buyer/profile/${user.userName}`} onClick={() => setDropdownOpen(false)}><li><FaUser /> Profile</li></Link>
                  <Link href="/settings/billing" onClick={() => setDropdownOpen(false)}><li><FaCog /> Settings</li></Link>
                  <Link href="/" onClick={() => logout(() => setDropdownOpen(false))}><li><FaSignOutAlt /> Log out</li></Link>
                </ul>
              </div>
            )} </div>
          </div>
        </div>
      </nav>

      <div className='separationNavsLine'></div>
      <SubNavbar />

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

          <div className="mobile-user-info">
            <img src="/assets/myimg.jpg" alt="User" className="mobile-user-avatar" />
            <div className="mobile-user-name">Jane Doe</div>
            <div className="mobile-user-role">Client</div>
          </div>

          <ul className="mobile-nav-links">
            <Link href="/buyer/dashboard" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Dashboard</li></Link>
            <Link href="/orders" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Orders</li></Link>
            <Link href="/services" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Services</li></Link>
            <Link href="/messages" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Messages</li></Link>
            <Link href="/settings/billing" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Billing</li></Link>
            <Link href="/buyer/liked-services" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Liked Services</li></Link>
            <Link href="/notifications" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Notifications</li></Link>
            <Link href="/profile" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Profile</li></Link>
            <Link href="/settings/billing" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Settings</li></Link>
            <Link href="/" className="mobile-navLink" onClick={() => setMenuOpen(false)}><li className="mobile-nav-item">Log out</li></Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default BuyerNav;
