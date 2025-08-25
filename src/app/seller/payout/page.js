'use client';
import Payout from '@/components/SellerDashboard/Earnings/Payout/Payout'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <Payout />
    </>
  )
}

export default withAuth(page)
