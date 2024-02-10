import type { UIProductType } from '@/types'
import { formatPrice, truncate } from '@/utils'
import Link from 'next/link'
import { MdClose } from 'react-icons/md'

import { SetQuantity } from '@/components'

interface CartItemProps {
  item: UIProductType
  handleRemoveItemFromCart: (id: string) => void
  handleItemCartQtyDecrease: (item: UIProductType) => void
  handleItemCartQtyIncrease: (item: UIProductType) => void
}

export default function CartItem(
  { item, handleRemoveItemFromCart, handleItemCartQtyDecrease, handleItemCartQtyIncrease }: CartItemProps
) {
  return (
    <section
      className='relative bg-secondary rounded-md text-dark grid max-[450px]:grid-cols-3 max-[700px]:grid-cols-4 grid-cols-5 px-2 min-h-[100px]'
    >
      {/* imagen, nombre y variante */}
      <Link className='flex items-center max-[450px]:col-span-1 col-span-2 gap-2 text-[14px]'
        href={`/products/${item.id}`}
      >
        <img
          className='w-16 h-16 max-[450px]:hidden object-contain'
          src={item.productVariants.images[0]}
          alt={item.name}
        />

        <div className='flex flex-col overflow-x-hidden'>
          <span className='leading-4 line-clamp-2 font-bold'>
            {truncate(item.name, 35)}
          </span>
          <span className='capitalize line-clamp-1'>
            {item.productVariants.color} {item.productVariants.capacity}
          </span>
        </div>
      </Link>

      {/* valor unitario */}
      <span className='justify-self-center flex_center max-[700px]:hidden pt-2'>
        {formatPrice(item.productVariants.price)}
      </span>

      {/* cantidad */}
      <span className='justify-self-center flex_center pt-2'>
        <SetQuantity
          cartCounter
          cartProduct={item}
          customBtnClass='h-6 w-6 rounded-full bg-dark text-secondary'
          handleDecrease={() => { handleItemCartQtyDecrease(item) }}
          handleIncrease={() => { handleItemCartQtyIncrease(item) }}
        />
      </span>

      {/* valor total */}
      <span className='justify-self-end flex_center font-bold pt-2 pr-2 max-[450px]:pr-0'>
        {formatPrice(item.productVariants.price * item.productVariants.quantity)}
      </span>

      {/* boton clear item */}
      <button className='absolute top-[5px] right-[5px] flex_center text-dark'
        onClick={() => { handleRemoveItemFromCart(item.productVariants.id) }}
      >
        <MdClose />
      </button>
    </section>
  )
}
