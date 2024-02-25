'use client'

import { OrdersDataTable } from '@/components'
import type { OrderType } from '@/types'
import { columns } from '@/app/admin/orders/columns'

interface OrdersProps {
  orders: OrderType[]
}

export default function Orders({ orders }: OrdersProps) {
  return (
    <section className='w-full flex flex-col z-10'>
      <h2 className="text-accent text-center mb-6">Ordenes de compra</h2>

      <OrdersDataTable columns={columns} data={orders} />
    </section>
  )
}
