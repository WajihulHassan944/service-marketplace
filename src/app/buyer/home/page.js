'use client';

import BuyerHomePage from '@/components/Home/BuyerHomePage';
import withAuth from '@/hooks/withAuth';
import React from 'react';

const Page = () => {
  return <BuyerHomePage />;
};

export default withAuth(Page);
