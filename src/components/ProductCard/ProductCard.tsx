import Link from 'next/link'
import Image from 'next/image'
import { Rating } from '@mui/material'

import type { ProductType } from '@/types'
import { truncate, formatPrice, productRating } from '@/utils'

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
    <article
      className='box_shadow text-center text-sm col-span-1 cursor-pointer rounded-md p-2 transition-all hover:scale-105 duration-300 bg-stone-900 group z-10'
    >
      <section className="flex_center_column gap-2 w-full border border-stone-700 group-hover:border-accent rounded-md">
        {/* imagen */}
        <div className='relative aspect-square overflow-hidden w-full bg-stone-950 rounded-t-md'>
          <div className='absolute top-[40%] left-0 w-full h-[25%] bg-accent hidden group-hover:block'/>

          <Image
            className='w-full h-full object-contain z-20'
            src={product.productVariants[0].images[0]}
            alt={product.name}
            fill
            sizes='(max-width: 768px) 100vw, 400px'
          />
        </div>

        {/* nombre */}
        <h4 className='flex_center uppercase tracking-tight h-[50px] px-3'>
          {truncate(product.name, 50)}
        </h4>

        {/* rating & reviews */}
        <div className='bg-stone-700 rounded-sm w-full'>
          <div className='mt-2'>
            <Rating value={productRating(product)} precision={0.5} readOnly/>
          </div>

          <div className='mb-2'>
            {product.reviews?.length === 0 || !product.reviews
              ? 'Sin reseñas'
              : product.reviews?.length === 1 ? '1 reseña' : `${product.reviews?.length} reseñas`}
          </div>
        </div>

        {/* precio */}
        <h5 className='font-bold tracking-widest mb-2'>
          {formatPrice(product.productVariants[0].price)}
        </h5>
      </section>
    </article>
    </Link>
  )
}
