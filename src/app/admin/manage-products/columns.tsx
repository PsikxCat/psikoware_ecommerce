'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type ColumnDef } from '@tanstack/react-table'
import { FiMoreHorizontal } from 'react-icons/fi'
import { HiArrowsUpDown } from 'react-icons/hi2'
import toast from 'react-hot-toast'

import { type TableProductType } from '@/types'
import { formatPrice, truncate } from '@/utils'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
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
import { updateStock, deleteVariantProduct, deleteProduct } from '@/libs/actions/updateDataFromDB'
import Image from 'next/image'

const styledHeader = (label: string) => <h4 className="font-bold uppercase">{label}</h4>

export const columns: ColumnDef<TableProductType>[] = [
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
    header: () => styledHeader('imagen'),
    id: 'Imagen',
    cell: ({ row }) => {
      const image: string = row.original.variant.images[0]
      return (
        <div className='w-full h-16 flex_center'>
          <Image
            src={image}
            alt="imagen"
            width={80}
            height={80}
          />
        </div>
      )
    }
  },
  {
    header: ({ column }) => {
      return (
        <Button variant="ghost" className='hover:bg-stone-700'
          onClick={() => { column.toggleSorting(column.getIsSorted() === 'asc') }}
        >
          {styledHeader('Ref')}
          <HiArrowsUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
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
      return <div className='min-w-[150px]'>
        <p className='font-bold text-center'>
          {truncate(name as string, 60)}
        </p>
      </div>
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
      return (
      <div
        className={`font-bold text-center ${(inStock === 1 || inStock === 2) ? 'text-orange-800' : 'text-dark'} ${inStock === 0 ? 'text-red-700' : 'text-dark'}`}
      >
        {inStock === 0 ? 'Sin Stock' : inStock }
      </div>
      )
    }

  },
  {
    id: 'acciones',
    cell: ({ row }) => {
      const router = useRouter()
      const data = row.original
      const storage = getStorage()

      const [isLoading, setIsLoading] = useState(false)
      const [isBackdropOpen, setIsBackdropOpen] = useState(false)
      const [isStockModalOpen, setIsStockModalOpen] = useState(false)
      const [isDeleteVarProductModalOpen, setIsDeleteVarProductModalOpen] = useState(false)
      const [isDeleteGlobalProductModalOpen, setIsDeleteGlobalProductModalOpen] = useState(false)

      const stockRef = useRef<HTMLInputElement>(null)

      const handleCloseModal = () => {
        setIsStockModalOpen(false)
        setIsBackdropOpen(false)
        setIsDeleteVarProductModalOpen(false)
        setIsDeleteGlobalProductModalOpen(false)
      }

      const handleOpenStockModal = () => {
        setIsStockModalOpen(true)
        setIsBackdropOpen(true)
      }

      const handleOpenDeleteVarProductModal = () => {
        setIsDeleteVarProductModalOpen(true)
        setIsBackdropOpen(true)
      }

      const handleOpenDeleteGlobalProductModal = () => {
        setIsDeleteGlobalProductModalOpen(true)
        setIsBackdropOpen(true)
      }

      const handleUpdateStock = async () => {
        setIsLoading(true)

        const updatedStock = await updateStock(data.variant.id, Number(stockRef.current!.value))
        if (updatedStock?.ok) toast.success('Stock actualizado')
        if (updatedStock?.error) toast.error(updatedStock.message)

        setIsLoading(false)
        handleCloseModal()

        router.refresh()
      }

      const handleDeleteVariantProduct = async () => {
        toast('Eliminando variante...', { icon: '🗑️' })
        setIsLoading(true)

        const deletedVariant = await deleteVariantProduct(data.variant.id)

        if (deletedVariant?.error) toast.error(deletedVariant.message)

        // Eliminar imagenes de la variante de firebase storage
        await (async () => {
          try {
            for (const image of data.variant.images) {
              const imageRef = ref(storage, image)
              await deleteObject(imageRef)
              console.log('Imagen eliminada:', image)
            }
          } catch (error) {
            console.error(error)
            toast.error('Ocurrio un error al eliminar las imagenes')
          }
        })()

        if (deletedVariant?.ok) toast.success('Variante eliminada')

        // si no hay mas variantes, eliminar el producto global
        if (data.productVariants.length === 1) await deleteProduct(data.id)

        setIsLoading(false)
        handleCloseModal()

        router.refresh()
      }

      const handleDeleteGlobalProduct = async () => {
        toast('Eliminando producto...', { icon: '🗑️' })
        setIsLoading(true)

        const deletedProduct = await deleteProduct(data.id)
        if (deletedProduct?.error) toast.error(deletedProduct.message)

        // Eliminar imagenes de todas las variantes de firebase storage
        await (async () => {
          try {
            for (const variant of data.productVariants) {
              for (const image of variant.images) {
                const imageRef = ref(storage, image)
                await deleteObject(imageRef)
                console.log('Imagen eliminada:', image)
              }
            }
          } catch (error) {
            console.error(error)
            toast.error('Ocurrio un error al eliminar las imagenes')
          }
        })()

        if (deletedProduct?.ok) toast.success('Producto eliminado')

        setIsLoading(false)
        handleCloseModal()

        router.refresh()
      }

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <FiMoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className='text-dark'>
              <DropdownMenuLabel>Variante {data.variant.variantProductRef}</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleOpenStockModal}>Actualizar stock</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Editar variante</DropdownMenuItem>
              <DropdownMenuItem onClick={handleOpenDeleteVarProductModal}>Eliminar variante</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Producto Global</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                <DropdownMenuSubContent className='text-dark'>
                  <DropdownMenuLabel>Referencia Global {data.productRef}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Editar producto global</DropdownMenuItem>
                  <DropdownMenuItem onClick={handleOpenDeleteGlobalProductModal}>Eliminar producto global</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Backdrop */}
          {isBackdropOpen
            ? <div className="absolute z-40 top-0 left-0 w-full h-full bg-black/50" onClick={handleCloseModal}/>
            : null
          }

          {/* Modal actualizar stock */}
          {isStockModalOpen && (
            <section className="flex_center_column z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted bg-dark p-4 rounded-lg">
              <h1 className="text-2xl text-primary">Actualizar stock</h1>
              <p className='text-lg p-2'>Ingresa la cantidad de stock disponible para la variante de producto {data.variant.variantProductRef}</p>
              <Input type="number" className='w-16' defaultValue={data.variant.inStock} ref={stockRef}/>
              <div className="flex justify-end gap-4 mt-8">
                <Button variant="ghost" disabled={isLoading} onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="secondary" disabled={isLoading} onClick={handleUpdateStock}>Actualizar</Button>
              </div>
            </section>
          )}

          {/* Modal eliminar variante de producto */}
          {isDeleteVarProductModalOpen && (
            <section className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted bg-dark p-4 rounded-lg">
              <h1 className="text-2xl text-accent">Eliminar variante de producto</h1>

              {data.productVariants.length > 1
                ? (
                <div className='p-4 flex_center_column text-lg'>
                  <p>Esta acción eliminará la variante de producto {data.variant.variantProductRef} de la base de datos</p>
                  <p>¿Estás seguro que deseas eliminar la variante?</p>
                </div>
                  )
                : (
                <div className='p-4 flex_center_column text-lg'>
                  <p>El producto global {data.productRef} solo tiene una variante.</p>
                  <p>Esta acción eliminará el producto global {data.productRef} de la base de datos</p>
                  <p className='mt-6'>¿Estás seguro que deseas eliminar el producto global?</p>
                </div>
                  )}

              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" disabled={isLoading} onClick={handleCloseModal}>Cancelar</Button>
                {data.productVariants.length > 1
                  ? <Button variant="destructive" disabled={isLoading} onClick={handleDeleteVariantProduct}>Eliminar</Button>
                  : <Button variant="destructive" disabled={isLoading} onClick={handleDeleteGlobalProduct}>Eliminar</Button>
                }
              </div>
            </section>
          )}

          {/* Modal eliminar producto global */}
          {isDeleteGlobalProductModalOpen && (
            <section className="z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-muted bg-dark p-4 rounded-lg">
              <h1 className="text-2xl text-accent">Eliminar producto global</h1>
              <div className='p-4 flex_center_column text-lg'>
                <p>Esta acción eliminará el producto global {data.productRef} de la base de datos</p>
                <p className='mt-6'>¿Estás seguro que deseas eliminar el producto global?</p>
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="ghost" onClick={handleCloseModal}>Cancelar</Button>
                <Button variant="destructive" onClick={handleDeleteGlobalProduct}>Eliminar</Button>
              </div>
            </section>
          )}
        </>
      )
    }
  }
]
