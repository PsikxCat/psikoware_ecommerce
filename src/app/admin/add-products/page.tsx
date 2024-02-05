import { AddProductForm, FormWrap, NullData } from '@/components'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'

export default async function AddProductsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  return (
    <div className="p-8">
      <section className="container">
        <FormWrap wider>
          <AddProductForm />
        </FormWrap>
      </section>
    </div>
  )
}
