'use client';
import InfoSettings from '@/components/BuyerDashboard/Settings/InfoSettings/InfoSettings'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <InfoSettings />
    </>
  )
}

export default withAuth(page)
