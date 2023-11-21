import { NextResponse } from 'next/server'
import db from '@/libs/prismadb'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    const validEmail = email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    if (!validEmail) {
      return NextResponse.json({ message: 'Correo invalido', ok: false })
    }

    const emailFound = await db.user.findUnique({
      where: { email }
    })
    if (emailFound) {
      return NextResponse.json({ message: 'Este correo ya esta registrado', ok: false })
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashedPassword: hash
      }
    })
    // console.log(newUser)
    if (newUser) {
      const { hashedPassword, ...userWithoutPassword } = newUser
      return NextResponse.json({ message: 'Usuario registrado', ok: true, user: userWithoutPassword })
    }
  } catch (error: string | any) {
    throw new Error(error.message)
  }
}
