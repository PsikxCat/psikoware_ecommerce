'use client'

import { productRating } from '@/utils'
import { Rating } from '@mui/material'
import { useCallback, useState } from 'react'

import type { CartProductType, SelectedImgType } from '@/types'
import { Button, SetColor, SetQuantity } from '@/components'

interface ProductDetailsProps {
  product: any //! TODO: define product type with Prisma
}

function HorizontalLine() {
  return <div className='w-[30%] h-[1px] bg-stone-700 my-2'/>
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    stock: product.inStock,
    selectedImg: { ...product.images[0] },
    quantity: 1,
    price: product.price
  })

  const handleColorSelect = useCallback((selectedImgVal: SelectedImgType) => {
    setCartProduct((prev) => ({
      ...prev,
      selectedImg: { ...selectedImgVal }
    }))
  }, [cartProduct.selectedImg])

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity + 1
    }))
  }, [cartProduct.quantity])

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.quantity === 1) return

    setCartProduct((prev) => ({
      ...prev,
      quantity: prev.quantity - 1
    }))
  }, [cartProduct.quantity])

  return (
    <main className="rounded-md p-2 bg-stone-900 max-w-[1200px] z-10">
      <div className='text-muted flex_center_column md:flex-row w-full h-[650px] border border-stone-700 rounded-md'>
        {/* imagen */}
        <section className="flex_center text-primary w-full md:w-1/2 h-full bg-stone-950">
          imagen
        </section>

        {/* detalles */}
        <section className="p-6 w-full md:w-1/2 h-full bg-stone-900">
          {/* nombre y rating */}
          <div>
            <h2 className='text-3xl text-primary font-bold'>{product.name}</h2>

            <div className='flex items-center gap-3'>
              <Rating value={productRating(product)} precision={0.5} readOnly/>
              <div className='mt-1'>{product.reviews.length === 1 ? '1 review' : `${product.reviews.length} reviews`}</div>
            </div>
          </div>
          <HorizontalLine/>

          {/* descripcion */}
          <div className='text-justify pr-2 max-h-[45%] overflow-y-scroll'>
            {product.description}
          </div>
          <HorizontalLine/>

          {/* categoria, marca y stock */}
          <div>
            <div>
              <span className='font-bold'>CATEGORIA:</span> {product.category}
            </div>
            <div>
              <span className='font-bold'>MARCA:</span> {product.brand}
            </div>
            <div className={`${product.inStock > 0 ? 'text-accent' : 'text-red-500'} font-bold`}>
              {product.inStock > 0 ? 'En stock' : 'Sin stock'}
            </div>
          </div>
          <HorizontalLine/>

          {/* color. al cambiar el color cambia la imagen */}
          <SetColor cartProduct={cartProduct} images={product.images} handleColorSelect={handleColorSelect} />
          <HorizontalLine/>

          {/* cantidad */}
          <SetQuantity
            cartCounter={false}
            cartProduct={cartProduct}
            handleDecrease={handleQuantityDecrease}
            handleIncrease={handleQuantityIncrease}
          />
          <HorizontalLine/>

          {/* Boton add to cart */}
          <div className='max-w-[300px]'>
            <Button label='Agregar al Carrito' onClick={() => { console.log('click') }} />
          </div>
        </section>
      </div>
    </main>
  )
}
