'use client'

import { useState, useEffect } from 'react'
import { useForm, type FieldValues } from 'react-hook-form'
import Link from 'next/link'
import toast from 'react-hot-toast'

import { type ProductType } from '@/types'
import { getProductsBySearch } from '@/libs/actions/getDataFromDB'
import { formatPrice } from '@/utils'
import useDebounce from '@/hooks/useDebounce'

export default function Searchbar() {
  const { register, watch, reset } = useForm<FieldValues>({ defaultValues: { search: '' } })
  const [searchResults, setSearchResults] = useState<ProductType[]>([])

  const searchValue = watch('search')
  const debouncedSearchTerm = useDebounce(searchValue, 500)

  useEffect(() => {
    if (!searchValue || searchValue === '' || searchValue.length < 3) {
      setSearchResults([])
      return
    }

    getProductsBySearch(debouncedSearchTerm)
      .then(results => { setSearchResults(results) })
      .catch(error => {
        console.error('Error fetching products:', error)
        toast.error('Ocurrió un error al buscar los productos.')
      })
  }, [debouncedSearchTerm])

  return (
    <div className="flex_center group">
      {/* search */}
      <input className="py-1 px-3 border border-secondary bg-stone-800 rounded-md focus:outline-none w-80 group-hover:border-accent"
        type="text"
        placeholder="Buscar productos"
        autoComplete="off"
        {...register('search')}
      />

      {/* search results */}
      {searchResults.length > 0 && (
        <article className="absolute top-[calc(30px+2vw)] w-80 bg-stone-700 rounded-md shadow-md z-50">
          {searchResults.map(product => (
            <Link href={`/products/${product.id}`} key={product.id} onClick={() => { reset() }} className="flex items-center gap-2 p-2 hover:bg-dark">
              <img src={product.productVariants[0].images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-xs">{formatPrice(product.productVariants[0].price)}</p>
              </div>
            </Link>
          ))}
        </article>
      )}

      {/* backdrop */}
      {searchResults.length > 0
        ? <div className="z-20 fixed top-[calc(30px+2vw)] left-0 w-full h-full bg-black/50" onClick={() => { reset() }}/>
        : null}
    </div>

  )
}
