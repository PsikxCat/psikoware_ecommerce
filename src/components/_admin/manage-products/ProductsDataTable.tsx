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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

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
  const [rowSelection, setRowSelection] = useState({})

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
    onRowSelectionChange: setRowSelection,

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  return (
    <section>
      {/* Filtrado por nombre & Visibilidad de columnas */}
      <section className="flex items-center py-4">
        {/* Filter */}
        <Input
          placeholder="Filtrar por nombre..."
          value={(table.getColumn('Nombre')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('Nombre')?.setFilterValue(event.target.value)
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

          <DropdownMenuContent align="end">
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
      </section>

      {/* Tabla */}
      <section className='rounded-md border text-dark'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='bg-dark text-muted hover:bg-dark'>
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
                <TableRow className='text-center'
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                <TableCell colSpan={columns.length} className="h-24">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
                )}
          </TableBody>
        </Table>
      </section>

      {/* Info de filas seleccionadas & Paginacion */}
      <section className='flex justify-between gap-3 items-center py-4 px-2'>
        {/* Filas seleccionadas */}
        <div className='flex space-x-3 items-center'>
          <div className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} de{' '}
            {table.getFilteredRowModel().rows.length} elementos seleccionados
          </div>

          {/* si hay filas seleccionadas, mostrar boton para eliminar filas */}
          {table.getFilteredSelectedRowModel().rows.length > 0 && (
            <Button
              className='bg-red-700 text-accent font-bold hover:bg-red-600'
              onClick={() => {
                console.log('Eliminar filas seleccionadas')
              }}
            >
              Eliminar variante(s)
            </Button>
          )}

        </div>

        <div className='flex space-x-3'>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Paginacion */}
          <div className="flex space-x-1">
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
        </div>
        {/* Productos por pagina */}
      </section>
    </section>
  )
}
