import type { OrderType } from '@/types'
import dayjs from 'dayjs'
import { formatPrice, truncate } from '@/utils'
import Image from 'next/image'

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
          <article key={product.id}
            className='box_shadow text-muted text-center text-sm col-span-1 w-96 h-32 max-[420px]:w-auto rounded-md p-2 bg-stone-900 group z-10'
          >
            <section className="flex_center gap-2 p-1 w-full h-full border border-accent rounded-md">
              {/* imagen */}
              <div className='relative aspect-square w-[30%] rounded-md overflow-hidden bg-stone-950 rounded-t-md max-[420px]:hidden'>
                <Image
                  className='w-full h-full object-contain'
                  src={product.selectedImg}
                  alt={product.name}
                  fill
                  sizes='(max-width: 768px) 100vw, 400px'
                />
              </div>

              <div className='flex flex-1 flex-col items-start px-3 '>
                <h4 className='uppercase tracking-tight whitespace-nowrap overflow-hidden text-ellipsis'>
                  {truncate(product.name, 30)}
                </h4>

                <div className='tracking-widest'>
                  Precio unidad: {formatPrice(product.unitPrice)}
                </div>

                <div className='tracking-widest'>
                  Cantidad: {product.quantity}
                </div>

                <h5 className='font-bold tracking-widest'>
                  Total: {formatPrice(product.unitPrice * product.quantity)}
                </h5>
              </div>
            </section>
          </article>
        ))}
      </div>

    </section>
  )
}
