'use client';

import Notifications from '@/components/BuyerDashboard/Notifications/Notifications'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <Notifications />
    </>
  )
}

export default withAuth(page)
