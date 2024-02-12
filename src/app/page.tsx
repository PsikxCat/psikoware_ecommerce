import { HomeBanner, ProductCard } from '@/components'
import { getAllProducts } from '@/libs/actions/getDataFromDB'

export default async function Home() {
  const products = await getAllProducts()

  return (
    <section className="w-full flex_center bg-dark">
      <div className="container">
        <main className="w-full flex_center_column">
          {/* banner */}
          <section className='section flex_center bg-dark'>
            <HomeBanner />
          </section>

          {/* lista productos */}
          <section className='section products_container bg-secondary'>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}
