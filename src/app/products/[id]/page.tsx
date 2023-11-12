import { ProductDetails } from '@/components'
import { product } from '@/utils/dummyData'

interface IParams {
  id?: string
}

export default function ProductPage({ params }: { params: IParams }) {
  return (
    <div className="container bg-dark">
      <section className="section bg-secondary">
        <ProductDetails product={product} />
      </section>
    </div>
  )
}
