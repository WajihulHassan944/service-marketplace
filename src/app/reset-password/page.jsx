import React, { Suspense } from 'react';
import ResetPasswordConfirm from './ResetPasswordConfirm';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <ResetPasswordConfirm />
    </Suspense>
  );
};

export default Page;
