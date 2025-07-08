import React, { Suspense } from 'react';
import Main from '@/components/BuyerDashboard/Project/Main';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading project...</div>}>
      <Main />
    </Suspense>
  );
};

export default Page;
