import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import db from '@/libs/prismadb'

export async function POST(req: Request) {
  console.log('entro create-review API')
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ message: 'User not found', ok: false, status: 404 })

  try {
    const data = await req.json()
    const { comment, rating, productId, userId } = data

    if (!comment || !rating || !productId || !userId) return NextResponse.json({ message: 'Completa todos los campos.', ok: false, status: 400 })

    const newReview = await db.review.create({ data })

    return NextResponse.json({ message: 'Review creada', ok: true, status: 201, data: newReview })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.error()
  }
}
