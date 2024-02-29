'use client'

import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Rating } from '@mui/material'
import { MdCheckCircle } from 'react-icons/md'
import { FaThList } from 'react-icons/fa'

import type { CartProductType, ProductType, ProductVariantType } from '@/types'

import { Button, ProductImage, SetVariant, SetQuantity, Tabs } from '@/components'
import { categories } from '@/utils/categories'
import { formatPrice, productRating } from '@/utils'
import { GlobalContext, type GlobalContextType } from '@/context/globalContext'

interface ProductDetailsProps {
  product: ProductType
}

// | Componente local | //
function HorizontalLine() {
  return <div className='w-[30%] h-[1px] bg-stone-700 my-2'/>
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const router = useRouter() // CAMBIAR POR LINK?

  // | Contexto | //
  const {
    cartItems,
    handleAddItemToCart
  } = useContext(GlobalContext as React.Context<GlobalContextType>)

  // | Estados | //
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    shortDescription: product.shortDescription,
    brand: product.brand,
    category: product.category,
    description: product.description,
    specifications: product.specifications,
    productVariant: { ...product.productVariants[0], quantity: 1 },
    reviews: product.reviews
  })
  const [isInStock, setisInStock] = useState<boolean>(true)
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false)

  // | Efectos | //
  useEffect(() => {
    setisInStock(cartProduct.productVariant.inStock > 0)

    setIsProductInCart(
      cartItems?.some((item: CartProductType) =>
        item.productVariant.id === cartProduct.productVariant.id)
    )
  }, [cartItems, cartProduct])

  // | Funciones | //
  const handleColorSelect = (color: string) => {
    // busca variante con color seleccionado y capacidad guardada en cartProduct
    const findVariant = product.productVariants
      .find((variant: ProductVariantType) =>
        variant.color === color && variant.capacity === cartProduct.productVariant.capacity)

    // si encuentra variante, setea cartProduct con la variante encontrada
    if (findVariant) {
      setCartProduct((prev) => ({
        ...prev,
        productVariant: { ...findVariant }
      }))
    }
  }
  const handleCapacitySelect = (capacity: string) => {
    const findVariant = product.productVariants
      .find((variant: ProductVariantType) =>
        variant.color === cartProduct.productVariant.color && variant.capacity === capacity)

    if (findVariant) {
      setCartProduct((prev) => ({
        ...prev,
        productVariant: { ...findVariant }
      }))
    }
  }
  const handleQuantityDecrease = () => {
    if (cartProduct.productVariant.quantity === 1) return

    setCartProduct((prev) => ({
      ...prev,
      productVariant: {
        ...prev.productVariant,
        quantity: (prev.productVariant.quantity) - 1
      }
    }))
  }
  const handleQuantityIncrease = () => {
    if (cartProduct.productVariant.inStock === cartProduct.productVariant.quantity) return

    setCartProduct((prev) => ({
      ...prev,
      productVariant: {
        ...prev.productVariant,
        quantity: (prev.productVariant.quantity) + 1
      }
    }))
  }

  return (
    <div className='flex_center_column gap-5'>
      {/* producto */}
      <main className="flex_center_column rounded-md p-2 bg-stone-900 w-full md:w-[80%] max-w-[1400px] xl:h-[680px] xl:max-h-[800px] z-10">
        <div className='text-muted flex_center_column xl:flex-row w-full h-full border border-stone-700 rounded-md overflow-hidden'>
          {/* imagen producto */}
          <section className="relative flex_center text-primary h-full min-h-[50%] w-full xl:w-1/2 bg-stone-950">
            {/* botones de navegacion */}
            <div className='flex items-center justify-between p-2 absolute top-0 left-0 w-full z-50'>
              <Link href={'/products'}
                className='flex items-center text-stone-400 hover:text-accent cursor-pointer transition-all duration-200'
              >
                <FaThList size={24}/>
                <span className='ml-1 text-[14px] max-[500px]:hidden'>Todos los productos</span>
              </Link>

              <Link href={`/products?category=${product.category}`}
                className='flex items-center text-stone-400 hover:text-accent cursor-pointer transition-all duration-200'
              >
                {categories.find((cat) => cat.label === product.category)?.icon({ size: 24 })}
                <span className='ml-1 text-[14px] max-[500px]:hidden'>Más {product.category.toLowerCase()}</span>
              </Link>
            </div>

            <div className='absolute top-[33%] left-0 w-full h-[20%] bg-accent'/>

            <ProductImage cartProduct={cartProduct}/>
          </section>

          {/* info general producto */}
          <section className="relative p-6 max-lg:border-t lg:border-l border-stone-700 w-full h-full xl:w-1/2 bg-stone-900">
            {/* nombre y rating */}
            <div>
              <h2>{product.name}</h2>

              <div className='flex_center max-[300px]:flex-col gap-3 bg-stone-700'>
                <div className='pt-2'>
                  <Rating value={productRating(product)} precision={0.5} readOnly/>
                </div>

                <div className='mt-1 max-[300px]:mb-4'>
                  {product.reviews?.length === 0 || !product.reviews
                    ? 'Sin reseñas'
                    : product.reviews?.length === 1 ? '1 reseña' : `${product.reviews?.length} reseñas`
                  }
                </div>
              </div>
            </div>
            <HorizontalLine/>

            {/* descripcion */}
            <p className='text-justify px-1 py-2 mb-4 overflow-y-scroll leading-5 xl:max-h-[135px]'>
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
              {formatPrice(cartProduct.productVariant.price * (cartProduct.productVariant.quantity))}
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
