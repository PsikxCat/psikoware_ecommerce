'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Rating } from '@mui/material'
import { MdCheckCircle } from 'react-icons/md'

import type { CartProductType, ProductVariantsType } from '@/types'

import { Button, ProductImage, SetVariant, SetQuantity, Tabs } from '@/components'
import { formatPrice, productRating } from '@/utils'
import { GlobalContext, type GlobalContextType } from '@/context/globalContext'

interface ProductDetailsProps {
  product: any //! TODO: define product type with Prisma
}
// # Recordar quitar los tipados innecesarios de los mapeos cuando se setee el tipado general de product. esto en cada componente que use product.

// | Componente local | //
function HorizontalLine() {
  return <div className='w-[30%] h-[1px] bg-stone-700 my-2'/>
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter()

  // | Contexto | //
  const {
    cartItems,
    handleAddItemToCart
  } = useContext(GlobalContext as React.Context<GlobalContextType>)

  // | Estados | //
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    productVariants: { ...product.productVariants[0] },
    name: product.name,
    brand: product.brand,
    category: product.category
  })
  const [isInStock, setisInStock] = useState(true)
  const [isProductInCart, setIsProductInCart] = useState(false)

  // | Efectos | //
  useEffect(() => {
    setisInStock(cartProduct.productVariants.inStock > 0)

    setIsProductInCart(
      cartItems.some((item: CartProductType) =>
        item.productVariants.id === cartProduct.productVariants.id)
    )
  }, [cartItems, cartProduct])

  // | Funciones | //
  const handleColorSelect = (color: string) => {
    // busca variante con color seleccionado y capacidad guardada en cartProduct
    const findVariant = product.productVariants
      .find((variant: ProductVariantsType) =>
        variant.color === color && variant.capacity === cartProduct.productVariants.capacity)

    // si encuentra variante, setea cartProduct con la variante encontrada
    if (findVariant) {
      setCartProduct((prev) => ({
        ...prev,
        productVariants: { ...findVariant }
      }))
    }
  }
  const handleCapacitySelect = (capacity: string) => {
    const findVariant = product.productVariants
      .find((variant: ProductVariantsType) =>
        variant.color === cartProduct.productVariants.color && variant.capacity === capacity)

    if (findVariant) {
      setCartProduct((prev) => ({
        ...prev,
        productVariants: { ...findVariant }
      }))
    }
  }
  const handleQuantityDecrease = () => {
    if (cartProduct.productVariants.quantity === 1) return

    setCartProduct((prev) => ({
      ...prev,
      productVariants: {
        ...prev.productVariants,
        quantity: prev.productVariants.quantity - 1
      }
    }))
  }
  const handleQuantityIncrease = () => {
    if (cartProduct.productVariants.inStock === cartProduct.productVariants.quantity) return

    setCartProduct((prev) => ({
      ...prev,
      productVariants: {
        ...prev.productVariants,
        quantity: prev.productVariants.quantity + 1
      }
    }))
  }

  return (
    <div className='flex_center_column gap-5'>
      {/* producto */}
      <main className="flex_center_column rounded-md p-2 bg-stone-900 w-full md:w-[80%] max-w-[1400px] xl:h-[660px] xl:max-h-[800px] z-10">
        <div className='text-muted flex_center_column xl:flex-row w-full h-full border border-stone-700 rounded-md overflow-hidden'>
          {/* imagen producto */}
          <section className="relative flex_center text-primary h-full min-h-[50%] w-full xl:w-1/2 bg-stone-950">
            <div className='absolute top-[33%] left-0 w-full h-[20%] bg-accent'/>
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

            {/* variantes color y capacidad */}
            <div>
              <SetVariant
                cartProduct={cartProduct}
                productVariants={product.productVariants}
                handleColorSelect={handleColorSelect}
                handleCapacitySelect={handleCapacitySelect}
              />
            </div>
            <HorizontalLine/>

            {/* stock y cantidad */}
            <div>
              <div className={`${isInStock ? 'text-accent' : 'text-red-500'} font-bold`}>
                {isInStock ? 'En stock' : 'Sin stock'}
              </div>

              <SetQuantity
                cartCounter={false}
                cartProduct={cartProduct}
                disabled={!isInStock || isProductInCart}
                customBtnClass='h-6 w-6 rounded-md border border-secondary'
                handleDecrease={handleQuantityDecrease}
                handleIncrease={handleQuantityIncrease}
              />
            </div>
            <HorizontalLine/>

            {/* precio */}
            <div className={`text-3xl font-bold my-3 ${!isInStock ? 'line-through text-muted' : 'text-primary'}`}>
              {formatPrice(cartProduct.productVariants.price * cartProduct.productVariants.quantity)}
            </div>

            {/* Boton y mensaje */}
            <div className='max-w-[300px]'>
              {isProductInCart
                ? (
              <>
                <Button onClick={() => { router.push('/cart') } }
                  accent
                  label='Ver Carrito'
                />

                <div className='text-secondary font-bold w-full flex_center text-center mt-1'>
                  <MdCheckCircle className='text-accent inline-block mr-1'/>
                  <span>Producto agregado</span>
                </div>
              </>
                  )
                : (
                <Button onClick={() => { handleAddItemToCart(cartProduct) } }
                  label='Agregar al Carrito'
                  disabled={!isInStock}
                />
                  )
              }
            </div>
          </section>
        </div>
      </main>

      {/* pestanas detalles & especificaciones */}
      <Tabs product={product} />
    </div>
  )
}
