import { type NextRequest, NextResponse } from 'next/server'

import { MercadoPagoConfig, Payment } from 'mercadopago'

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })

export async function POST(req: NextRequest) {
  const body = await req.json()
  console.log('body --->', body)

  const paymentId = body.data.id
  console.log('paymentId --->', paymentId)
  const payment = await new Payment(mercadopago).get({ id: paymentId })
  console.log('payment --->', payment)

  return NextResponse.json({ message: 'Payment created', ok: true })
}
