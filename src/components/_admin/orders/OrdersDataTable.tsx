'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel
} from '@tanstack/react-table'

import { deleteOrder } from '@/libs/actions/updateDataFromDB'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

interface OrdersDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function OrdersDataTable<TData, Tvalue>({
  columns, data
}: OrdersDataTableProps<TData, Tvalue>) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isBackdropOpen, setIsBackdropOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),

    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnVisibility
    }
  })

  const handleDeleteMultipleOrders = (rows: any) => {
    setIsLoading(true)
    toast('Eliminando variantes...', { icon: '🗑️' })

    rows.forEach(async (row: any) => {
      const deletedOrder = await deleteOrder(row.original.variant.id)
      if (deletedOrder?.error) toast.error(deletedOrder.message)

      if (deletedOrder?.ok) toast.success(deletedOrder.message)
    })

    setIsLoading(false)
    handleCloseModal()

    router.refresh()
  }

  const handleOpenDeleteModal = () => {
    setIsBackdropOpen(true)
    setIsDeleteModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsBackdropOpen(false)
    setIsDeleteModalOpen(false)
  }

  return (
    <div className='relative'>
      {/* Visibilidad de columnas */}
      <section className='py-4 flex justify-end'>
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
                  <TableRow className='text-center h-14'
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
      <section className='flex justify-between gap-3 items-center py-4 px-2 max-[800px]:flex-col-reverse max-[800px]:items-end'>
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
              disabled={isLoading}
              onClick={handleOpenDeleteModal}
            >
              Eliminar orden(es)
            </Button>
          )}
        </div>

        {/* Paginacion */}
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
              {[10, 20, 30].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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

        {/* Modal de eliminacion */}
        {isDeleteModalOpen && (
          <section className="flex_center_column z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted bg-dark p-4 rounded-lg text-center">
            <h1 className="text-2xl text-accent">Eliminar multiples ordenes de compra</h1>

            <div className='p-4 flex_center_column text-lg'>
              <p>Esta acción eliminará las ordenes de la base de datos.</p>
              <p className='mt-6'>¿Estás seguro de que quieres eliminar las ordenes seleccionadas?</p>
            </div>

            <div className='flex justify-end w-full gap-4 mt-4'>
              <Button variant="ghost" disabled={isLoading} onClick={handleCloseModal}>Cancelar</Button>
              <Button
                variant="destructive"
                disabled={isLoading}
                onClick={() => { handleDeleteMultipleOrders(table.getFilteredSelectedRowModel().rows) }}>
                  Eliminar
              </Button>
            </div>
          </section>
        )}

        {/* Backdrop */}
        {isBackdropOpen
          ? <div className="absolute z-40 top-0 left-0 w-full h-[100%] bg-black/50" onClick={handleCloseModal}/>
          : null
        }
      </section>
    </div>
  )
}
