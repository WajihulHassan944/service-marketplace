import React, { Suspense } from 'react';
import PortfolioDetails from './PortfolioDetails';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <PortfolioDetails />
    </Suspense>
  );
};

export default Page;
