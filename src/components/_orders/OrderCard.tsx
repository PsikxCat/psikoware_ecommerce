import type { OrderProductType } from '@/types'
import { formatPrice, truncate } from '@/utils'
import Image from 'next/image'

interface OrderCardProps {
  product: OrderProductType
}
export default function OrderCard({ product }: OrderCardProps) {
  return (
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
  )
}
