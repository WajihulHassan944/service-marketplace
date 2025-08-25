'use client';
import React, { Suspense } from 'react';
import CreatePortfolio from '@/components/BuyerDashboard/Settings/CreatePortfolio/CreatePortfolio';
import withAuth from '@/hooks/withAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePortfolio />
    </Suspense>
  );
};

export default withAuth(Page);
