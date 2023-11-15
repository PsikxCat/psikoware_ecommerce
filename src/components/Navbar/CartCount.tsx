'use client'

import { useContext } from 'react'
import Link from 'next/link'

import { GlobalContext, type GlobalContextType } from '@/context'
import { PiShoppingCartSimpleBold } from 'react-icons/pi'

export default function CartCount() {
  const { cartTotalQuantity } = useContext(GlobalContext as React.Context<GlobalContextType>)

  return (
    <Link
      className='relative cursor-pointer text-xl md:text-[26px]'
      href='/cart'
    >
      <PiShoppingCartSimpleBold />

      <span className='absolute -top-1 -right-2 text-xs bg-accent text-dark rounded-full w-4 h-4 flex_center'>
        {cartTotalQuantity}
      </span>
    </Link>
  )
}
