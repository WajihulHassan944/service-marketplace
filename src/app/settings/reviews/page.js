'use client';
import ReviewCard from '@/components/BuyerDashboard/Settings/ReviewsCard/ReviewCard'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <ReviewCard />
    </>
  )
}

export default withAuth(page)
