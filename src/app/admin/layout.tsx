import { AdminNavbar } from '@/components'
import { AdminState } from '@/context/adminContext'

export const metadata = {
  title: 'PsikoWare Admin Dashboard',
  description: 'PsikoWare Admin Dashboard'
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full min-h-[calc(100vh-calc(30px+2vw))] bg-dark border-b-[3px] border-accent">
      <AdminNavbar />

      <AdminState>
        <main className="flex-1 p-4">
          {children}
        </main>
      </AdminState>

    </section>
  )
}
