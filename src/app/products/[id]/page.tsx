import { ProductDetails } from '@/components'
import { getProductById } from '@/libs/actions/getDataFromDB'

interface IParams {
  id?: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  let product = null
  if (params.id) product = await getProductById(params.id)

  return (
    <div className="container bg-dark">
      <section className="section bg-secondary">
        {product && <ProductDetails product={product} />}
      </section>

      {/* related products? */}
    </div>
  )
}
