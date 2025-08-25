'use client';
import Services from '@/components/SellerDashboard/Services/Services'
import withAuth from '@/hooks/withAuth'
import React from 'react'

const page = () => {
  return (
    <>
     <Services /> 
    </>
  )
}

export default withAuth(page)
