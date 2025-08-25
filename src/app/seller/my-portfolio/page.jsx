'use client';
import Myportfolio from '@/components/BuyerDashboard/Settings/Myportfolio/Myportfolio'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <div>
      <Myportfolio />
    </div>
  )
}

export default withAuth(page)
