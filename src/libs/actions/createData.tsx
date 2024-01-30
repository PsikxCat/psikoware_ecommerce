'use server'

// import { MercadoPagoConfig, Payment } from 'mercadopago'
// import db from '@/libs/prismadb'

import { getCurrentUser } from './getCurrentUser'

// const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })

export async function createOrder(paymentId: number) {
  const currentUser = await getCurrentUser()
  console.log('currentUser desde createData --->', currentUser)
  console.log('paymentId desde createData --->', paymentId)

  // const paymentId = body.data.id
  // const payment = await new Payment(mercadopago).get({ id: paymentId })
  // console.log('payment --->', payment)

  // const orderData = {
  //   user: { connect: { id: currentUser.id } },
  //   paymentId,
  //   amount: payment.transaction_amount,
  //   status: payment.status,
  //   deliveryStatus: 'pending',
  //   products: []
  // }
  // console.log('orderData --->', orderData)

  // if (paymentExists) {
  //   // actualizar data de order en db
  // } else {
  //   // crear order en mongo mediante prisma
  //   const order = await db.order.create({ data: orderData })
  //   console.log('order --->', order)
  // }

  return currentUser
}
