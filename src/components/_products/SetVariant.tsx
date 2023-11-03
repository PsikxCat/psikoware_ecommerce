'use client'

import type { CartProductType, ProductVariantType } from '@/types'

interface SetVariantsProps {
  cartProduct: CartProductType
  productVariant: ProductVariantType[]
  handleVariantSelect: (currentProductVariant: ProductVariantType) => void
}

export default function SetVariant({ productVariant, cartProduct, handleVariantSelect }: SetVariantsProps) {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <span className='font-bold'>COLOR:</span>
        <div className='flex gap-1'>
          {Object.values(productVariant).map((variant) => (
            <div className={`${cartProduct.productVariant.color === variant.color ? 'border-[1.5px]' : 'border-none'} h-7 w-7 border-secondary rounded-full flex_center cursor-pointer`}
              key={variant.color}
              onClick={() => { handleVariantSelect(variant) }}
            >
              <span className='h-5 w-5 rounded-full' style={{ backgroundColor: variant.colorCode }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
