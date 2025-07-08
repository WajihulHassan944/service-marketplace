import React, { Suspense } from 'react';
import Messages from '@/components/BuyerDashboard/Messages/Messages';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading messages...</div>}>
      <Messages />
    </Suspense>
  );
};

export default Page;
