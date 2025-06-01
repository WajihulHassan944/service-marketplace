'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BuyerNav from './BuyerNav';
import SellerNav from './SellerNav';
import PublicNav from './PublicNav';

const Navbar = () => {
  const { isAuthenticated, currentDashboard } = useSelector((state) => state.user);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // This ensures Redux state is available before rendering
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Or a loader, if you prefer

  if (isAuthenticated) {
    if (currentDashboard === 'buyer') {
      return <BuyerNav />;
    } else if (currentDashboard === 'seller') {
      return <SellerNav />;
    }
  }

  return <PublicNav />;
};

export default Navbar;
