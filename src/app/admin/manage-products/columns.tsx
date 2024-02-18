'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { FiMoreHorizontal } from 'react-icons/fi'
import { HiArrowsUpDown } from 'react-icons/hi2'

import { type TableProductType } from '@/types'
import { formatPrice } from '@/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent
} from '@/components/ui/dropdown-menu'

const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<TableProductType>[] = [
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('categoría')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'category',
    cell: ({ row }) => {
      const name = row.getValue('category')
      return <div className='text-center uppercase'>{name as string}</div>
    }

  },
  {
    header: () => styledHeader('referencia'),
    accessorKey: 'variant.variantProductRef',
    cell: ({ row }) => {
      const variantProductRef = row.original.variant.variantProductRef
      return <div className='text-center'>{variantProductRef}</div>
    }
  },
  {
    header: () => styledHeader('nombre'),
    accessorKey: 'name',
    cell: ({ row }) => {
      const name = row.getValue('name')
      return <div className='font-bold text-center'>{name as string}</div>
    }
  },
  {
    header: () => styledHeader('color'),
    accessorKey: 'variant.color',
    cell: ({ row }) => {
      const color = row.original.variant.color
      return <div className='text-center'>{color === 'Unicolor' ? '-' : color}</div>
    }

  },
  {
    header: () => styledHeader('capacidad'),
    accessorKey: 'variant.capacity',
    cell: ({ row }) => {
      const capacity = row.original.variant.capacity
      return <div className='text-center'>{capacity ?? '-'}</div>
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
    accessorKey: 'variant.price',
    cell: ({ row }) => {
      const price = row.original.variant.price
      return <div className='text-center'>{formatPrice(price)}</div>
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('stock')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'variant.inStock',
    cell: ({ row }) => {
      const inStock = row.original.variant.inStock
      return <div className={`font-bold text-center
      ${(inStock === 1 || inStock === 2) ? 'text-orange-900' : 'text-dark'} ${inStock === 0 ? 'text-red-700' : 'text-dark'}`}>
        {inStock}
      </div>
    }

  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const data = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <FiMoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className='bg-sushi-600 text-dark'>
            <DropdownMenuLabel>Variante {data.variant.variantProductRef}</DropdownMenuLabel>
            <DropdownMenuItem>Actualizar stock</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>Editar variante</DropdownMenuItem>
            <DropdownMenuItem>Eliminar variante</DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Producto Global</DropdownMenuSubTrigger>

              <DropdownMenuPortal>
              <DropdownMenuSubContent className='bg-sushi-600 text-dark'>
                <DropdownMenuLabel>Referencia Global {data.productRef}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Editar producto global</DropdownMenuItem>
                <DropdownMenuItem>Eliminar producto global</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
