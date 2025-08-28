'use client';
import React, { Suspense } from 'react';
import EmailVerification from './EmailVerification';

const Page = () => {
  return (
    <div>
      <Suspense fallback={<div className="verify-loading">Loading...</div>}>
        <EmailVerification />
      </Suspense>
    </div>
  );
};

export default Page;
