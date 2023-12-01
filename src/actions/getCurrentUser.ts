import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import prisma from '@/libs/prismadb'

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()
  console.log('session desde actions', session)
  if (!session?.user?.email) return null

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  })

  if (!currentUser) return null

  // retornar sin el campo hashedPassword y con los campos createdAt y updatedAt en formato ISOString
  const { hashedPassword, ...userWithoutPassword } = currentUser
  return {
    ...userWithoutPassword,
    createdAt: currentUser.createdAt.toISOString(),
    updatedAt: currentUser.updatedAt.toISOString(),
    emailVerified: currentUser.emailVerified?.toString() ?? null
  }
}
