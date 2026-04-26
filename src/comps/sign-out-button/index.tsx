'use client'

import { Button } from 'antd'
import { useState } from 'react'

export default function SignOutButton() {
   const [loading, setLoading] = useState(false)

   return (
      <form>
         <Button
            loading={loading}
            onClick={() => setLoading(true)}
            htmlType="submit"
         >
            Sign out
         </Button>
      </form>
   )
}
