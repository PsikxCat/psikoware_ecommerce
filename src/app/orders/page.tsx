import { getOrdersByUser } from '@/libs/actions/getDataFromDB'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { NullData, UserOrders } from '@/components'

export default async function OrdersPage() {
  const currentUser = await getCurrentUser()

  // if (!currentUser || currentUser?.role !== 'ADMIN') {
  if (!currentUser) {
    return <NullData title="Accede a tu cuenta para ver esta información" />
  }

  const orders = await getOrdersByUser(currentUser.id)

  return (
    <div className="p-8">
      <section className="section">
        <UserOrders orders={orders} />
      </section>
    </div>
  )
}
