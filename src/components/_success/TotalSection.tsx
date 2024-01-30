'use client'

import { useContext } from 'react'

import { formatPrice } from '@/utils'
import { GlobalContext, type GlobalContextType } from '@/context'
import { Button } from '@/components'
import Link from 'next/link'

export default function Total() {
  const { cartTotalAmount } = useContext(GlobalContext as React.Context<GlobalContextType>)

  const handleClick = () => {
    localStorage.removeItem('cart')
    // location.reload() no funciona ya que regresa a esta page despues de haber redireccionado a home
    window.location.replace('/')
  }

  return (
    <div className='flex flex-col gap-1 w-[300px]'>
      {/* subtotal */}
      <div className='flex justify-between font-bold text-xl'>
        <span>Total pagado:</span>
        <span>
          {formatPrice(cartTotalAmount)}
        </span>
      </div>

      <Link href={'/'}>
      <Button
        label='Finalizar'
        accent
        onClick={handleClick}
      />
      </Link>
    </div>
  )
}
