import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
   interface User {
      role?: string
      avatar?: string
   }

   interface Session {
      user: {
         role?: string
         avatar?: string
      } & DefaultSession['user']
   }
}

declare module 'next-auth/jwt' {
   interface JWT {
      role?: string
      avatar?: string
   }
}
