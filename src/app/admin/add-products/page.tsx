import { AddProductForm, FormWrap, NullData } from '@/components'
import { getCurrentUser } from '@/libs/actions/getCurrentUser'

export default async function AddProductsPage() {
  const currentUser = await getCurrentUser()
  console.log('currentUser', currentUser)

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  return (
    <div className="p-8 border">
      <section className="container border">
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </section>
    </div>
  )
}
