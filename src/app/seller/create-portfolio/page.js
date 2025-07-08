import React, { Suspense } from 'react';
import CreatePortfolio from '@/components/BuyerDashboard/Settings/CreatePortfolio/CreatePortfolio';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreatePortfolio />
    </Suspense>
  );
};

export default Page;
