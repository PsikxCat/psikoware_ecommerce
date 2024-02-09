import { NextResponse } from 'next/server'
import db from '@/libs/prismadb'

import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import type { ProductDatabaseType } from '@/types'

export async function POST(req: Request) {
  const currentUser = await getCurrentUser()
  console.log('currentUser --->', currentUser)

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized', ok: false, status: 401 })
  }
  try {
    const data = await req.json()
    const { id, name, brand, category, shortDescription, description, specifications, productVariants } = data

    console.log('description --->', description)
    console.log('specifications --->', specifications)
    console.log('productVariants --->', productVariants)

    const product: ProductDatabaseType = {
      productRef: id,
      name,
      brand,
      category,
      shortDescription,
      description: description?.map(d => ({ title: d.title, content: d.content })),
      specifications: specifications?.map(s => ({ group: s.group, content: s.content.map(c => ({ title: c.title, details: c.details })) }))
      // productVariants: productVariants?.map(pv => ({
      //   id: pv.id,
      //   price: Number(pv.price),
      //   inStock: Number(pv.inStock),
      //   color: pv.color,
      //   colorCode: pv.colorCode,
      //   capacity: pv.capacity,
      //   images: pv.images
      // }))
    }
    console.log('product --->', product)

    const newProduct = await db.product.create({ data: product })
    console.log('newProduct --->', newProduct)

    if (productVariants) {
      for (const pv of productVariants) {
        const variant = {
          // id: pv.id,
          productId: newProduct.id,
          variantProductRef: pv.id,
          price: Number(pv.price),
          inStock: Number(pv.inStock),
          color: pv.color,
          colorCode: pv.colorCode,
          capacity: pv.capacity,
          images: pv.images
        }
        await db.productVariant.create({ data: variant })
      }
    }

    return NextResponse.json({ message: 'pendiente', ok: true, status: 200 })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.error()
  }
}
