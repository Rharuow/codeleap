import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  providers: [
    Providers.Credentials({
      id: "domain-username",
      name: "domain-username",
      authorize(credentials) {
        const user = { name: credentials.username }
  
        if (user) {
          return user
        } else {
          return null
        }
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
      },
    })
  ]
})