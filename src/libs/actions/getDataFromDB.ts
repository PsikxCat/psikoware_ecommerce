import db from '@/libs/prismadb'
import type { ProductType } from '@/types'

export async function getAllProducts(): Promise<ProductType[]> {
  try {
    const products = await db.product.findMany({
      include: {
        productVariants: true,
        reviews: true
      }
    })

    return products
  } catch (error) {
    console.error('Error al obtener todos los productos:', error)
    throw new Error('Ocurrió un error al obtener todos los productos.')
  }
}

export async function getCheapestProducts(): Promise<ProductType[]> {
  try {
    const allProducts = await getAllProducts()

    if (!allProducts.length) {
      throw new Error('No se encontraron productos.')
    }

    // obtener los diez productos mas economicos en su variante[0]
    const cheapestProducts = allProducts
      .sort((a, b) => a.productVariants[0].price - b.productVariants[0].price)
      .slice(0, 12)

    return cheapestProducts
  } catch (error) {
    console.error('Error al obtener los productos más baratos:', error)
    throw new Error('Ocurrió un error al obtener los productos más baratos.')
  }
}

export async function getProductById(id: string): Promise<ProductType> {
  try {
    const product = await db.product.findUnique({
      where: { id },
      include: {
        productVariants: true,
        reviews: true
      }
    })

    if (!product) {
      throw new Error(`No se encontró un producto con el ID ${id}`)
    }

    return product
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error)
    throw new Error(`Ocurrió un error al obtener el producto con ID ${id}.`)
  }
}

export async function getProductsByCategory(category: string): Promise<ProductType[]> {
  try {
    const products = await db.product.findMany({
      where: { category },
      include: {
        productVariants: true,
        reviews: true
      }
    })

    return products
  } catch (error) {
    console.error(`Error al obtener los productos de la categoría ${category}:`, error)
    throw new Error(`Ocurrió un error al obtener los productos de la categoría ${category}.`)
  }
}

export async function getProductsBySearch(search: string): Promise<ProductType[]> {
  try {
    const products = await db.product.findMany({
      where: { name: { contains: search } },
      include: {
        productVariants: true,
        reviews: true
      }
    })

    return products
  } catch (error) {
    console.error(`Error al obtener los productos de la búsqueda ${search}:`, error)
    throw new Error(`Ocurrió un error al obtener los productos de la búsqueda ${search}.`)
  }
}

export default async function getOrders() { // falta tipar
  try {
    const orders = await db.order.findMany({
      include: { user: true },
      orderBy: { createDateTime: 'desc' }
    })

    return orders
  } catch (error) {
    console.error('Error al obtener los pedidos:', error)
    throw new Error('Ocurrió un error al obtener los pedidos.')
  }
}

export async function getOrdersByUser(userId: string) { // falta tipar
  try {
    const orders = await db.order.findMany({
      where: { userId },
      orderBy: { createDateTime: 'desc' }
    })

    return orders
  } catch (error) {
    console.error(`Error al obtener los pedidos del usuario ${userId}:`, error)
    throw new Error(`Ocurrió un error al obtener los pedidos del usuario ${userId}.`)
  }
}
