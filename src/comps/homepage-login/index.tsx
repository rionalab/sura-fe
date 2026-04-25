import { auth } from '@/src/utils/auth'
import React from 'react'
import SignInButton from '../sign-in-button'
import SignOutButton from '../sign-out-button'
import Image from 'next/image'

export default async function HomepageLogin() {
   const session = await auth()
   const avatarUrl = session?.user?.avatar

   console.log({ session })

   if (!!session) {
      return (
         <>
            <h1>{session.user?.email}</h1>
            {avatarUrl && (
               <Image
                  width={200}
                  height={200}
                  src={avatarUrl ?? '/default-avatar.png'}
                  alt="profile picture"
               />
            )}
            <SignOutButton />
         </>
      )
   }

   return (
      <div>
         <SignInButton />
      </div>
   )
}
