import { HomeBanner, ProductCard } from '@/components'
import { getCheapestProducts } from '@/libs/actions/getDataFromDB'

export default async function Home() {
  const products = await getCheapestProducts()

  return (
    <section className="w-full flex_center bg-dark">
      <div className="container">
        <main className="w-full flex_center_column">
          {/* banner */}
          <section className='section flex_center bg-dark'>
            <HomeBanner />
          </section>

          {/* lista productos */}
          <section className='w-full flex_center'>
            <h2 className="text-dark bg-secondary py-2 px-[30vw] rounded-t text-center mb-0 uppercase">
              Destacados
            </h2>
          </section>
          <section className='section products_container bg-secondary z-10'>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}
