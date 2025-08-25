'use client';
import AddClients from '@/components/BuyerDashboard/Settings/add-clients/add-clients'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <div>
      <AddClients />
    </div>
  )
}

export default withAuth(page)
