import { ProductDetails } from '@/components'
import { product } from '@/utils/dummyData'

interface IParams {
  id?: string
}

export default function ProductPage({ params }: { params: IParams }) {
  console.log(params)
  return (
    <div className="container bg-dark">
      <section className="section bg-secondary">
        <ProductDetails product={product} />
      </section>
    </div>
  )
}
