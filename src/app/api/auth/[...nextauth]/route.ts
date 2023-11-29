import NextAuth, { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import db from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const userFound = await db.user.findUnique({
          where: {
            email: credentials?.email
          }
        })
        if (!userFound) throw new Error('Usuario o contraseña incorrecta')

        const credentialsPassword = credentials?.password ?? ''
        const passwordMatch = await bcrypt.compare(credentialsPassword, userFound.hashedPassword as string)
        if (!passwordMatch) throw new Error('Usuario o contraseña incorrecta')

        return userFound
      }
    })
  ],
  pages: {
    signIn: '/auth/login'
  },
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }
