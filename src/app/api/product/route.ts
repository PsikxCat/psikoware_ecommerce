import { NextResponse } from 'next/server'

import { type ProductVariantsType } from '@/types'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  console.log('currentUser --->', currentUser)

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized', ok: false, status: 401 })
  }
  try {
    const data = await req.json()
    const { name, brand, category, shortDescription, description, specifications, productVariants } = data

    const product = {
      name,
      brand,
      category,
      shortDescription,
      description,
      specifications,
      productVariants: productVariants as ProductVariantsType[]
    }
    console.log('product --->', product)

    return NextResponse.json({ message: product, ok: true, status: 200 })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.error()
  }
}
