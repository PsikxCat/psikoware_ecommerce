'use client'

import { useContext } from 'react'
import Link from 'next/link'
import { MdArrowBack } from 'react-icons/md'

import { GlobalContext, type GlobalContextType } from '@/context'
import { formatPrice } from '@/utils'
import { Button } from '@/components'

export default function SubtotalSection() {
  const {
    cartTotalAmount,
    handleClearCart
  } = useContext(GlobalContext as React.Context<GlobalContextType>)

  return (
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
            {formatPrice(cartTotalAmount)}
          </span>
        </div>

        <p className='text-xs text-muted mb-2'>El precio del envio se calcula al finalizar la compra.</p>

        {/* checkout */}
        <div className='flex flex-col gap-2'>
          <Button
            label='Finalizar compra'
            accent
            onClick={() => { console.log('finalizar compra condicionada a valor') }}
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
  )
}