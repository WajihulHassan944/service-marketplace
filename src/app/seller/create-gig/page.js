import React, { Suspense } from 'react';
import Navbar from '@/components/SellerDashboard/CreateGig/Navbar';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Navbar />
    </Suspense>
  );
};

export default Page;
