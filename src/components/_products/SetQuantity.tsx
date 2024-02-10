'use client'

import { type UIProductType } from '@/types'

interface SetQuantityProps {
  cartCounter: boolean
  cartProduct: UIProductType
  disabled?: boolean
  customBtnClass?: string
  handleDecrease: () => void
  handleIncrease: () => void
}

export default function SetQuantity({
  cartCounter, cartProduct, disabled, customBtnClass, handleDecrease, handleIncrease
}: SetQuantityProps) {
  return (
    <div className='flex items-center gap-5'>
      {
        cartCounter
          ? null
          : <div className='font-semibold'>CANTIDAD:</div>
      }

      <div className='flex items-center gap-1'>
        <button className={`flex_center cursor-pointer ${customBtnClass}`}
          disabled={disabled}
          onClick={() => { handleDecrease() }}
        >
          -
        </button>

        <span className='h-6 w-6 flex_center'>
          {cartProduct.productVariants.quantity}
        </span>

        <button className={`flex_center cursor-pointer ${customBtnClass}`}
          disabled={disabled}
          onClick={() => { handleIncrease() }}
        >
          +
        </button>
      </div>
    </div>
  )
}
