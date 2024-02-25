'use server'

import db from '@/libs/prismadb'

interface Response {
  ok?: true
  error?: true
  message: string
}

export async function updateStock(id: string, stock: number): Promise<Response> {
  if (stock < 0 || stock > 500 || !stock || typeof stock !== 'number') {
    return { error: true, message: 'Ingresa un valor numerico entre 0 y 500' }
  }

  try {
    await db.productVariant.update({
      where: { id },
      data: { inStock: stock }
    })

    return { ok: true, message: 'Stock actualizado' }
  } catch (error) {
    console.error(error)
    return { error: true, message: 'Ocurrio un error al actualizar el stock' }
  }
}

export async function deleteVariantProduct(id: string): Promise<Response> {
  try {
    await db.productVariant.delete({
      where: { id }
    })

    return { ok: true, message: 'Variante eliminada' }
  } catch (error) {
    console.error(error)
    return { error: true, message: 'Ocurrio un error al eliminar la variante' }
  }
}

export async function deleteProduct(id: string): Promise<Response> {
  try {
    await db.product.delete({
      where: { id }
    })

    return { ok: true, message: 'Producto eliminado' }
  } catch (error) {
    console.error(error)
    return { error: true, message: 'Ocurrio un error al eliminar el producto' }
  }
}

export async function deleteOrder(id: string): Promise<Response> {
  try {
    await db.order.delete({
      where: { id }
    })

    return { ok: true, message: 'Orden eliminada' }
  } catch (error) {
    console.error(error)
    return { error: true, message: 'Ocurrio un error al eliminar la orden' }
  }
}

export async function updateShipment(id: string, status: string): Promise<Response> {
  try {
    await db.order.update({
      where: { id },
      data: { deliveryStatus: status }
    })

    return { ok: true, message: 'Estado de envio actualizado' }
  } catch (error) {
    console.error(error)
    return { error: true, message: 'Ocurrio un error al actualizar el estado de envio' }
  }
}
