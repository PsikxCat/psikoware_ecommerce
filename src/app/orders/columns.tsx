'use client'

import Link from 'next/link'
import { FaRegEye } from 'react-icons/fa'
import dayjs from 'dayjs'
import { type ColumnDef } from '@tanstack/react-table'

import type { OrderType } from '@/types'
import { formatPrice } from '@/utils'

const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<OrderType>[] = [
  {
    header: () => styledHeader('ID de pago'),
    accessorKey: 'paymentId',
    id: 'Orden ID',
    cell: ({ row }) => {
      const name: string = row.getValue('Orden ID')
      return <div className='text-center'>{name}</div>
    }
  },
  {
    header: () => styledHeader('precio'),
    accessorKey: 'amount',
    id: 'Precio',
    cell: ({ row }) => {
      const price: number = row.getValue('Precio')
      return <div className='text-center font-bold'>{formatPrice(price)}</div>
    }
  },
  {
    header: () => styledHeader('Estado de pago'),
    accessorKey: 'status',
    id: 'Estado',
    cell: ({ row }) => {
      const status: string = row.getValue('Estado')
      return (
        <span className={`text-center text-xs font-bold py-1 px-3 rounded-md lowercase
          ${status === 'approved' ? 'text-lime-800 bg-lime-500' : (status === 'in_process' ? 'text-yellow-800 bg-yellow-500' : 'text-pink-800 bg-pink-300')}`}
        >
          {status === 'approved' ? 'Aprobado' : (status === 'rejected' ? 'Rechazado' : (status === 'in_process' ? 'Pendiente' : status))}
        </span>
      )
    }
  },
  {
    header: () => styledHeader('Entrega'),
    accessorKey: 'deliveryStatus',
    id: 'Entrega',
    cell: ({ row }) => {
      const deliveryStatus: string = row.getValue('Entrega')
      const status = row.getValue('Estado')

      return (
        <span className={`text-center text-xs font-bold py-1 px-3 rounded-md lowercase
          ${status === 'rejected' ? 'line-through text-pink-800 bg-pink-300' : (deliveryStatus === 'dispatched' ? 'text-yellow-800 bg-yellow-500' : (deliveryStatus === 'completed' ? 'text-lime-800 bg-lime-500' : 'text-pink-800 bg-pink-300'))}`
        }
        >
          {status !== 'approved' ? 'pendiente' : (deliveryStatus === 'dispatched' ? 'despachada' : (deliveryStatus === 'completed' ? 'completada' : 'pendiente'))}
        </span>
      )
    }
  },
  {
    header: () => styledHeader('Fecha'),
    accessorKey: 'createDateTime',
    id: 'Fecha',
    cell: ({ row }) => {
      const date: string = row.getValue('Fecha')
      return <div className='text-center'>{dayjs(date).format('DD/MM/YYYY')}</div>
    }
  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      const id: string = row.original.id
      return (
        <Link href={`/orders/${id}`} className='text-sushi-800 hover:text-accent transition-all duration-200'>
            <FaRegEye size={20} />
        </Link>
      )
    }
  }
]
