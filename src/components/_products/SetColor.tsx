'use client'

import type { CartProductType, SelectedImgType } from '@/types'

interface SetColorProps {
  cartProduct: CartProductType
  images: SelectedImgType[]
  handleColorSelect: (selectedImg: SelectedImgType) => void
}

export default function SetColor({ images, cartProduct, handleColorSelect }: SetColorProps) {
  return (
    <div>
      <div className='flex items-center gap-4'>
        <span className='font-bold'>COLOR:</span>
        <div className='flex gap-1'>
          {images.map((image) => (
            <div className={`${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'} h-7 w-7 border-secondary rounded-full flex_center cursor-pointer`}
              key={image.color}
              onClick={() => { handleColorSelect(image) }}
            >
              <span className='h-5 w-5 rounded-full' style={{ backgroundColor: image.color }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
