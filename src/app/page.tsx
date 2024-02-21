import { HomeBanner, ProductCard } from '@/components'
import { getCheapestProducts } from '@/libs/actions/getDataFromDB'
import Image from 'next/image'

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

          {/* productos destacados (cheapest) */}
          <section className='section flex flex-col products_container bg-secondary z-10'>
            {/* card de seccion */}
            <div className='bg-stone-800 rounded-md flex_center_column uppercase text-accent py-6'>
              <h2 className='m-0 tracking-wider'>Productos</h2>
              <div className='aspect-square overflow-hidden rounded-t-md flex_center'>
                <Image
                  src={'https://firebasestorage.googleapis.com/v0/b/psikoware.appspot.com/o/psikoware%2Fpsikoware.webp?alt=media&token=acd54105-54f0-4930-836a-909e04f92ada'}
                  alt='Psikoware'
                  width={400}
                  height={400}
                />
              </div>
              <h2 className='m-0 tracking-wider'>Destacados</h2>
            </div>

            {/* cards de productos */}
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
        </main>
      </div>
    </section>
  )
}
