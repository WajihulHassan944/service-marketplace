'use client';
import ClientList from '@/components/BuyerDashboard/Settings/my-clients/my-clients'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <div>
      <ClientList />
    </div>
  )
}

export default withAuth(page)
