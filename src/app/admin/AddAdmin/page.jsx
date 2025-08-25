'use client';
import React from 'react'
import AddAdmin from './AddAdmin'
import withAdminAuth from '@/hooks/withAdminAuth'

const page = () => {
  return (
    <>
      <AddAdmin />
    </>
  )
}

export default withAdminAuth(page)
