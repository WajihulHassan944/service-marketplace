'use client';
import React from 'react';
import './admin.css';
import AdminHomeCards from './AdminHome/AdminHomeCards/AdminHomeCards';
import RevenueUpdates from './AdminHome/RevenueUpdates/RevenueUpdates';
import EarningsCards from './AdminHome/EarningsCards/EarningsCards';
import TopPerformers from './AdminHome/Stats/TopPerformers';
import WeeklyStats from './AdminHome/Stats/WeeklyStats';
import { useSelector } from 'react-redux';
import withAdminAuth from '@/hooks/withAdminAuth';

const Page = () => {
  const user = useSelector((state)=> state.user);
  console.log(user);
  return (
<>

  <AdminHomeCards />
  <div className="chartsdiv">
  <RevenueUpdates />
  <EarningsCards />
  </div> 
  <div className="statschart">
  <WeeklyStats/>
  <TopPerformers/>
  </div>
</>   
   );
};

export default withAdminAuth(Page);
