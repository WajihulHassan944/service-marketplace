'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaUser, FaLock, FaCalendarAlt, FaBuilding, FaLink as FaLinkIcon } from 'react-icons/fa';
import "../Billing/billing.css";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { path: '/buyer/settings/myinfo', icon: <FaUser />, label: 'My info' },
    { path: '/buyer/settings/billing', icon: <FaBuilding />, label: 'Billing & Payments' },
    { path: '/buyer/settings/reset-password', icon: <FaLock />, label: 'Password & Security' },
    { path: '/buyer/settings/reviews', icon: <FaCalendarAlt />, label: 'My Reviews' },
    { path: '/buyer/settings/connected', icon: <FaLinkIcon />, label: 'Connected Accounts' },
  ];

  return (
    <aside className="sidebar">
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
  );
};

export default Sidebar;
