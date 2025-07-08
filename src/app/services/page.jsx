import React, { Suspense } from 'react';
import Gigs from '@/components/Gigs/Gigs';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading gigs...</div>}>
      <Gigs />
    </Suspense>
  );
};

export default Page;
