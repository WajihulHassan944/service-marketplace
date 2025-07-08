// src/app/profile/page.js
import Profile from '@/components/BuyerDashboard/ProfilePage/Profile';
import React from 'react';
import { baseUrl } from '@/const';
const Page = async ({ searchParams }) => {
  const sellerId = searchParams?.id;

  let sellerData = {
    user: {},
    gigs: [],
    portfolios: [],
    buyerReviews: [],
    sellerReviews: [],
  };

  if (sellerId) {
    try {
      const res = await fetch(`${baseUrl}/users/getSellerProfileData/${sellerId}`, {
        cache: 'no-store',
      });

      const data = await res.json();
      if (data.success) {
        sellerData = data;
      }
    } catch (error) {
      console.error('Failed to fetch seller profile:', error);
    }
  }

  return (
    <>
      <Profile sellerData={sellerData} />
    </>
  );
};

export default Page;
