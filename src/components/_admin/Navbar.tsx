'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from 'react-icons/md'

import AdminNavItem from './AdminNavItem'

export default function AdminNavbar() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between md:justify-center gap-8 md:gap-10 p-4 bg-secondary text-lg text-dark font-bold border-b-[3px] border-accent overflow-y-auto flex-nowrap">
      <Link href="/admin">
        <AdminNavItem label="Resumen" icon={MdDashboard} selected={pathname === '/admin'} />
      </Link>

      <Link href="/admin/add-products">
        <AdminNavItem label="Agregar Producto" icon={MdLibraryAdd} selected={pathname === '/admin/add-products'} />
      </Link>

      <Link href="/admin/manage-products">
        <AdminNavItem label="Gestionar Productos" icon={MdDns} selected={pathname === '/admin/manage-products'} />
      </Link>

      <Link href="/admin/orders">
        <AdminNavItem label="Ordenes de Compra" icon={MdFormatListBulleted} selected={pathname === '/admin/orders'} />
      </Link>
    </nav>
  )
}
