'use client';

import Dashboard from '@/components/SellerDashboard/dashboard/Dashboard';
import withAuth from '@/hooks/withAuth';
import React from 'react';

const Page = () => {
  return <Dashboard />;
};

export default withAuth(Page);
