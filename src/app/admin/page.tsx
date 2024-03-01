import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { NullData } from '@/components'
import Summary from './Summary'
import { getAllProducts, getOrders, getUsers } from '@/libs/actions/getDataFromDB'

export default async function AdminPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  const products = await getAllProducts()
  const orders = await getOrders()
  const users = await getUsers()

  return (
    <section className='container'>
      <Summary products={products} orders={orders} users={users} />
    </section>
  )
}
