import { type NextRequest } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import db from '@/libs/prismadb'

const mercadopago = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN! })

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const paymentId = body.data.id
    const payment = await new Payment(mercadopago).get({ id: paymentId })

    const currentUserId = payment?.external_reference

    const products = payment.additional_info!.items?.map((item) => {
      return {
        id: item.id,
        unitPrice: Number(item.unit_price),
        name: item.title,
        category: item.category_id as string,
        quantity: Number(item.quantity),
        selectedImg: item.picture_url as string
      }
    })

    const orderData = {
      user: { connect: { id: currentUserId } },
      paymentId,
      amount: Number(payment.transaction_amount),
      currency: payment.currency_id as string,
      status: payment.status as string, // ! este tipo debería ser un enum !!!!!!!!!!!!!!!!!!!!!!!!!!! TODO
      deliveryStatus: 'pending', // ! este tipo debería ser un enum !!!!!!!!!!!!!!!!!!!!!!!!!!! TODO
      products
    }

    await db.order.create({ data: orderData })

    return Response.json({ message: 'Payment created', ok: true, status: 201 })
  } catch (error) {
    console.error('Error al procesar el pago', error)
    return Response.json({ message: error, ok: false, status: 500 })
  }
}

// request para test
// export async function GET() {
//   try {
//     const currentUser = await getCurrentUser()
//     console.log('currentUser --->', currentUser)

//     return Response.json({ message: currentUser, ok: true })
//   } catch (error) {
//     return Response.json({ message: error, ok: false })
//   }
// }
