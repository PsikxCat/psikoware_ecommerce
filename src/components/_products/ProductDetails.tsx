'use client'

import { Rating } from '@mui/material'
import { useCallback, useState } from 'react'

import type { CartProductType, ProductVariantType } from '@/types'

import { Button, ProductImage, SetVariant, SetQuantity, Tabs } from '@/components'
import { formatPrice, productRating } from '@/utils'

interface ProductDetailsProps {
  product: any //! TODO: define product type with Prisma
}
// # Recordar quitar los tipados innecesarios de los mapeos cuando se setee el tipado general de product. esto en cada componente que use product.

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
    productVariant: { ...product.productVariant[0] },
    quantity: 1,
    price: product.price
  })

  // Aunque la ganacia en rendimiento es minima, se usa useCallback para evitar que se creen nuevas funciones cada vez que se renderiza el componente.
  const handleVariantSelect = useCallback((currentProductVariant: ProductVariantType) => {
    setCartProduct((prev) => ({
      ...prev,
      productVariant: { ...currentProductVariant }
    }))
  }, [cartProduct.productVariant])

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
    <div className='flex_center_column gap-5 z-10'>
      {/* producto */}
      <main className="flex_center_column rounded-md p-2 bg-stone-900 w-full md:w-[80%] max-w-[1400px] xl:h-[650px] xl:max-h-[800px]">
        <div className='text-muted flex_center_column xl:flex-row w-full h-full border border-stone-700 rounded-md'>
          {/* imagen producto */}
          <section className="flex_center text-primary h-full min-h-[50%] w-full xl:w-1/2 bg-stone-950">
            <ProductImage
              cartProduct={cartProduct}
              product={product}
            />
          </section>

          {/* info general producto */}
          <section className="relative p-6 border-t lg:border-l border-stone-700 w-full h-full xl:w-1/2 bg-stone-900">
            {/* nombre y rating */}
            <div>
              <h2>{product.name}</h2>

              <div className='flex max-[300px]:flex-col items-center gap-3'>
                <Rating value={productRating(product)} precision={0.5} readOnly/>
                <div className='mt-1 max-[300px]:mb-4'>{product.reviews.length === 1 ? '1 review' : `${product.reviews.length} reviews`}</div>
              </div>
            </div>
            <HorizontalLine/>

            {/* descripcion */}
            <p className='text-justify px-1 py-2 overflow-y-scroll leading-5'>
              {product.shortDescription}
            </p>
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

            {/* color. al cambiar el color cambia el set de imagenes. */}
            <SetVariant cartProduct={cartProduct} productVariant={product.productVariant} handleVariantSelect={handleVariantSelect} />
            <HorizontalLine/>

            {/* cantidad */}
            <SetQuantity
              cartCounter={false}
              cartProduct={cartProduct}
              handleDecrease={handleQuantityDecrease}
              handleIncrease={handleQuantityIncrease}
            />
            <HorizontalLine/>

            {/* precio */}
            <div className='text-3xl text-primary font-bold my-3'>
              {formatPrice(cartProduct.price * cartProduct.quantity)}
            </div>

            {/* Boton add to cart */}
            <div className='max-w-[300px] place-items-end'>
              <Button label='Agregar al Carrito' onClick={() => { console.log('click') }} />
            </div>
          </section>
        </div>
      </main>

      {/* pestanas detalles & especificaciones */}
      <Tabs product={product} />
    </div>
  )
}
