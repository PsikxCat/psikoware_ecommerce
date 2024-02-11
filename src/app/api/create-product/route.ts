import { NextResponse } from 'next/server'

import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import type { DBProductType, DBProductVariantType, DescriptionType, SpecificationGroupType } from '@/types'
import db from '@/libs/prismadb'

type DBProductTypeWithId = DBProductType & { id: string }

// Función para crear un producto
async function createProduct(data: DBProductType, categoryCount: number) {
  try {
    const { name, brand, category, shortDescription, description, specifications } = data

    // Mapeo de los campos de descripción y especificaciones
    const descriptionMap = description?.map((desc: DescriptionType) => ({ title: desc.title, content: desc.content }))
    const specificationsMap = specifications?.map((specGroup: SpecificationGroupType) =>
      ({
        group: specGroup.group,
        content: specGroup.content.map(cont =>
          ({ title: cont.title, details: cont.details }))
      }))

    const product = {
      productRef: `${category.toUpperCase().slice(0, 4)}${categoryCount + 1}`,
      name,
      brand,
      category,
      shortDescription,
      description: descriptionMap,
      specifications: specificationsMap
    }

    return await db.product.create({ data: product })
  } catch (error) {
    console.error('Error creando elemento producto', error)
    return NextResponse.error()
  }
}

// Función para crear variantes de producto
async function createProductVariants(productVariants: DBProductVariantType[], newProduct: DBProductTypeWithId) {
  try {
    for (const [index, pv] of productVariants.entries()) {
      const variant = {
        productId: newProduct.id,
        variantProductRef: `${newProduct.productRef}-V${index + 1}`,
        price: Number(pv.price),
        inStock: Number(pv.inStock),
        color: pv.color || 'Unicolor',
        colorCode: pv.colorCode || '#000000',
        capacity: pv.capacity,
        images: pv.images
      }
      await db.productVariant.create({ data: variant })
    }
  } catch (error) {
    console.error('Error creando variantes de producto', error)
    return NextResponse.error()
  }
}

// # POST /api/create-product | Crea un nuevo producto en la base de datos
export async function POST(req: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.json({ message: 'Unauthorized', ok: false, status: 401 })
  }

  try {
    const data = await req.json()
    const categoryCount = await db.product.count({ where: { category: data.category } })

    const newProduct = await createProduct(data, categoryCount)

    // Si newProduct tiene el campo id y data.productVariants existe, crear las variantes. Si no, retornar un error y eliminar el producto creado
    if ('id' in newProduct && data.productVariants) {
      try {
        await createProductVariants(data.productVariants, newProduct)
      } catch (variantError) {
        console.error('Error creating product variants:', variantError)
        await db.product.delete({ where: { id: newProduct.id } })
        return NextResponse.error()
      }
    }

    return NextResponse.json({ message: 'Producto creado', ok: true, status: 201 })
  } catch (error) {
    console.error('Error', error)
    return NextResponse.error()
  }
}
