'use server'

import db from '@/libs/prismadb'

interface Response {
  response: string
  message: string
}

export async function updateStock(id: string, stock: number): Promise<Response> {
  if (stock < 0 || stock > 500 || !stock || typeof stock !== 'number') {
    return { response: 'error', message: 'Ingresa un valor numerico entre 0 y 500' }
  }

  try {
    await db.productVariant.update({
      where: { id },
      data: { inStock: stock }
    })

    return { response: 'ok', message: 'Stock actualizado' }
  } catch (error) {
    console.error(error)
    return { response: 'error', message: 'Ocurrio un error al actualizar el stock' }
  }
}

export async function deleteVariantProduct(id: string): Promise<Response> {
  try {
    await db.productVariant.delete({
      where: { id }
    })

    return { response: 'ok', message: 'Variante eliminada' }
  } catch (error) {
    console.error(error)
    return { response: 'error', message: 'Ocurrio un error al eliminar la variante' }
  }
}

export async function deleteProduct(id: string): Promise<Response> {
  try {
    await db.product.delete({
      where: { id }
    })

    return { response: 'ok', message: 'Producto eliminado' }
  } catch (error) {
    console.error(error)
    return { response: 'error', message: 'Ocurrio un error al eliminar el producto' }
  }
}
