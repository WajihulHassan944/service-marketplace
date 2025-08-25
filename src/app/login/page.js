"use client";
import LoginPage from '@/components/Login/Login'
import withoutAuth from '@/hooks/withoutAuth'
import React from 'react'

const page = () => {
  return (
    <>
      <LoginPage />
    </>
  )
}

export default withoutAuth(page)
