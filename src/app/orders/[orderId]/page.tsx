import { OrderDetails } from '@/components'
import { getOrderById } from '@/libs/actions/getDataFromDB'

interface IParams {
  orderId?: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  console.log('params --->', params)

  let order = null
  if (params.orderId) order = await getOrderById(params.orderId)

  return (
    <div className="container bg-dark">
      <section className="section bg-secondary">
        {order && <OrderDetails order={order} />}
      </section>
    </div>
  )
}
