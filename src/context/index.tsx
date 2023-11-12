'use client'

import type { CartProductType } from '@/types'
import { createContext, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface GlobalStateProps {
  children: React.ReactNode
} // # estos tipados son temporales, y se deberan definir conforme se vayan usando los contextos

export interface GlobalContextType {
  cartTotalQuantity: number
  cartItems: CartProductType[] | [] // ? null instead of [] ?
  handleAddItemToCart: (product: CartProductType) => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export function GlobalState({ children }: GlobalStateProps) {
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0)
  const [cartItems, setCartItems] = useState<CartProductType[] | []>([])

  const handleAddItemToCart = useCallback((item: CartProductType) => {
    setCartItems((prev) => {
      let updatedCart = [...prev]

      if (updatedCart.length > 0) {
        updatedCart = [...updatedCart, item]
      } else {
        updatedCart = [item]
      }

      setCartTotalQuantity(updatedCart.length)

      // persistencia de datos para usuarios no registrados
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      return updatedCart
    })

    toast.success('Producto añadido al carrito')
  }, [])

  // se usa la data en localStorage para setear el estado cartItems
  useEffect(() => { setCartItems(JSON.parse(localStorage.getItem('cart') ?? '[]')) }, [])

  return (
    <GlobalContext.Provider value={{
      cartTotalQuantity,
      cartItems,
      handleAddItemToCart
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
