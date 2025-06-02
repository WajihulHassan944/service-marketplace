'use client';

import BuyerHome from '@/components/BuyerDashboard/Home/BuyerHome';
import withAuth from '@/hooks/withAuth';
import React from 'react';

const Page = () => {
  return <BuyerHome />;
};

export default withAuth(Page);
