import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import getGraphData from '@/libs/actions/getGraphData'
import { BarGraph, NullData, Summary } from '@/components'
import { getAllProducts, getOrders, getUsers } from '@/libs/actions/getDataFromDB'

export default async function AdminPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  const products = await getAllProducts()
  const orders = await getOrders()
  const users = await getUsers()
  const graphData = await getGraphData()

  return (
    <section className='container flex flex-col mt-4 mb-12'>
      <Summary products={products} orders={orders} users={users} />

      <div className='mt-4 p-4 w-full lg:w-[1024px] rounded-md flex_center_column'>
        <h2 className='text-center text-accent'>Ventas de la semana</h2>
          <BarGraph data={graphData} />
      </div>
    </section>
  )
}
