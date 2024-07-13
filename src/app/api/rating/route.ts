import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { type ReviewType } from '@/types'
import db from '@/libs/prismadb'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) return NextResponse.json({ message: 'User not found', ok: false, status: 404 })

  try {
    const data = await req.json()
    const { comment, rating, product, userId } = data
    if (!comment || !rating || !product || !userId) return NextResponse.json({ message: 'Missing fields', ok: false, status: 400 })

    const completedOrder = currentUser?.orders.some((order) => order.products.find((p) =>
      p.id === product.id) && (order.status === 'approved' && order.deliveryStatus === 'completed'))
    if (!completedOrder) return NextResponse.json({ message: 'User has not completed an order with this product', ok: false, status: 400 })

    const userReview = product?.reviews.find((review: ReviewType) => review.userId === userId)
    if (userReview) return NextResponse.json({ message: 'User already reviewed this product', ok: false, status: 400 })

    const newReview = await db.review.create({
      data: {
        comment,
        rating,
        userId,
        productId: product.id
      }
    })

    return NextResponse.json({ message: 'Review creada', ok: true, status: 201, data: newReview })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.error()
  }
}
