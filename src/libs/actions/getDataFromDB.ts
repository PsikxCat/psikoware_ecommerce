import db from '@/libs/prismadb'
import type { ProductType } from '@/types'

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const products = await db.product.findMany()
    const variants = await db.productVariant.findMany()
    const reviews = await db.review.findMany()

    const data = products.map((product) => {
      const productVariants = variants.filter((variant) => variant.productId === product.id)
      const productReviews = reviews.filter((review) => review.productId === product.id)

      return {
        ...product,
        productVariants,
        reviews: productReviews
      }
    })

    return data
  } catch (error) {
    console.error('Error al obtener todos los productos:', error)
    throw new Error('Ocurrió un error al obtener todos los productos.')
  }
}

export async function getProductById(id: string): Promise<ProductType> {
  try {
    const product = await db.product.findUnique({ where: { id } })

    if (!product) {
      throw new Error(`No se encontró un producto con el ID ${id}`)
    }

    const productVariants = await db.productVariant.findMany({ where: { productId: id } })
    const reviews = await db.review.findMany({ where: { productId: id } })

    return {
      ...product,
      productVariants,
      reviews: reviews || []
    }
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error)
    throw new Error(`Ocurrió un error al obtener el producto con ID ${id}.`)
  }
}
