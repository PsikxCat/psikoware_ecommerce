import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import type { ReviewType } from '@/types'
import { NextResponse } from 'next/server'
import db from '@/libs/prismadb'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { comment, rating, product, userId } = body

  // ! mejorar sintaxis para legibilidad
  const deliveredOrder = currentUser.orders.some((order) => order.products.find((prod) => prod.id === product.id) && order.deliveryStatus === 'delivered')

  const userReview = product?.reviews.find((review: ReviewType) => review.userId === currentUser.id)

  // if (userReview && !deliveredOrder) {
  if (!deliveredOrder || userReview) {
    return NextResponse.error()
  }

  const review = await db.review.create({
    data: {
      comment,
      rating,
      userId,
      productId: product.id
    }
  })

  return NextResponse.json(review)
}
