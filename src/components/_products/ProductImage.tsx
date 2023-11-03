'use client'

import { useEffect, useState } from 'react'

import type { CartProductType, ProductVariantType } from '@/types'
import Image from 'next/image'

interface ProductImageProps {
  cartProduct: CartProductType
  product: any //! TODO: define product type with Prisma
}

export default function ProductImage({ cartProduct, product }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState<string>(cartProduct.productVariant.images[0])

  useEffect(() => {
    setSelectedImage(cartProduct.productVariant.images[0])
  }, [cartProduct.productVariant.color])

  const handleImageSelect = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <div className='flex_center_column w-full h-full overflow-hidden'>
      {/* main image */}
      <div className='relative flex-1 flex_center min-w-[200px] min-h-[200px] md:min-w-[300px] md:min-h-[300px] h-full w-full'>
        <Image
          className='rounded-md object-contain'
          src={selectedImage}
          alt={cartProduct.productVariant.color}
          fill
        />
      </div>

      {/* images */}
      <div className='flex_center gap-2 h-[20%] w-full border-t border-stone-700'>
        {product.productVariant.map((variant: ProductVariantType) => (
          variant.images.map((image: string) => (
            <div className={`relative h-[90%] aspect-square border-accent rounded-sm cursor-pointer
                ${variant.color !== cartProduct.productVariant.color && 'hidden'}
                ${variant.color === cartProduct.productVariant.color && 'flex_center'}
                ${image === selectedImage && 'border-[3px]'} `}
              key={image}
            >
              <Image
                className='rounded-md h-full w-full object-contain'
                src={image}
                alt={variant.color}
                width={80}
                height={80}
                onClick={() => { handleImageSelect(image) }}
              />
            </div>
          ))
        ))}
      </div>
    </div>
  )
}
