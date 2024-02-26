import Link from 'next/link'

import { getOrdersByUser } from '@/libs/actions/getDataFromDB'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'

export default async function OrdersPage() {
  const currentUser = await getCurrentUser()
  console.log('Usuario actual desde OrdersPage --->', currentUser)

  if (!currentUser) {
    return <div>Usuario no autenticado</div>
  }

  const orders = await getOrdersByUser(currentUser.id)
  console.log('Pedidos del usuario actual desde OrdersPage --->', orders)

  return (
    <div className='section flex_cente_column gap-5'>
      {orders?.map((order) => (
        <div key={order.id} className='border rounded-md p-6'>
          <Link href={`/orders/${order.id}`} >
            <h2>{order.id}</h2>
            <p>{order.status}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}
