import React, { Suspense } from 'react';
import SignupForm from '@/components/SignUp/Signup';

const Page = () => {
  return (
    <Suspense fallback={<div>Loading signup form...</div>}>
      <SignupForm />
    </Suspense>
  );
};

export default Page;
