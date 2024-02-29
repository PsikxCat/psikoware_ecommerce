import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { type ProductType } from '@/types'
import { Rating } from '@mui/material'
import { Avatar } from '@/components'
import AddReview from './AddReview'

dayjs.extend(relativeTime) // # solve language issue

interface ReviewListProps {
  product: ProductType
}

export default function ReviewList({ product }: ReviewListProps) {
  return (
    <section className='flex_center'>
      <div className='flex flex-col'>
        {/* Formulario de review */}
        <AddReview product={product} />

        {/* Reviews de usuarios */}
        <div className="text-sm flex flex-col gap-4 py-8">
          {product.reviews?.length
            ? product.reviews.map((review: any) => (
              <div key={review.id} className="flex flex-col bg-white/10 rounded-md p-4 min-w-[300px] max-w-lg">
                {/* user avatar/name & time ago */}
                <section className='flex items-center gap-2'>
                  <Avatar
                    src={review.user?.image
                      ? review.user.image
                      : 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Samantha' }
                  />

                  <h4 className="font-bold">{review.user.name}</h4>

                  <span className="text-muted">
                    {review.createdDate}
                  </span>
                </section>

                {/* rating */}
                <section className='mt-1 pl-1'>
                  <Rating value={review.rating} size='small' readOnly/>
                </section>

                {/* comment */}
                <section className="text-muted px-2">
                  {review.comment}
                </section>
              </div>
            ))
            : <h4 className="text-muted py-8">Este producto aún no tiene reseñas.</h4>
          }
        </div>
      </div>
    </section>
  )
}
