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
    id: 'Categoría',
    cell: ({ row }) => {
      const name = row.getValue('Categoría')
      return <div className='text-center uppercase'>{name as string}</div>
    }

  },
  {
    header: () => styledHeader('referencia'),
    accessorKey: 'variant.variantProductRef',
    id: 'Referencia variante',
    cell: ({ row }) => {
      const variantProductRef: string = row.getValue('Referencia variante')
      return <div className='text-center'>{variantProductRef}</div>
    }
  },
  {
    header: () => styledHeader('nombre'),
    accessorKey: 'name',
    id: 'Nombre',
    cell: ({ row }) => {
      const name = row.getValue('Nombre')
      return <div className='font-bold text-center'>{name as string}</div>
    }
  },
  {
    header: () => styledHeader('color'),
    accessorKey: 'variant.color',
    id: 'Color',
    cell: ({ row }) => {
      const color: string = row.getValue('Color')
      return <div className='text-center'>{color === 'Unicolor' ? '-' : color}</div>
    }

  },
  {
    header: () => styledHeader('capacidad'),
    accessorKey: 'variant.capacity',
    id: 'Capacidad',
    cell: ({ row }) => {
      const capacity: string = row.getValue('Capacidad') || '-'
      return <div className='text-center'>{capacity}</div>
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
          {styledHeader('stock')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'variant.inStock',
    id: 'Stock',
    cell: ({ row }) => {
      const inStock: number = row.getValue('Stock')
      return <div className={`font-bold text-center
      ${(inStock === 1 || inStock === 2) ? 'text-orange-900' : 'text-dark'} ${inStock === 0 ? 'text-red-700' : 'text-dark'}`}>
        {inStock}
      </div>
    }

  },
  {
    id: 'acciones',
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
