'use client';
import Billing from '@/components/BuyerDashboard/Settings/Billing/Billing'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <Billing />
    </>
  )
}

export default withAuth(page)
