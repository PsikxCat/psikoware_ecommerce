'use client'

import { useEffect, useState } from 'react'

import type { UIProductType } from '@/types'
import Image from 'next/image'

interface ProductImageProps {
  cartProduct: UIProductType
}

export default function ProductImage({ cartProduct }: ProductImageProps) {
  const [selectedImage, setSelectedImage] = useState<string>(cartProduct.productVariants.images[0])

  useEffect(() => {
    setSelectedImage(cartProduct.productVariants.images[0])
  }, [cartProduct.productVariants.color])

  const handleImageSelect = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <div className='flex_center_column w-full h-full overflow-hidden'>
      {/* main image */}
      <div className='relative flex-1 flex_center aspect-square min-w-[200px] min-h-[200px] md:min-w-[300px] md:min-h-[300px] max-w-[450px] h-full w-full'>
        <Image
          className='rounded-md object-contain'
          src={selectedImage}
          alt={cartProduct.name}
          fill
          sizes='(min-width: 1024px) 450px, 300px'
        />
      </div>

      {/* images */}
      <div className='flex_center gap-2 h-[15%] w-full border-t border-stone-700'>
        {cartProduct.productVariants.images.map((image: string) => (
            <div className={`relative h-[90%] flex_center aspect-square border-accent rounded-sm cursor-pointer ${image === selectedImage && 'border-[3px]'} `}
              key={image}
            >
              <Image
                className='rounded-md object-contain w-[60px] h-[60px]'
                src={image}
                alt={image}
                width={80}
                height={80}
                onClick={() => { handleImageSelect(image) }}
              />
            </div>
        ))}
      </div>
    </div>
  )
}
