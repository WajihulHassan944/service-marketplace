import React, { Suspense } from 'react';
import Portfolio from '@/components/SellerDashboard/Portfolio/Portfolio';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <Portfolio />
    </Suspense>
  );
};

export default Page;
