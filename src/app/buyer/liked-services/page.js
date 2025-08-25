'use client';
import LikedGigs from '@/components/BuyerDashboard/LikedGigs/LikedGigs'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <LikedGigs />
    </>
  )
}

export default withAuth(page)
