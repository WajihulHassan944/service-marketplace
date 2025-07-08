import React, { Suspense } from 'react';
import GigDetails from '@/components/GigDetails/GigDetails';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading gig details...</div>}>
      <GigDetails />
    </Suspense>
  );
};

export default Page;
