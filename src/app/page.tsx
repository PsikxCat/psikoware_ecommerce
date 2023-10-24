import { HomeBanner } from '@/components'
import { products } from '@/utils/products'
import { truncate } from '@/utils'

export default function Home() {
  return (
    <section className="bg-stone-950 w-full flex_center py-4">
      <div className="container">
        <main className="w-full flex_center_column py-8">
          {/* banner */}
          <section className='flex_center'>
            <HomeBanner />
          </section>

          {/* lista productos */}
          <section className='section products_container bg-sushi'>
            {products.map((product) => (
              <div key={product.id} className='border'>
                <h2>{truncate(product.name, 25)}</h2>
              </div>
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}
