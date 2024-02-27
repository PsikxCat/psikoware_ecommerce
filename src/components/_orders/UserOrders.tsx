import { UserOrdersDataTable } from '@/components'
import { type OrderType } from '@/types'
import { columns } from '@/app/orders/columns'

interface UserOrdersProps {
  orders: OrderType[]
}

export default function UserOrders({ orders }: UserOrdersProps) {
  return (
    <section className='w-full flex flex-col z-10'>
      <h2 className="text-accent text-center mb-10">Tus ordenes de compra</h2>

      <UserOrdersDataTable columns={columns} data={orders} />
    </section>
  )
}
