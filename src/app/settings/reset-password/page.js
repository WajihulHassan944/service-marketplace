'use client';
import ResetPassword from '@/components/BuyerDashboard/Settings/ResetPassword/ResetPassword'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
     <ResetPassword /> 
    </>
  )
}

export default withAuth(page)
