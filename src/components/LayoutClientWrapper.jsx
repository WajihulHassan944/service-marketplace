'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';

const LayoutClientWrapper = ({ children }) => {
  const pathname = usePathname();

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    const burgermenu = document.querySelector('.burger');
    const links = document.querySelectorAll('.navbar-item, .navbar-actions a');

    const specialPages = ['/contact', '/terms-of-service', '/privacy-policy'];

    if (specialPages.includes(pathname) && navbar) {
      navbar.style.backgroundColor = '#0f256e';
      if (burgermenu) burgermenu.style.color = '#fff';
      links.forEach(link => {
        link.style.color = 'white';
      });
    } else if (navbar) {
      if (burgermenu) burgermenu.style.color = '#1e1e1e';
      navbar.style.backgroundColor = '#fff';
      links.forEach(link => {
        link.style.color = '#333';
      });
    }
  }, [pathname]);

  return <Provider store={store}>{children}</Provider>;
};

export default LayoutClientWrapper;
