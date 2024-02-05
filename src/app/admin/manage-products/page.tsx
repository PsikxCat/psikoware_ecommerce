import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { NullData } from '@/components'

export default async function ManageProductsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  return (
    <div>ManageProductsPage</div>
  )
}
