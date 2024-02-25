'use client'

import { useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import toast from 'react-hot-toast'
import { type ColumnDef } from '@tanstack/react-table'
import { HiArrowsUpDown } from 'react-icons/hi2'
import { FiMoreHorizontal } from 'react-icons/fi'

import type { OrderType } from '@/types'
import { formatPrice } from '@/utils'
import { deleteOrder, updateShipment } from '@/libs/actions/updateDataFromDB'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

dayjs.extend(relativeTime)
const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<OrderType>[] = [
  {
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => { table.toggleAllPageRowsSelected(!!value) }}
        aria-label="Select all"
      />
    ),
    id: 'select',
    cell: ({ row }) => (
      <Checkbox
        className='m-auto'
        checked={row.getIsSelected()}
        onCheckedChange={(value) => { row.toggleSelected(!!value) }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    header: () => styledHeader('Orden ID'),
    accessorKey: 'paymentId',
    id: 'Orden ID',
    cell: ({ row }) => {
      const name: string = row.getValue('Orden ID')
      return <div className='text-center'>{name}</div>
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('Cliente')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'user.name',
    id: 'Cliente',
    cell: ({ row }) => {
      const user: string = row.getValue('Cliente')
      return <div className='text-center font-bold'>
        {user.split(' ').slice(0, 2).join(' ')}
      </div>
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('precio')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'amount',
    id: 'Precio',
    cell: ({ row }) => {
      const price: number = row.getValue('Precio')
      return <div className='text-center'>{formatPrice(price)}</div>
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('Estado de pago')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'status',
    id: 'Estado',
    cell: ({ row }) => {
      const status: string = row.getValue('Estado')
      return (
        <span className={`text-center text-xs font-bold py-1 px-3 rounded-md lowercase
          ${status === 'approved' ? 'text-lime-800 bg-lime-500' : (status === 'rejected' ? 'text-pink-800 bg-pink-300' : 'text-yellow-800 bg-yellow-500')}`}
        >
          {status === 'approved' ? 'Aprobado' : (status === 'rejected' ? 'Rechazado' : status)}
        </span>
      )
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('Entrega')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
          {status === 'rejected' ? 'pendiente' : (deliveryStatus === 'dispatched' ? 'despachada' : (deliveryStatus === 'completed' ? 'completada' : 'pendiente'))}
        </span>
      )
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('Fecha')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'createDateTime',
    id: 'Fecha',
    cell: ({ row }) => {
      const date: string = row.getValue('Fecha')
      return <div className='text-center'>{dayjs(date).fromNow()}</div>
    }
  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      const router = useRouter()
      const data = row.original
      const isEnable: boolean = row.getValue('Estado') === 'approved'

      const handleDeleteOrder = async () => {
        try {
          const deletedOrder = await deleteOrder(data.id)
          if (deletedOrder.error) toast.error(deletedOrder.message)

          toast.success(deletedOrder.message)
          router.refresh()
        } catch (error) {
          toast.error('Ocurrio un error al eliminar la orden')
        }
      }

      const handleUpdateShipment = async (newShipmentState: string) => {
        try {
          const updatedShipment = await updateShipment(data.id, newShipmentState)
          if (updatedShipment.error) toast.error(updatedShipment.message)

          toast.success(updatedShipment.message)
          router.refresh()
        } catch (error) {
          toast.error('Ocurrio un error al actualizar el estado de envio')
        }
      }

      return (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <FiMoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className='text-dark'>
        <DropdownMenuItem disabled={isEnable} onClick={async () => { await handleUpdateShipment('dispatched') }}>Pedido enviado</DropdownMenuItem>
        <DropdownMenuItem disabled={isEnable} onClick={async () => { await handleUpdateShipment('completed') }}>Confirmado recibido</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => { console.log('handleOpenDetailsModal') }}>Ver detalles</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteOrder}>Eliminar orden</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
      )
    }
  }
]
