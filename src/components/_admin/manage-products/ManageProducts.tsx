'use client'

import { ProductsDataTable } from '@/components'
import type { ProductType } from '@/types'
import { columns } from '@/app/admin/manage-products/columns'

interface ManageProductsProps {
  products: ProductType[]
}

export default function ManageProducts({ products }: ManageProductsProps) {
  const mappedProducts = products.flatMap((product) =>
    product.productVariants.map(variant => ({
      ...product,
      variant
    }))
  )

  return (
    <section className='w-full flex flex-col z-10'>
      <h2 className="text-accent text-center my-2">Gestionar productos</h2>
      <p className='p-2 w-full text-center'>Se muestran las variantes de los productos</p>

      <ProductsDataTable columns={columns} data={mappedProducts} />
    </section>
  )
}
