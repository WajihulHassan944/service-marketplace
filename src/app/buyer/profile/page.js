
import React from 'react';
import { baseUrl } from '@/const';
import BuyerProfile from '@/components/BuyerDashboard/BuyerProfile/profile';
const Page = async ({ searchParams }) => {
  const buyerId = searchParams?.id;

  let buyerData = {
    user: {},
    gigs: [],
    portfolios: [],
    buyerReviews: [],
    sellerReviews: [],
  };

  if (buyerId) {
    try {
      const res = await fetch(`${baseUrl}/users/getSellerProfileData/${buyerId}`, {
        cache: 'no-store',
      });

      const data = await res.json();
      if (data.success) {
        buyerData = data;
      }
    } catch (error) {
      console.error('Failed to fetch buyer profile:', error);
    }
  }

  return (
    <>
      <BuyerProfile buyerData={buyerData} />
    </>
  );
};

export default Page;
