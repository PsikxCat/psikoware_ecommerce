'use client'

import { type CartProductType } from '@/types'

interface SetQuantityProps {
  cartCounter: boolean
  cartProduct: CartProductType
  handleDecrease: () => void
  handleIncrease: () => void
}

export default function SetQuantity({
  cartCounter, cartProduct, handleDecrease, handleIncrease
}: SetQuantityProps) {
  return (
    <div className='flex items-center gap-8'>
      {cartCounter
        ? null
        : <div className='font-semibold'>CANTIDAD:</div>}

      <div className='flex items-center gap-2'>
        <button className='h-6 w-6 border border-secondary rounded-md flex_center'
          onClick={handleDecrease}>
          -
        </button>

        <span className='h-6 w-6 flex_center'>
          {cartProduct.quantity}
        </span>

        <button className='h-6 w-6 border border-secondary rounded-md flex_center'
          onClick={handleIncrease}>
          +
        </button>
      </div>
    </div>
  )
}
