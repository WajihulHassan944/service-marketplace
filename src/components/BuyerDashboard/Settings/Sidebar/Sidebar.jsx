'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaLock, FaCalendarAlt, FaBuilding, FaLink as FaLinkIcon, FaArrowLeft } from 'react-icons/fa';
import "../Billing/billing.css";

const Sidebar = () => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: '/buyer/settings/myinfo', icon: <FaUser />, label: 'My info' },
    { path: '/buyer/settings/billing', icon: <FaBuilding />, label: 'Billing & Payments' },
    { path: '/buyer/settings/reset-password', icon: <FaLock />, label: 'Password & Security' },
    { path: '/buyer/settings/reviews', icon: <FaCalendarAlt />, label: 'My Reviews' },
    { path: '/seller/create-portfolio', icon: <FaLinkIcon />, label: 'My Portfolio' },
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
            <li key={item.path} className={pathname === item.path ? 'active' : ''}>
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
