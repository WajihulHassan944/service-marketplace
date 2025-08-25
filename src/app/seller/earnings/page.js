'use client';
import Earnings from '@/components/SellerDashboard/Earnings/Earned/Earnings'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <Earnings />
    </>
  )
}

export default withAuth(page)
