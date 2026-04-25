import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [GitHub, Google, Credentials],
   callbacks: {
      async signIn({ account, profile }) {
         if (account?.provider === 'google') {
            console.log('Google profile:', profile)
            // return (
            //    profile.email_verified && profile.email.endsWith('@example.com')
            // )
         }
         return true // Do different verification for other providers that don't have `email_verified`
      },
      async jwt({ token, user, profile, account }) {
         // user hanya ada saat login pertama kali
         if (user) {
            if (account?.provider === 'github') {
               token.avatar = profile?.avatar_url
            }

            if (account?.provider === 'google') {
               token.avatar = profile?.picture
            }

            // const dbUser = await prisma.user.findUnique({
            //    where: { email: user.email! },
            // })

            token.role = (user.role as string | undefined) ?? 'user'
         }
         return token
      },
      async session({ session, token }) {
         session.user.role = (token.role as string | undefined) ?? 'user'
         session.user.avatar =
            (token.avatar as string | undefined) ?? '/default-avatar.png'

         return session
      },
   },
})
