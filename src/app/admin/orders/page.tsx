import { getCurrentUser } from '@/libs/actions/getCurrentUser'
import { NullData } from '@/components'

export default async function OrdersPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser || currentUser?.role !== 'ADMIN') {
    return <NullData title="No cuentas con autorización para acceder a esta pagina" />
  }

  return (
    <div>OrdersPage</div>
  )
}
