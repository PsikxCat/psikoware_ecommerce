import moment from 'moment'
import 'moment/locale/es'

import { Rating } from '@mui/material'
import { getUserTimeZone } from '@/utils'
import { Avatar } from '@/components'

interface ReviewListProps {
  product: any // ! TODO: define product type with Prisma
}

const ReviewList: React.FC<ReviewListProps> = ({ product }) => {
  const setTimeAgo = (createdDate: any) => { //! any por ahora ////////////
    const formatCreatedDate = createdDate.slice(0, 19) + getUserTimeZone()
    return moment(formatCreatedDate).fromNow()
  } // # enviar a utils?

  return (
    <div className='flex_center'>
      <div className="text-sm flex flex-col gap-4">
        {product.reviews.length > 0 && product.reviews.map((review: any) => ( //! any por ahora ////////////
          <div key={review.id} className="flex flex-col gap-1 bg-white/10 rounded-md p-4 max-w-lg">
            {/* user avatar/name & time ago */}
            <section className='flex items-center gap-2'>
              <Avatar src={review.user.image} />

              <h4 className="font-bold">{review.user.name}</h4>

              <span className="text-muted">
                {setTimeAgo(review.createdDate)}
              </span>
            </section>

            {/* rating */}
            <section className='mt-1 pl-1'>
              <Rating value={review.rating} precision={0.5} size='small' readOnly/>
            </section>

            {/* comment */}
            <section className="text-muted px-2">
              {review.comment}
            </section>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReviewList
