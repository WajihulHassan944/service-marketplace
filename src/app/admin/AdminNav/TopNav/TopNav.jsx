import React, { useState, useRef, useEffect } from 'react';
import './TopNav.css';
import { FaSearch } from 'react-icons/fa';
import { FiBell, FiMoreVertical } from "react-icons/fi";
import { MdArrowDropDown } from 'react-icons/md';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import Link from 'next/link';

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <header className="topnav">
        <div className="topnav-more" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <FiMoreVertical  className="topNavIcon" />
        </div>

      <div className="topnav-left">
        <FaSearch className="icon" />
        <div className="topnav-link"><Link className='topnav-link-main' href="/admin">Dashboard</Link></div>
        <div className="topnav-link"><Link className='topnav-link-main' href="/admin/resolution-center">Disputes</Link></div>
        <div className="topnav-link"><Link className='topnav-link-main' href="/admin/AddAdmin">Add Admin</Link></div>
        <div className="topnav-link"><Link className='topnav-link-main' href="/admin/emails">Email</Link></div>
      </div>

      <div className="topnav-right">
      
        {/* Desktop icons */}
        <div className="topnavbar-icons">
          <img src="/assets/admin/icon-flag-en.svg" alt="Flag" className="icon-img" />

         <Link href="/admin/messages"> <div className="icon-with-badge-topnav">
            <HiOutlineChatBubbleLeftRight className="icon-topnav" />
            <span className="badge-topnav">2</span>
          </div></Link>

        <Link href="/admin/notifications">  <div className="icon-with-dot-topnav">
            <FiBell className="icon-topnav" />
            <span className="dot-topnav"></span>
          </div></Link>

          <img src="/assets/myimg.jpg" alt="User" className="avatar-topnav" />
        </div>

      
      </div>

        {mobileMenuOpen && (
          <div className="mobile-topnav-dropdown" ref={dropdownRef}>
            <img src="/assets/admin/icon-flag-en.svg" alt="Flag" className="icon-img" />
            <div className="icon-with-badge">
              <HiOutlineChatBubbleLeftRight className="icon" />
              <span className="badge">2</span>
            </div>
            <div className="icon-with-dot">
              <FiBell className="icon" />
              <span className="dot"></span>
            </div>
            <img src="/assets/myimg.jpg" alt="User" className="avatar" />
          </div>
        )}
    </header>
  );
};

export default TopNav;
