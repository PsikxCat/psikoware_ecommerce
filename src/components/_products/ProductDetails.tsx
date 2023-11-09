'use client'

import { Rating } from '@mui/material'
import { useCallback, useContext, useState } from 'react'

import type { CartProductType, ProductVariantType } from '@/types'

import { Button, ProductImage, SetVariant, SetQuantity, Tabs } from '@/components'
import { formatPrice, productRating } from '@/utils'
import { GlobalContext, type GlobalContextType } from '@/context'

interface ProductDetailsProps {
  product: any //! TODO: define product type with Prisma
}
// # Recordar quitar los tipados innecesarios de los mapeos cuando se setee el tipado general de product. esto en cada componente que use product.

function HorizontalLine() {
  return <div className='w-[30%] h-[1px] bg-stone-700 my-2'/>
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  // : CONTEXTO ////////////////////////////////
  const {
    cartTotalQuantity,
    cartItems,
    handleAddItemToCart
  } = useContext(GlobalContext as React.Context<GlobalContextType>)

  // : ESTADOS ////////////////////////////////
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    productVariant: { ...product.productVariant[0] },
    name: product.name,
    brand: product.brand,
    category: product.category
  })
  const [selectedColor, setSelectedColor] = useState(cartProduct.productVariant.color)
  const [selectedCapacity, setSelectedCapacity] = useState(cartProduct.productVariant.capacity)

  // : FUNCIONES ////////////////////////////////
  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color)

    const findVariant = product.productVariant.find((variant: ProductVariantType) => variant.color === color && variant.capacity === cartProduct.productVariant.capacity)

    if (findVariant) {
      setCartProduct((prev) => ({
        ...prev,
        productVariant: { ...findVariant }
      }))
    } else {
      setCartProduct((prev) => ({
        ...prev,
        productVariant: { ...prev.productVariant, color }
      }))
    }
  }, [selectedColor, cartProduct.productVariant.capacity])

  const handleCapacitySelect = useCallback((capacity: string) => {
    setSelectedCapacity(capacity)

    const findVariant = product.productVariant.find((variant: ProductVariantType) => variant.color === cartProduct.productVariant.color && variant.capacity === capacity)

    if (findVariant) {
      setCartProduct((prev) => ({
        ...prev,
        productVariant: { ...findVariant }
      }))
    } else {
      setCartProduct((prev) => ({
        ...prev,
        productVariant: { ...prev.productVariant, capacity }
      }))
    }
  }, [selectedCapacity, cartProduct.productVariant.color])

  const handleQuantityIncrease = useCallback(() => {
    setCartProduct((prev) => ({
      ...prev,
      productVariant: {
        ...prev.productVariant,
        quantity: prev.productVariant.quantity + 1
      }
    }))
  }, [cartProduct.productVariant.quantity])

  const handleQuantityDecrease = useCallback(() => {
    if (cartProduct.productVariant.quantity === 1) return

    setCartProduct((prev) => ({
      ...prev,
      productVariant: {
        ...prev.productVariant,
        quantity: prev.productVariant.quantity - 1
      }
    }))
  }, [cartProduct.productVariant.quantity])

  // : VARIABLES ////////////////////////////////
  const isInStock = cartProduct.productVariant.inStock

  return (
    <div className='flex_center_column gap-5 z-10'>
      {/* producto */}
      <main className="flex_center_column rounded-md p-2 bg-stone-900 w-full md:w-[80%] max-w-[1400px] xl:h-[650px] xl:max-h-[800px]">
        <div className='text-muted flex_center_column xl:flex-row w-full h-full border border-stone-700 rounded-md overflow-hidden'>
          {/* imagen producto */}
          <section className="flex_center text-primary h-full min-h-[50%] w-full xl:w-1/2 bg-stone-950">
            <ProductImage cartProduct={cartProduct}/>
          </section>

          {/* info general producto */}
          <section className="relative p-6 max-lg:border-t lg:border-l border-stone-700 w-full h-full xl:w-1/2 bg-stone-900">
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

            {/* categoria y marca */}
            <div>
              <div>
                <span className='font-bold'>CATEGORIA:</span> {product.category}
              </div>
              <div>
                <span className='font-bold'>MARCA:</span> {product.brand}
              </div>
            </div>
            <HorizontalLine/>

            {/* color. al cambiar el color cambia el set de imagenes. */}
            <div>
              <SetVariant
                cartProduct={cartProduct}
                productVariants={product.productVariant}
                handleColorSelect={handleColorSelect}
                handleCapacitySelect={handleCapacitySelect}
              />
            </div>
            <HorizontalLine/>

            {/*  stock y cantidad */}
            <div>
              <div className={`${isInStock ? 'text-accent' : 'text-red-500'} font-bold`}>
                {isInStock ? 'En stock' : 'Sin stock'}
              </div>

              <SetQuantity
                cartCounter={false}
                cartProduct={cartProduct}
                disabled={!isInStock}
                handleDecrease={handleQuantityDecrease}
                handleIncrease={handleQuantityIncrease}
              />
            </div>
            <HorizontalLine/>

            {/* precio */}
            <div className={`text-3xl font-bold my-3 ${!isInStock ? 'line-through text-muted' : 'text-primary'}`}>
              {formatPrice(cartProduct.productVariant.price * cartProduct.productVariant.quantity)}
            </div>

            {/* Boton add to cart */}
            <div className='max-w-[300px] place-items-end'>
              <Button
                onClick={() => { handleAddItemToCart(cartProduct) } }
                label='Agregar al Carrito'
                disabled={!isInStock}
              />
            </div>
          </section>
        </div>
      </main>

      {/* pestanas detalles & especificaciones */}
      <Tabs product={product} />
    </div>
  )
}
