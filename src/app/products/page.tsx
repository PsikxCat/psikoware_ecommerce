import { Categories, ProductCard } from '@/components'
import { getAllProducts, getProductsByCategory } from '@/libs/actions/getDataFromDB'

interface ProductsPageProps {
  searchParams: Record<string, string | undefined>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const category = searchParams?.category ?? 'Todos'

  let products = []
  if (category === 'Todos' || !category) products = await getAllProducts()
  else products = await getProductsByCategory(category)

  return (
    <section className="w-full flex flex-col items-center bg-dark">
      <Categories category={category} />

      <div className="container bg-secondary pt-[55px] min-h-[calc(100vh-calc(30px+2vw)-20vh)]">
        {products.length > 0
          ? (
          <section className='section products_container bg-secondary z-10'>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </section>
            )
          : (
          <h2 className='text-center text-2xl text-dark'>No se encontraron productos</h2>
            )}
      </div>
    </section>
  )
}
