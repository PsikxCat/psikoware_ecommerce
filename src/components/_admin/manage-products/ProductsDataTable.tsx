'use client'

import { useState } from 'react'
import {
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  flexRender,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface ProductsDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function ProductsDataTable<TData, Tvalue>({
  columns, data
}: ProductsDataTableProps<TData, Tvalue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    }
  })

  return (
    <section>
      {/* Filtrado por nombre y visibilidad de columnas */}
      <div className="flex items-center py-4">
        {/* Filter */}
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn('Referencia variante')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('Referencia variante')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto bg-accent text-dark">
              Ver columnas
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className='bg-secondary'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => { column.toggleVisibility(!!value) }}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <div className='rounded-md border bg-secondary text-dark'>
        <Table>
          <TableHeader className='bg-stone-800 text-muted'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className='text-center' key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length
              ? (
                  table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='hover:bg-sushi-600'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
                  ))
                )
              : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {/* Paginacion */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          className='bg-stone-800 text-muted hover:bg-stone-700'
          variant="outline"
          size="sm"
          onClick={() => { table.previousPage() }}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          className='bg-stone-800 text-muted hover:bg-stone-700'
          variant="outline"
          size="sm"
          onClick={() => { table.nextPage() }}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </section>
  )
}
