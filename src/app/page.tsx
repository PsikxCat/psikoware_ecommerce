import { HomeBanner, ProductCard } from '@/components'
import { products } from '@/utils/products'

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
              <ProductCard key={product.id} data={product} />
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}
