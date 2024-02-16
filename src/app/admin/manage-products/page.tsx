import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { getAllProducts } from '@/libs/actions/getDataFromDB'
import { NullData, ManageProducts } from '@/components'

export default async function ManageProductsPage() {
  const currentUser = await getCurrentUser()
  const products = await getAllProducts()

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización p ara acceder a esta pagina" />
  }

  return (
    <div className="p-8">
    <section className="container">
      <ManageProducts products={products} />
    </section>
  </div>

  )
}
