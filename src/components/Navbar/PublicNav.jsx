'use client';
import React, { useState } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';

const PublicNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="public-navbar">
        <div className="public-navbar-left">
          <Link href="/">
            <div className="public-navbar-logo" style={{ cursor: 'pointer' }}>
              <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
            </div>
          </Link>
          <ul className="public-navbar-menu">
            <Link href="/" className="public-nav-link"><li className="public-navbar-item">Top 1%</li></Link>
            <li className="public-navbar-item dropdown">
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
            <Link href="/about" className="public-nav-link"><li className="public-navbar-item">About Us</li></Link>
            <Link href="/services" className="public-nav-link"><li className="public-navbar-item">Services</li></Link>
            <Link href="/contact" className="public-nav-link"><li className="public-navbar-item">Contact</li></Link>
          </ul>
        </div>

        <div className="public-navbar-right">
          <div className="public-navbar-actions">
            <Link href="/register" className="public-nav-link"><button className="public-green-btn">Sign up</button></Link>
            <Link href="/login" className="public-nav-link">Log In</Link>
          </div>

          <div className="public-navbar-burger" onClick={() => setMenuOpen(true)}>
            <FaBars size={22} />
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="public-mobile-menu">
          <div className="public-mobile-menu-header">
            <Link href="/" onClick={() => setMenuOpen(false)}>
              <div className="public-navbar-logo">
                <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
              </div>
            </Link>
            <FaTimes size={22} onClick={() => setMenuOpen(false)} className="public-close-icon" />
          </div>
          <ul className="public-mobile-nav-links">
            <Link href="/" className="public-mobile-nav-link" onClick={() => setMenuOpen(false)}><li className="public-mobile-nav-item">Top 1%</li></Link>
            <Link href="/about" className="public-mobile-nav-link" onClick={() => setMenuOpen(false)}><li className="public-mobile-nav-item">About Us</li></Link>
            <Link href="/services" className="public-mobile-nav-link" onClick={() => setMenuOpen(false)}><li className="public-mobile-nav-item">Services</li></Link>
            <Link href="/contact" className="public-mobile-nav-link" onClick={() => setMenuOpen(false)}><li className="public-mobile-nav-item">Contact</li></Link>
            <Link href="/register" className="public-mobile-nav-link" onClick={() => setMenuOpen(false)}><li className="public-mobile-nav-item">Sign up</li></Link>
            <Link href="/login" className="public-mobile-nav-link" onClick={() => setMenuOpen(false)}><li className="public-mobile-nav-item">Log In</li></Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default PublicNav;
