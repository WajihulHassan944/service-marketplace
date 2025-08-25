'use client';
import ManageOrders from '@/components/BuyerDashboard/Orders/Orders'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
     <ManageOrders /> 
    </>
  )
}

export default withAuth(page)
