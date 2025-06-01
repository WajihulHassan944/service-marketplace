import React from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
const PublicNav = () => {
  return (
    <nav className="navbar">
    <div className='navSecOne'>
    <Link href="/">
  <div className="navbar-logo" style={{ cursor: 'pointer' }}>
    <Image src="/assets/logo.png" alt="logo" width={50} height={50} style={{objectFit:'contain'}} />
  </div>
</Link>
      <ul className="navbar-menu">
        <Link href="/" className='navLink'><li className="navbar-item">Top 1%</li>
        </Link>
        <li className="navbar-item dropdown">
          Hire Talent <span className="arrow">▾</span>
          <ul className="dropdown-menu">
            <li>Developers</li>
            <li>Designers</li>
            <li>Marketing Experts</li>
            <li>Product Managers</li>
            <li>Project Managers</li>
            <li>Management Consultants</li>
            <li className="submenu-divider">Want to hire a full team?</li>
            <li>Hire a Team</li>
          </ul>
        </li>
       <Link href="/about" className='navLink'> <li className="navbar-item">About Us</li>
       </Link>
       <Link href="/services" className='navLink'> <li className="navbar-item">Services</li>
       </Link>
       
       
        <Link href="/contact" className='navLink'> <li className="navbar-item">Contact</li>
       </Link>
      </ul></div>
      <div className="navbar-actions">
      <Link href="/register" className='navLink'> <button className="green-btn">Sign up</button>
      </Link>
        
        <Link href="/login" className='navLink'> Log In
        </Link>
      </div>
    </nav>
  );
};

export default PublicNav;
