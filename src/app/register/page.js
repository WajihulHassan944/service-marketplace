"use client";
import React, { Suspense } from 'react';
import SignupForm from '@/components/SignUp/Signup';
import withoutAuth from '@/hooks/withoutAuth';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading signup form...</div>}>
      <SignupForm />
    </Suspense>
  );
};

export default withoutAuth(Page);
