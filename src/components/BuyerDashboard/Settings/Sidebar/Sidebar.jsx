'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaBuilding, FaLock, FaCalendarAlt, FaPlusCircle, FaFolderOpen, FaMoneyCheckAlt , FaArrowLeft} from 'react-icons/fa';
import "../Billing/billing.css";
import { useSelector } from 'react-redux';

const Sidebar = () => {
   const user = useSelector((state) => state.user);
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
const isSeller = user?.currentDashboard === "seller";

  
const menuItems = [
  { path: '/settings/myinfo', icon: <FaUser />, label: 'My info' },
  { path: '/settings/billing', icon: <FaBuilding />, label: 'Billing & Payments' },
  { path: '/settings/reset-password', icon: <FaLock />, label: 'Password & Security' },
  { path: '/settings/reviews', icon: <FaCalendarAlt />, label: 'My Reviews' },
  ...(isSeller
    ? [
        { path: '/seller/create-portfolio', icon: <FaPlusCircle />, label: 'Create Portfolio' },
        { path: '/seller/my-portfolio', icon: <FaFolderOpen />, label: 'My Portfolio' },
        { path: '/seller/payout', icon: <FaMoneyCheckAlt />, label: 'Withdraw' },
      ]
    : []),
];
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // Run on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isMobile && (
        <button
          className={`sidebar-toggle ${isOpen ? 'rotate' : ''}`}
          onClick={toggleSidebar}
        >
          <FaArrowLeft className='sideNavToggleArrow' />
        </button>
      )}
      <aside className={`sidebar ${isMobile ? (isOpen ? 'show' : 'hide') : ''}`}>
        <ul>
          {menuItems.map((item) => (
            <li
  key={item.path}
  className={
    (item.path === '/seller/my-portfolio' &&
      (pathname === '/seller/my-portfolio' || pathname === '/seller/portfolio-details'))
      ? 'active'
      : pathname === item.path
        ? 'active'
        : ''
  }
>
              <Link href={item.path} className="sidebar-link">
                {item.icon} <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
