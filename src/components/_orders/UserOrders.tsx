import { UserOrdersDataTable } from '@/components'
import { type OrderType } from '@/types'
import { columns } from '@/app/orders/columns'
import Link from 'next/link'

interface UserOrdersProps {
  orders: OrderType[]
}

export default function UserOrders({ orders }: UserOrdersProps) {
  if (!orders.length) {
    return (
      <>
        <h2 className="text-center">No hay ordenes de compra</h2>

        <p className='text-center'>
          <Link href='/' className='text-accent underline'>
            Ve nuestros productos
          </Link>
        </p>
      </>
    )
  }

  return (
    <section className='w-full flex flex-col z-10'>
      <h2 className="text-accent text-center mb-10">Tus ordenes de compra</h2>

      <UserOrdersDataTable columns={columns} data={orders} />
    </section>
  )
}
