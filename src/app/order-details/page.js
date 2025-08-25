'use client';
import React, { Suspense } from 'react';
import Main from '@/components/BuyerDashboard/Project/Main';
import withAuth from '@/hooks/withAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading project...</div>}>
      <Main />
    </Suspense>
  );
};

export default withAuth(Page);
