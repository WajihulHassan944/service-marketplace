'use client';
import React from 'react'
import Breadcrumb from './Breadcrumb/Breadcrumb'
import MessagesMainAdmin from './MessagesMainAdmin/MessagesMainAdmin'
import withAdminAuth from '@/hooks/withAdminAuth'

const page = () => {
  return (
    <div>
      <Breadcrumb />
      <MessagesMainAdmin />
    </div>
  )
}

export default withAdminAuth(page)
