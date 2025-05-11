'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LayoutClientWrapper = () => {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const burgermenu = document.querySelector('.burger');
    const links = document.querySelectorAll('.navbar-item, .navbar-actions a');

    if ((pathname === '/contact' || pathname === '/terms-of-service' || pathname === '/privacy-policy') && navbar) {
      navbar.style.backgroundColor = '#0f256e';
      burgermenu.style.color = '#fff';
      links.forEach(link => {
        link.style.color = 'white';
      });
    } else if (navbar) {
      burgermenu.style.color = '#1e1e1e';
      navbar.style.backgroundColor = '#fff';
      links.forEach(link => {
        link.style.color = '#333';
      });
    }
  }, [pathname]);

  return null; // nothing is rendered
};

export default LayoutClientWrapper;
