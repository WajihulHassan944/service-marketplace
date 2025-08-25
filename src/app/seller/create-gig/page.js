'use client';
import React, { Suspense } from 'react';
import Navbar from '@/components/SellerDashboard/CreateGig/Navbar';
import withAuth from '@/hooks/withAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
    </Suspense>
  );
};

export default withAuth(Page);
