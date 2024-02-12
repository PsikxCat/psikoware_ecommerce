'use client'

import type { CartProductType, ProductVariantType } from '@/types'

interface SetVariantsProps {
  cartProduct: CartProductType
  productVariants: ProductVariantType[]
  handleColorSelect: (color: string) => void
  handleCapacitySelect: (capacity: string) => void
}

export default function SetVariant({
  productVariants, cartProduct, handleColorSelect, handleCapacitySelect
}: SetVariantsProps) {
  // Crea un objeto con dos conjuntos (Set) para almacenar los colores y capacidades únicos
  const variants = productVariants
    .reduce((acc, variant) => {
      if (variant.color) acc.color.add(variant.color)
      if (variant.capacity) acc.capacity.add(variant.capacity)
      return acc
    }, { color: new Set<string>(), capacity: new Set<string>() })

  // Función para obtener el código de color correspondiente a un color
  const codeColor = (color: string) => {
    const variant = productVariants.find((variant) => variant.color === color)
    return variant?.colorCode
  }

  return (
    <div className='flex flex-col gap-1'>
      {/* color variants */}
      {[...variants.color].length > 0 && (
        <section className='flex items-center gap-4'>
          <span className='font-bold uppercase'>color:</span>
          {/* variantes */}
          <div className='flex gap-1'>
            {[...variants.color].map((color) => (
              <div
                className={`${cartProduct.productVariant.color === color ? 'border-[1.5px]' : 'border-none'} h-7 w-7 border-secondary rounded-full flex_center cursor-pointer`}
                key={color}
                onClick={() => { handleColorSelect(color) }}
              >
                <span className='h-5 w-5 rounded-full' style={{ backgroundColor: codeColor(color) }}/>
              </div>
            ))}
          </div>
        </section>

      )}

      {/* capacity variants */}
      {[...variants.capacity].length > 0 && (
        <section className='flex items-center gap-4'>
          <span className='font-bold uppercase'>capacidad:</span>
          {/* variantes */}
          <div className='flex gap-1'>
            {[...variants.capacity].map((capacity) => (
              <div
                className={`${cartProduct.productVariant.capacity === capacity ? 'border-[1.5px]' : 'border-none'} px-2 py-1 border-secondary bg-stone-950 rounded-md flex_center cursor-pointer`}
                key={capacity}
                onClick={() => { handleCapacitySelect(capacity) }}
              >
                {capacity}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
