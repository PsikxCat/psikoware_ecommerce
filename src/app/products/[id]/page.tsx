import { ProductDetails } from '@/components'
import { product } from '@/utils/dummyData'

interface IParams {
  id?: string
}

export default function ProductPage({ params }: { params: IParams }) {
  return (
    <section className="container bg-dark">
      <div className="section bg-secondary flex_center">
        <ProductDetails product={product} />
      </div>
    </section>
  )
}
