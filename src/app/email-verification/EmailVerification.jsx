'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import './EmailVerification.css';

const EmailVerification = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get('verified');

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/login');
    }, 10000); // 10s redirect
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="verify-container">
      <div className="verify-card">
        {verified === 'success' && (
          <>
            <CheckCircle className="verify-icon success" size={60} />
            <h2 className="verify-title">Email Verified Successfully!</h2>
            <p className="verify-text">
              Your email has been verified. You will be redirected to login shortly.
            </p>
          </>
        )}

        {verified === 'failed' && (
          <>
            <XCircle className="verify-icon error" size={60} />
            <h2 className="verify-title">Verification Failed</h2>
            <p className="verify-text">
              The verification link is invalid or expired. Please request a new one.
            </p>
          </>
        )}

        {verified === 'already' && (
          <>
            <Info className="verify-icon info" size={60} />
            <h2 className="verify-title">Email Already Verified</h2>
            <p className="verify-text">
              Your email address has already been verified. You can log in now.
            </p>
          </>
        )}

        <button
          className="verify-btn"
          onClick={() => router.push('/login')}
        >
          Go to Login
        </button>

      
      </div>
    </div>
  );
};

export default EmailVerification;
