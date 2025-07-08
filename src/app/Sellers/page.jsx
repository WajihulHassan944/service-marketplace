import React, { Suspense } from 'react';
import SearchedSellersSection from './SearchedSellersSection';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading sellers...</div>}>
      <SearchedSellersSection />
    </Suspense>
  );
};

export default Page;
