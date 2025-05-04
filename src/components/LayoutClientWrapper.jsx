'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const LayoutClientWrapper = () => {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const links = document.querySelectorAll('.navbar-item, .navbar-actions a');

    if ((pathname === '/contact' || pathname === '/terms-of-service' || pathname === '/privacy-policy') && navbar) {
      navbar.style.backgroundColor = '#0f256e';
      links.forEach(link => {
        link.style.color = 'white';
      });
    } else if (navbar) {
      navbar.style.backgroundColor = '#fff';
      links.forEach(link => {
        link.style.color = '#333';
      });
    }
  }, [pathname]);

  return null; // nothing is rendered
};

export default LayoutClientWrapper;
