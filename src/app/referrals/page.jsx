'use client';
import React from 'react';
import './referrals.css';
import Sidebar from '@/components/BuyerDashboard/Settings/Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import withAuth from '@/hooks/withAuth';

const page = () => {
  const user = useSelector((state) => state.user);

  const referrals = user?.wallet?.referrals || [];

  return (
    <div className="referrals-container">
      <Sidebar />
      <div className="referrals-content">
        <h2>Users You Referred</h2>
        <table className="referrals-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Country</th>
              <th>Referral Date</th>
              <th>Credits Earned</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((ref, index) => (
              <tr key={ref._id}>
                <td>{index + 1}</td>
                <td>{ref.referredUser.firstName} {ref.referredUser.lastName}</td>
                <td>{ref.referredUser.country}</td>
                <td>{new Date(ref.date).toLocaleDateString()}</td>
                <td>{ref.creditsEarned}</td>
              </tr>
            ))}
          </tbody>
        </table>

<h2 style={{ marginTop: '40px' }}>Orders by Referred Users</h2>
<table className="referrals-table">
  <thead>
    <tr>
      <th>#</th>
      <th>User</th>
      <th>Order ID</th>
      <th>Date</th>
      <th>Credits Earned</th>
    </tr>
  </thead>
  <tbody>
    {Object.entries(
      referrals.reduce((acc, ref) => {
        const userId = ref.referredUser._id;
        if (!acc[userId]) acc[userId] = { user: ref.referredUser, orders: [], totalCredits: 0 };
        acc[userId].orders.push(ref);
        acc[userId].totalCredits += ref.creditsEarned || 0;
        return acc;
      }, {})
    ).map(([userId, data], userIndex) => (
      <React.Fragment key={userId}>
        <tr className="ref-user-heading">
          <td colSpan="5" style={{ background: '#f5f5f5', fontWeight: 'bold' }}>
            {userIndex + 1}. {data.user.firstName} {data.user.lastName} ({data.user.country}) — Total Credits Earned: {data.totalCredits}
          </td>
        </tr>
        {data.orders.map((ref, index) => (
          <tr key={ref._id}>
            <td>{index + 1}</td>
            <td>{data.user.firstName} {data.user.lastName}</td>
            <td>{ref.orderId}</td>
            <td>{new Date(ref.date).toLocaleDateString()}</td>
            <td>{ref.creditsEarned}</td>
          </tr>
        ))}
      </React.Fragment>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default withAuth(page);
