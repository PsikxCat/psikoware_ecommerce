import { type NextRequest } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import db from '@/libs/prismadb'

import { getCurrentUser } from '@/libs/actions/getCurrentUser'

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('body --->', body)

  const paymentId = body.data.id
  const payment = await new Payment(mercadopago).get({ id: paymentId })
  console.log('payment --->', payment)

  const currentUserId = payment?.external_reference
  console.log('currentUserId --->', currentUserId)

  // const products = payment.additional_info!.items.map((item: any) => {

  const orderData = {
    user: { connect: { id: currentUserId } },
    paymentId,
    amount: Number(payment.transaction_amount),
    currency: payment.currency_id as string,
    status: payment.status as string,
    deliveryStatus: 'pending',
    products: payment.additional_info!.items
  }
  console.log('orderData --->', orderData)

  // if (payment) {
  //   // actualizar data de order en db
  // } else {
  //   // crear order en mongo mediante prisma
  //   const order = await db.order.create({ data: orderData })
  //   console.log('order --->', order)
  // }

  return Response.json({ message: 'Payment created', ok: true, status: 201 })
}

// request para tests
export async function GET() {
  try {
    const currentUser = await getCurrentUser()
    console.log('currentUser --->', currentUser)

    return Response.json({ message: currentUser, ok: true })
  } catch (error) {
    return Response.json({ message: error, ok: false })
  }
}
