'use client'

import { useContext } from 'react'
import { MdArrowBack } from 'react-icons/md'
import Link from 'next/link'

import { Button } from '@/components'
import { formatPrice } from '@/utils'
import { GlobalContext, type GlobalContextType } from '@/context'

export default function ClientCart() {
  const { cartItems } = useContext(GlobalContext as React.Context<GlobalContextType>)

  // carro vacio
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

  // carro con productos
  return (
    <section className='flex_center_column'>
      {/* titulo */}
      <h2 className='text-accent px-2 w-full'>Carrito de compras</h2>

      {/* carrito */}
      <div className='flex flex-col gap-2 w-full mt-6'>
        {/* titulos */}
        <section className='grid grid-cols-5 text-xs uppercase px-3 border-b border-secondary pb-1'>
          <span className='justify-self-start col-span-2'>Producto</span>
          <span className='justify-self-center'>Precio</span>
          <span className='justify-self-center'>Cantidad</span>
          <span className='justify-self-end'>Total</span>
        </section>

        {/* productos */}
        {/* esto pasara a ser un componente */}
        <section className='flex flex-col gap-2 px-1 z-10'>
          {cartItems.map((item) => (
            <section
              key={item.productVariants.id}
              className='bg-secondary rounded-md text-dark grid grid-cols-5 uppercase px-2 min-h-[100px]'
            >
              <div className='flex items-center col-span-2 gap-2'>
                <img
                  className='w-16 h-16 object-contain'
                  src={item.productVariants.images[0]}
                  alt={item.name}
                />
                <div className='flex_center_column'>
                  <span>{item.name}</span>
                  <span className='text-darker'>
                  {item.productVariants.color} {item.productVariants.capacity}
                  </span>
                </div>
              </div>

              <span className='justify-self-center flex_center'>
                {formatPrice(item.productVariants.price)}
              </span>

              <span className='justify-self-center flex_center'>
                {item.productVariants.quantity}
              </span>

              <span className='justify-self-end flex_center font-bold'>
                {formatPrice(item.productVariants.price * item.productVariants.quantity)}
              </span>
            </section>
          ))}
        </section>

        {/* clear y subtotal */}
        <section className='flex justify-between border-t border-secondary pt-2 px-2 z-10'>
          {/* clear */}
          <div className='w-[110px]'>
            <Button
              label='Vaciar carrito'
              small
              accent
              onClick={() => { console.log('limpiar carrito') }}
            />
          </div>

          {/* subtotal y checkout */}
          <div className='flex flex-col gap-1 w-[240px]'>
            <div className='flex justify-between font-bold text-xl'>
              <span>Subtotal:</span>
              <span>
                {formatPrice(cartItems.reduce((acc, item) =>
                  acc + item.productVariants.price * item.productVariants.quantity, 0))}
              </span>
            </div>

            <p className='text-xs text-muted mb-2'>El precio del envio se calcula al finalizar la compra.</p>

            <Button
              label='Finalizar compra'
              accent
              onClick={() => { console.log('finalizar compra') }}
            />

            <Link
              className='text-muted text-sm tracking-wide mt-1 flex_center gap-1'
              href='/'
            >
              <MdArrowBack />
              <span>Seguir comprando</span>
            </Link>
          </div>
        </section>
      </div>
    </section>
  )
}
