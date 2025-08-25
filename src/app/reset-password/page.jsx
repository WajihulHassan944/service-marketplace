'use client';
import React, { Suspense } from 'react';
import ResetPasswordConfirm from './ResetPasswordConfirm';
import withAuth from '@/hooks/withAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading reset form...</div>}>
      <ResetPasswordConfirm />
    </Suspense>
  );
};

export default withAuth(Page);
