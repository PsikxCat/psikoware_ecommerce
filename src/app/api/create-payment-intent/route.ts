// import Stripe from 'stripe'
// import db from '@/libs/prismadb'
// import { NextResponse } from 'next/server'

// import { type CartProductType } from '@/types'
// import { getCurrentUser } from '@/actions/getCurrentUser'

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2023-10-16'
// })

// const calculateOrderAmount = (items: CartProductType[]) => {
//   const totalPrice = items.reduce((acc, item) => {
//     return acc + item.productVariants.price * item.productVariants.quantity
//   }, 0)

//   console.log(totalPrice)
//   return totalPrice
// }

// export async function POST(req: Request) {
//   const currentUser = await getCurrentUser()
//   console.log(currentUser)

//   if (!currentUser) return NextResponse.json({ message: 'No estas logueado', ok: false })

//   const body = await req.json()
//   const { items, paymentIntentId } = body

//   const orderAmount = calculateOrderAmount(items) * 100
//   const orderData = {
//     user: { connect: { id: currentUser.id } },
//     paymentIntentId,
//     amount: orderAmount,
//     status: 'pending',
//     deliveryStatus: 'pending',
//     products: items
//   }

//   if (paymentIntentId) {
//     // actualizar order
//   } else {
//     // crear payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: orderAmount,
//       currency: 'cop',
//       automatic_payment_methods: { enabled: true }
//     })
//     // crear order
//     const newOrder = await db.order.create({
//       data: orderData
//     })
//   }
// }
