'use client'

import { useContext } from 'react'
import Link from 'next/link'

import { MdArrowBack } from 'react-icons/md'
import { GlobalContext, type GlobalContextType } from '@/context'
import { CartItem } from '@/components'

export default function ProductsSection() {
  const {
    cartItems,
    handleRemoveItemFromCart,
    handleItemCartQtyDecrease,
    handleItemCartQtyIncrease
  } = useContext(GlobalContext as React.Context<GlobalContextType>)

  console.log('items esn carro: ', cartItems)

  return (
    <>
      {
        cartItems.length > 0
          ? (
          <section className='flex flex-col gap-2 px-1 z-10'>
            {cartItems.map((item) => (
              <CartItem
                key={item.productVariants.id}
                item={item}
                handleRemoveItemFromCart={handleRemoveItemFromCart}
                handleItemCartQtyDecrease={handleItemCartQtyDecrease}
                handleItemCartQtyIncrease={handleItemCartQtyIncrease}
              />
            ))}
          </section>
            )
          : (
          <section className='flex_center_column py-6'>
            <h2>No hay productos en tu carrito</h2>

            <Link
              className='text-accent text-sm tracking-wide uppercase mt-2 flex_center gap-1'
              href='/'
            >
              <MdArrowBack />
              <span>Ir a la tienda</span>
            </Link>
          </section>
            )
      }
    </>
  )
}
