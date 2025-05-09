'use client';
import React, { useState } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import {  FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { FiHeart, FiBell } from 'react-icons/fi';
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
    <div className='navSecOne'>
    <Link href="/">
  <div className="navbar-logo" style={{ cursor: 'pointer' }}>
    <Image src="/assets/logo.png" alt="logo" width={50} height={50} style={{objectFit:'contain'}} />
  </div>
</Link>
      <ul className="navbar-menu">
        <Link href="/buyer/dashboard" className='navLink'><li className="navbar-item">Dashboard</li>
        </Link>
       <Link href="/buyer/orders" className='navLink'> <li className="navbar-item">Orders</li>
       </Link>
       <Link href="/services" className='navLink'> <li className="navbar-item">Services</li>
       </Link>
       
       <Link href="/messages" className='navLink'> <li className="navbar-item">Messages</li>
       </Link>
       
       <Link href="/buyer/settings/billing" className='navLink'> <li className="navbar-item">Billing</li>
       </Link>
       </ul></div>
       <div className="navbar-actions">
      <Link href="/buyer/liked-services"> <div className="nav-icon"><FiHeart /></div></Link>
<Link href="/buyer/notifications">
<div className="nav-icon notification-icon">
  <FiBell />
  <span className="red-dot" />
</div></Link>
      <div className="user-avatar-wrapper-nav" onClick={() => setOpen(!open)}>
        <img src="/assets/myimg.jpg" alt="User" className="user-avatar-nav" />
      </div>

      {open && (
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
            <Link href="/profile" onClick={()=> setOpen(false)} ><li><FaUser /> Profile</li>
            </Link>
            <Link href="/buyer/settings/billing" onClick={()=> setOpen(false)}><li><FaCog /> Settings</li></Link>
            <Link href="/" onClick={()=> setOpen(false)}><li><FaSignOutAlt /> Log out</li></Link>
          </ul>
        </div>
      )}
    </div>
    </nav>
  );
};

export default Navbar;
