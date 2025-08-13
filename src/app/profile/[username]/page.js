import Profile from '@/components/BuyerDashboard/ProfilePage/Profile';
import React from 'react';
import { baseUrl } from '@/const';
import { FaExclamationTriangle } from 'react-icons/fa';
import './ProfileError.css'; // plain CSS import

export default async function Page({ params }) {
  const { username } = await params;

  let sellerData = null;
  let errorMessage = '';

  if (username) {
    try {
      const res = await fetch(
        `${baseUrl}/users/getSellerProfileDataByUsername/${username}`,
        { cache: 'no-store' }
      );

      if (!res.ok) {
        if (res.status === 404) {
          errorMessage = 'User not found';
        } else if (res.status === 400) {
          errorMessage = 'Invalid request';
        } else if (res.status >= 500) {
          errorMessage = 'Server error, please try again later';
        } else {
          errorMessage = `Unexpected error: ${res.status}`;
        }
      } else {
        const data = await res.json();
        if (data.success && data.user) {
          sellerData = data;
        } else {
          errorMessage = 'Seller profile not found';
        }
      }
    } catch (error) {
      errorMessage = 'Unable to fetch profile data. Please check your connection.';
    }
  } else {
    errorMessage = 'No username provided.';
  }

  if (errorMessage) {
    return (
      <div className='errorWrap'>
        <div className="error-container">
        <FaExclamationTriangle className="error-icon" />
        <p className="error-text">{errorMessage}</p>
      </div>
      </div>
    );
  }

  return <Profile sellerData={sellerData} />;
}
