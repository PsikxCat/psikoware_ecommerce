import Image from 'next/image'
import { Rating } from '@mui/material'

import { truncate, formatPrice } from '@/utils'

interface ProductCardProps {
  data: any
}

export default function ProductCard({ data }: ProductCardProps) {
  const productRating = data.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / data.reviews.length

  return (
    <article className='text-center text-sm col-span-1 cursor-pointer border-[1.2px] border-stone-950 rounded-md p-2 transition-all hover:scale-105 duration-300 bg-stone-900 group'>
      <section className="flex_center_column gap-2 w-full border border-stone-600 rounded-md">
        {/* imagen */}
        <div className='relative aspect-square overflow-hidden w-full bg-stone-950 rounded-t-md'>
          <div className='absolute top-[40%] left-0 z-10 w-full h-[25%] bg-accent hidden group-hover:block'/>
          <Image className='w-full h-full object-contain z-20' src={data.images[0].image} alt={data.name} fill />
        </div>

        {/* nombre */}
        <div className='uppercase tracking-tight'>{truncate(data.name, 25)}</div>

        {/* rating & reviews */}
        <div className='bg-stone-700 rounded-sm w-full'>
          <div className='mt-2'>
            <Rating value={productRating} precision={0.5} readOnly/>
          </div>

          <div className='mb-2'>{data.reviews.length === 1 ? '1 review' : `${data.reviews.length} reviews`}</div>
        </div>

        {/* precio */}
        <div className='font-bold tracking-widest mb-2'>{formatPrice(data.price)}</div>
      </section>
    </article>
  )
}
