import { ProductDetails } from '@/components'
import { product } from '@/utils/dummyData'

interface IParams {
  id?: string
}

export default function ProductPage({ params }: { params: IParams }) {
  return (
    <div className="flex_center_column gap-8 container bg-dark">
      <section className="section bg-secondary flex_center">
        <ProductDetails product={product} />
      </section>
    </div>
  )
}
