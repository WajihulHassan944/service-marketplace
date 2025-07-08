import React, { Suspense } from 'react';
import SpaceDetails from './SpaceDetails';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading space details...</div>}>
      <SpaceDetails />
    </Suspense>
  );
};

export default Page;
