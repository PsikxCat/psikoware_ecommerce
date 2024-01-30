'use client'

import { useContext } from 'react'
import { GlobalContext, type GlobalContextType } from '@/context'
import { formatPrice } from '../../utils/index'

export default function ShoppedItem() {
  const { cartItems } = useContext(GlobalContext as React.Context<GlobalContextType>)

  return (
    <section className='flex flex-col gap-2 px-1 z-10'>
      {cartItems?.map((item: any) => (
        <section key={item.productVariants.id} className='grid grid-cols-5 max-[450px]:grid-cols-3 max-[700px]:grid-cols-4 text-md px-3'>
          <span className='justify-self-start col-span-2 max-[450px]:col-span-1'>
            {item.name} {item.productVariants.capacity ? item.productVariants.capacity : ''} {item.productVariants.color}
          </span>

          <span className='justify-self-center max-[700px]:hidden'>
            {formatPrice(item.productVariants.price)}
          </span>

          <span className='justify-self-center'>{item.productVariants.quantity}</span>

          <span className='justify-self-end'>
            {formatPrice(item.productVariants.price * item.productVariants.quantity)}
          </span>
        </section>
      ))}
    </section>
  )
}
