'use client'

import { useContext } from 'react'
import { MdArrowBack } from 'react-icons/md'
import Link from 'next/link'

import { Button, CartItem } from '@/components'
import { formatPrice } from '@/utils'
import { GlobalContext, type GlobalContextType } from '@/context'

export default function UserCart() {
  const {
    cartItems,
    handleRemoveItemFromCart,
    handleItemCartQtyDecrease,
    handleItemCartQtyIncrease,
    handleClearCart
  } = useContext(GlobalContext as React.Context<GlobalContextType>)

  // carro sin items
  if (!cartItems.length) {
    return (
      <section className='flex_center_column'>
        <h2>No hay productos en el carrito</h2>

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

  // carro con items
  return (
    <section className='flex_center_column lg:w-[90%] mx-auto'>
      {/* titulo */}
      <h2 className='text-accent px-2 w-full'>Carrito de compras</h2>

      {/* carrito */}
      <div className='flex flex-col gap-2 w-full mt-6'>
        {/* titulos */}
        <section className='grid grid-cols-5 max-[450px]:grid-cols-3 max-[700px]:grid-cols-4 text-xs uppercase px-3 border-b border-secondary pb-1'>
          <span className='justify-self-start col-span-2 max-[450px]:col-span-1'>Producto</span>
          <span className='justify-self-center max-[700px]:hidden'>Precio</span>
          <span className='justify-self-center'>Cantidad</span>
          <span className='justify-self-end'>Total</span>
        </section>

        {/* productos */}
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

        {/* clear y subtotal */}
        <section className='flex justify-between max-[450px]:flex-col border-t border-secondary pt-2 px-2 z-10'>
          {/* clear */}
          <div className='w-[110px] mb-6'>
            <Button
              label='Vaciar carrito'
              small
              accent
              onClick={handleClearCart}
            />
          </div>

          {/* subtotal y checkout */}
          <div className='flex flex-col gap-1 w-[240px]'>
            {/* subtotal */}
            <div className='flex justify-between font-bold text-xl'>
              <span>Subtotal:</span>
              <span>
                {formatPrice(cartItems.reduce((acc, item) =>
                  acc + item.productVariants.price * item.productVariants.quantity, 0))}
              </span>
            </div>

            <p className='text-xs text-muted mb-2'>El precio del envio se calcula al finalizar la compra.</p>

            {/* checkout */}
            <div className='flex flex-col gap-2'>
              <Button
                label='Finalizar compra'
                accent
                onClick={() => { console.log('finalizar compra') }}
              />

              <Link
                className='text-muted text-sm tracking-wide flex_center gap-1 hover:text-secondary transition-all duration-200'
                href='/'
              >
                <MdArrowBack />
                <span>Seguir comprando</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}
