'use client'

import { signInAction } from '@/src/actions/auth-action'
import { Button } from 'antd'

export default function SignInButton() {
   return (
      <form action={signInAction}>
         <Button htmlType="submit">Sign in</Button>
      </form>
   )
}
