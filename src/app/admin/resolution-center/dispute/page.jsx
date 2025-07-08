import React, { Suspense } from 'react';
import Dispute from './Dispute';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading dispute details...</div>}>
      <Dispute />
    </Suspense>
  );
};

export default Page;
