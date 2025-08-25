'use client';
import React, { Suspense } from 'react';
import Messages from '@/components/BuyerDashboard/Messages/Messages';
import withAuth from '@/hooks/withAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <Messages />
    </Suspense>
  );
};

export default withAuth(Page);
