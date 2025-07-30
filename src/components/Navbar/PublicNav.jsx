'use client';
import React, { useEffect, useState } from 'react';
import './Navbar.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import SubNavbar from './SubNavbar/SubNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/redux/features/categorySlice';
import { useRouter } from 'next/navigation';
import SearchBar from './Search/SearchBar';

import GTranslateWidget from '../GTranslateWidget';

const PublicNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const dispatch = useDispatch();
const router = useRouter();
const [dropdownOpen, setDropdownOpen] = useState(false);

const { categories, status } = useSelector((state) => state.categories);

useEffect(() => {
  if (status === 'idle') {
    dispatch(fetchCategories());
  }
}, [status, dispatch]);

const handleCategoryClick = (categoryName) => {
  router.push(`/services?category=${encodeURIComponent(categoryName)}`);
};

  return (
    <>
      <nav className="public-navbar">
        <div className="public-navbar-left">
          <Link href="/">
            <div className="public-navbar-logo" style={{ cursor: 'pointer' }}>
              <Image src="/assets/logo.png" alt="logo" width={50} height={50} />
            </div>
          </Link>
             <SearchBar />
          <ul className="public-navbar-menu">
          
         <li
  className="public-navbar-item dropdown"
  onMouseEnter={() => setDropdownOpen(true)}
  onMouseLeave={() => setDropdownOpen(false)}
>
  <span style={{ cursor: 'pointer' }}>
    Hire Talent <span className="arrow">▾</span>
  </span>

  {dropdownOpen && (
    <ul className="dropdown-menu">
      {categories.length === 0 ? (
        <li style={{ padding: '10px', color: '#888' }}>Loading categories...</li>
      ) : (
        categories.map((cat) => (
          <li
            key={cat._id}
            onClick={() => {
              handleCategoryClick(cat.name);
              setDropdownOpen(false); // 👈 close dropdown on click
            }}
            style={{ cursor: 'pointer' }}
          >
            {cat.name}
          </li>
        ))
      )}
    </ul>
  )}
</li>


            <Link href="/about" className="public-nav-link"><li className="public-navbar-item">About Us</li></Link>
            <Link href="/services" className="public-nav-link"><li className="public-navbar-item">Services</li></Link>
            <Link href="/contact" className="public-nav-link"><li className="public-navbar-item">Contact</li></Link>
          </ul>
        </div>

        <div className="public-navbar-right">
          <div className="public-navbar-actions">
        
 <GTranslateWidget />
            <Link href="/login" className="public-nav-link login-btn-nav">Log In</Link>
            <Link href="/register" className="public-nav-link"><button className="public-green-btn-bordered">Sign up</button></Link>
            <Link href="/register?role=seller" className="public-nav-link"><button className="public-green-btn">Apply as a freelancer</button></Link>
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

      <SubNavbar />
    </>
  );
};

export default PublicNav;
