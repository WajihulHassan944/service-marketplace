'use client';
import React, { Suspense } from 'react';
import SpaceDetails from './SpaceDetails';
import withAuth from '@/hooks/withAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading space details...</div>}>
      <SpaceDetails />
    </Suspense>
  );
};

export default withAuth(Page);
