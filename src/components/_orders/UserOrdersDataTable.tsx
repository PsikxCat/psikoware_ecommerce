'use client'

import { type ColumnDef, useReactTable, flexRender, getCoreRowModel } from '@tanstack/react-table'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface OrdersDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export default function OrdersDataTable<TData, Tvalue>({
  columns, data
}: OrdersDataTableProps<TData, Tvalue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()

  })

  return (
    <section className='rounded-md border text-dark'>
      <Table className='sm:w-[70vw]'>
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
  )
}
