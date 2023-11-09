'use client'

import { type CartProductType } from '@/types'
import { createContext, useCallback, useState } from 'react'

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
      const itemExists = prev.find((p) => p.id === item.id)

      if (itemExists) { // : por aqui estabamos antes de tocar la dummydata
        return prev.map((p) => {
          if (p.id === item.id && p.productVariants.color === item.productVariants.color) {
            return {
              ...p,
              quantity: p.quantity + 1
            }
          }
          return p
        })
      }
      return [...prev, { ...item, quantity: 1 }]
    })
    // setCartItems((prev) => {
    //   let updatedCart = [...prev]

    //   if (updatedCart.length > 0) {
    //     updatedCart = [...updatedCart, item]
    //   } else {
    //     updatedCart = [item]
    //   }

    //   return updatedCart
    // })
  }, [])

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
