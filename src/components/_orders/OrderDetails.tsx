import dayjs from 'dayjs'

import { type OrderType } from '@/types'
import { OrderCard } from '@/components'
import { formatPrice } from '@/utils'

interface OrderDetailsProps {
  order: OrderType
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <section className='text-dark sm:mx-[10vw]'>
      <h2>Detalles del pedido</h2>

      <div className='flex flex-col mb-6 gap-1 text-xl'>
        <p><span className='font-bold'>ID:</span> {order.id}</p>
        <p><span className='font-bold'>Usuario:</span>  {order.user.name}</p>
        <p><span className='font-bold'>Fecha:</span> {dayjs(order.createDateTime).format('DD/MM/YYYY')}</p>

        <p className='font-bold'>
          Estado de pago:&nbsp;
          <span className={`text-center text-[14px] py-1 px-3 rounded-md lowercase ${order.status === 'approved' ? 'text-lime-800 bg-lime-500' : (order.status === 'in_process' ? 'text-yellow-800 bg-yellow-500' : 'text-pink-800 bg-pink-300')}`}>
          {order.status === 'approved' ? 'Aprobado' : (order.status === 'rejected' ? 'Rechazado' : (order.status === 'in_process' ? 'Pendiente' : order.status))}
          </span>
        </p>

        <p className='font-bold'>
          Estado de envío:&nbsp;
          <span className={`text-center text-[14px] py-1 px-3 rounded-md lowercase ${order.deliveryStatus === 'dispatched' ? 'text-yellow-800 bg-yellow-500' : (order.deliveryStatus === 'completed' ? 'text-lime-800 bg-lime-500' : 'text-pink-800 bg-pink-300')}`}>
            {order.deliveryStatus === 'dispatched' ? 'despachada' : (order.deliveryStatus === 'completed' ? 'completada' : 'pendiente')}
          </span>
        </p>

        <p className='font-bold text-2xl'>Total: {formatPrice(order.amount)}</p>
      </div>

      <h2 className='mb-6'>Productos</h2>

      <div className='flex flex-col gap-2 lg:flex-row'>
        {order.products.map((product) => (
          <OrderCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  )
}
