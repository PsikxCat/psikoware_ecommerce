import NextAuth, { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import bcrypt from 'bcrypt'

import db from '@/libs/prismadb'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
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
        if (userFound && !userFound.hashedPassword) throw new Error('Credenciales no validas, intenta con Google o GitHub')

        const credentialsPassword = credentials?.password ?? ''
        const passwordMatch = await bcrypt.compare(credentialsPassword, userFound.hashedPassword as string)
        if (!passwordMatch) throw new Error('Usuario o contraseña incorrecta')

        return userFound
      }
    })
  ],
  callbacks: {
    async signIn(user) {
      const userEmail = user?.user?.email
      const userName = user.user.name!

      if (!userEmail) {
        throw new Error('Correo electrónico no disponible en la información del usuario.')
      }

      const existingUser = await db.user.findUnique({
        where: {
          email: userEmail
        }
      })

      if (!existingUser) {
        await db.user.create({
          data: {
            email: userEmail,
            name: userName,
            image: user?.user?.image
          }
        })
      }

      return true
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login'
  }
}

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }
