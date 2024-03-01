'use client'

import type { ProductType, OrderType, UserType } from '@/types'
import { formatPrice } from '@/utils'
import { useEffect, useState } from 'react'

interface SummaryProps {
  products: ProductType[]
  orders: OrderType[]
  users: UserType[]
}

type SummaryDataType = Record<string, {
  label: string
  digit: number
}>

export default function Summary({ products, orders, users }: SummaryProps) {
  // console.log('products --->', products)
  // console.log('orders --->', orders)
  // console.log('users --->', users)
  const [summaryData, setsummaryData] = useState<SummaryDataType>({
    sale: {
      label: 'Total ventas',
      digit: 0
    },
    products: {
      label: 'Total productos',
      digit: 0
    },
    orders: {
      label: 'Total ordenes de compra',
      digit: 0
    },
    paidOrders: {
      label: 'Ordenes pagadas',
      digit: 0
    },
    unpaidOrders: {
      label: 'Ordenes pendientes',
      digit: 0
    },
    users: {
      label: 'Total usuarios',
      digit: 0
    }
  })

  useEffect(() => {
    setsummaryData((prev) => {
      const temporalData = { ...prev }

      const totalSale = orders.reduce((acc, order) => {
        if (order.status === 'approved') return acc + order.amount
        else return acc
      }, 0)

      const paidOrders = orders.filter((order) => order.status === 'approved')

      const unpaidOrders = orders.filter((order) => order.status === 'in_process')

      temporalData.sale.digit = totalSale
      temporalData.products.digit = products.length
      temporalData.orders.digit = orders.length
      temporalData.paidOrders.digit = paidOrders.length
      temporalData.unpaidOrders.digit = unpaidOrders.length
      temporalData.users.digit = users.length

      return temporalData
    })
  }, [orders, products, users])

  const summaryKeys = Object.keys(summaryData)

  return (
    <main className='section'>
      <h1 className='text-accent text-center mb-8'>Estadisticas</h1>
      {/* <section className='border grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
        {summaryKeys.map((key) => {
          const { label, digit } = summaryData[key]

          return (
            <div key={key} className='border p-3'>
              <h3 className='text-accent'>{label}</h3>
              <p>{digit}</p>
            </div>
          )
        })}
      </section> */}
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-50vh max-w-[900px] mx-auto overflow-y-auto'>
        {summaryKeys?.map((key) => (
          <div key={key} className='rounded-xl border border-secondary p-4 flex flex-col items-center gap-2 transition'>
            <p className='text-xl md:text-4xl font-bold'>
              {summaryData[key].label === 'Total ventas' ? <>{formatPrice(summaryData[key].digit)}</> : <>{summaryData[key].digit}</>}
            </p>
            <h4 className='text-gray-500 text-center'>{summaryData[key].label}</h4>
          </div>
        ))}
      </section>
    </main>
  )
}
