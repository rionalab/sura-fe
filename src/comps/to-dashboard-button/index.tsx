'use client'

import { Button } from 'antd'
import React from 'react'
import Link from 'next/link'

export default function ToDashboardButton() {
   return (
      <Link href="/dashboard" passHref>
         <Button onClick={() => {}} type="primary">
            Dashboard
         </Button>
      </Link>
   )
}
