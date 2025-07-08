"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { MdCategory } from 'react-icons/md';

import {
  FaBars,
  FaTimes,
  FaGlobe,
  FaShoppingCart,
  FaUserShield,
  FaEnvelope,
  FaCogs,
  FaUserCircle,
  FaExchangeAlt,
  FaBalanceScale,
  FaHome,
  FaPowerOff
} from 'react-icons/fa';
import './adminNav.css';
import { useSelector } from 'react-redux';
import useLogout from '@/hooks/useLogout';
import { useRouter } from 'next/navigation';

const AdminNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user);
 const logout = useLogout();
  const isSuperAdmin = user?.role?.includes("superadmin");
 const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };
  return (
    <>
      <div className="mobile-header">
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <img src="/logo.png" alt="Logo" className="mobile-logo" />
      </div>

      <aside className={`admin-sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <img src="/logo.png" alt="Modernize Logo" className="logo" />
          <span className="brand-name">doTask</span>
        </div>

        <nav className="nav-sections">
          <div className="nav-group">
            <ul>
              <li>
                <Link href="/admin">
                  <FaHome className="icon" /> <span>Home</span>
                </Link>
              </li>

              <li className={!isSuperAdmin ? "disabled-link" : ""}>
                <Link href="/admin/buyerdata">
                  <FaGlobe className="icon" /> <span>Manage Buyers</span>
                </Link>
              </li>

              <li className={!isSuperAdmin ? "disabled-link" : ""}>
                <Link href="/admin/sellerdata">
                  <FaShoppingCart className="icon" /> <span>Manage Sellers</span>
                </Link>
              </li>

              <li className={!isSuperAdmin ? "disabled-link" : ""}>
                <Link href="/admin/SeeAllAdmin">
                  <FaUserShield className="icon" /> <span>Manage Admins</span>
                </Link>
              </li>

              <li>
                <Link href="/admin/emails">
                  <FaEnvelope className="icon" /> <span>Email</span>
                </Link>
              </li>

              <li className={!isSuperAdmin ? "disabled-link" : ""}>
                <Link href="/admin/manageservices">
                  <FaCogs className="icon" /> <span>Manage Services</span>
                </Link>
              </li>

              <li>
                <Link href="/admin/ProfileSetting">
                  <FaUserCircle className="icon" /> <span>Settings</span>
                </Link>
              </li>

              <li className={!isSuperAdmin ? "disabled-link" : ""}>
                <Link href="/admin/recent-transactions">
                  <FaExchangeAlt className="icon" /> <span>Transactions</span>
                </Link>
              </li>

              <li className={!isSuperAdmin ? "disabled-link" : ""}>
                <Link href="/admin/manage-categories">
                  <MdCategory className="icon" /> <span>Categories</span>
                </Link>
              </li>

              <li>
                <Link href="/admin/resolution-center">
                  <FaBalanceScale className="icon" /> <span>Resolution Center</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="user-box">
          <img src={user.profileUrl} alt="User" className="user-img"  />
          <div>
            <p className="username">{user.firstName} {user.lastName}</p>
            <p className="usertag">{user.currentDashboard}</p>
          </div>
          <FaPowerOff className="logout-icon" onClick={handleLogout} />
        </div>
      </aside>
    </>
  );
};

export default AdminNav;