import { HomeBanner, ProductCard } from '@/components'
import { products } from '@/utils/dummyData'
// ! en lugar de traer los productos de un archivo, se traerían de la base de datos

export default function Home() {
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
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}
