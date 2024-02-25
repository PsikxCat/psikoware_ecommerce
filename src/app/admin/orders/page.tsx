import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { getOrders } from '@/libs/actions/getDataFromDB'
import { NullData, Orders } from '@/components'

export default async function OrdersPage() {
  const currentUser = await getCurrentUser()
  const orders = await getOrders()

  // console.log(orders)

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  return (
    <div className='p-8'>
      <section className='section'>
        <Orders orders={orders}/>
      </section>
    </div>
  )
}
