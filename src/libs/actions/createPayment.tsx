'use server'

import { type UIProductType } from '@/types'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { redirect } from 'next/navigation'
import { getCurrentUser } from './getCurrentUser'

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })

export default async function createPayment(cartTotalAmount: number, cartItems: UIProductType[]) {
  const currentUser = await getCurrentUser()

  if (!currentUser) redirect('/auth/login')
  if (cartTotalAmount <= 0) return null

  const currentUserId = currentUser.id

  const preference = await new Preference(mercadopago).create({
    body: {
      items: cartItems.map((item) => ({
        id: item.productVariants.id,
        unit_price: item.productVariants.price,
        title: `${item.name} ${item.productVariants.capacity} ${item.productVariants.color}`,
        category_id: item.category,
        quantity: item.productVariants.quantity,
        picture_url: item.productVariants.images[0]
      })),
      payer: {
        name: 'Federico',
        surname: 'ElNiche',
        email: 'test@test.com',
        phone: {
          area_code: '57',
          number: '3118176076'
        },
        address: {
          zip_code: '110940',
          street_name: 'Insurgentes Sur',
          street_number: 1602
        }
      },
      back_urls: {
        success: 'http://localhost:3000/payment/success',
        failure: 'http://localhost:3000/payment/failure'
      },
      auto_return: 'approved',
      external_reference: currentUserId.toString()
    }
  })

  if (!preference.sandbox_init_point) {
    console.error('No se pudo crear el pago')
    return null
  }

  redirect(preference.sandbox_init_point)
}
