'use server'

import { type CartProductType } from '@/types'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { redirect } from 'next/navigation'

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })

export default async function createPayment(cartTotalAmount: number, cartItems: CartProductType[]) {
  if (cartTotalAmount === 0) return

  const preference = await new Preference(mercadopago).create({
    body: {
      items: cartItems.map((item) => ({
        id: item.productVariants.id,
        title: `${item.name} ${item.productVariants.capacity} ${item.productVariants.color}`,
        picture_url: item.productVariants.images[0],
        category_id: item.category,
        quantity: item.productVariants.quantity,
        unit_price: item.productVariants.price,
        currency_id: 'COP'
      })),
      payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: 'lalo@landa.com',
        phone: {
          area_code: '52',
          number: '5549737300'
        },
        address: {
          zip_code: '03940',
          street_name: 'Insurgentes Sur',
          street_number: 1602
        }
      },
      back_urls: {
        success: 'http://localhost:3000',
        failure: 'http://localhost:3000'
      },
      auto_return: 'approved',
      external_reference: 'ABCD1234'
    }
  })

  redirect(preference.sandbox_init_point!)
}
