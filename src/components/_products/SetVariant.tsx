'use client'

import type { CartProductType, ProductVariantType } from '@/types'

interface SetVariantsProps {
  cartProduct: CartProductType
  productVariants: ProductVariantType[]
  handleColorSelect: (color: string) => void
  handleCapacitySelect: (capacity: string) => void
}

export default function SetVariant({ productVariants, cartProduct, handleColorSelect, handleCapacitySelect }: SetVariantsProps) {
  const variants = productVariants.reduce((acc, variant) => {
    if (variant.color) acc.color.add(variant.color)
    if (variant.capacity) acc.capacity.add(variant.capacity)
    return acc
  }, { color: new Set(), capacity: new Set() })

  const codeColor = (color: string) => productVariants.find((variant) => variant.color === color)

  return (
    <div className='flex flex-col gap-1'>
      {/* color variants */}
      {[...variants.color].length && (
        <section className='flex items-center gap-4'>
          <span className='font-bold uppercase'>color:</span>
          {/* variantes */}
          <div className='flex gap-1'>
            {[...variants.color].map((variant) => {
              const color = `${variant}`
              return (
              <div className={`${cartProduct.productVariant.color === color ? 'border-[1.5px]' : 'border-none'} h-7 w-7 border-secondary rounded-full flex_center cursor-pointer`}
                key={color}
                onClick={() => { handleColorSelect(color) }}
              >
                <span className='h-5 w-5 rounded-full' style={{ backgroundColor: codeColor(color)?.colorCode }}/>
              </div>
              )
            })}
          </div>
        </section>
      )}

      {/* capacity variants */}
      {[...variants.capacity].length && (
        <section className='flex items-center gap-4'>
          <span className='font-bold uppercase'>capacidad:</span>
          {/* variantes */}
          <div className='flex gap-1'>
            {[...variants.capacity].map((variant) => {
              const capacity = `${variant}`
              return (
                <div className={`${cartProduct.productVariant.capacity === capacity ? 'border-[1.5px]' : 'border-none'} px-2 py-1 border-secondary bg-stone-950 rounded-md flex_center cursor-pointer`}
                  key={capacity}
                  onClick={() => { handleCapacitySelect(capacity) }}
                >
                  {capacity}
                </div>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}
