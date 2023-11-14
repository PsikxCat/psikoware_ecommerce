'use client'

import type { CartProductType } from '@/types'
import { createContext, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface GlobalStateProps {
  children: React.ReactNode
}
// # estos tipados son temporales, y se deberan definir conforme se vayan usando los contextos y la entrada de datos desde la db
export interface GlobalContextType {
  cartTotalQuantity: number
  cartItems: CartProductType[] | [] // ? null instead of [] ?
  handleAddItemToCart: (product: CartProductType) => void
  handleRemoveItemFromCart: (id: string) => void
  handleItemCartQtyDecrease: (item: CartProductType) => void
  handleItemCartQtyIncrease: (item: CartProductType) => void
  handleClearCart: () => void
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

      // persistencia de datos (especificamente para usuarios no registrados?)
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      return updatedCart
    })

    toast.success('Producto añadido al carrito')
  }, [cartItems])
  const handleRemoveItemFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.productVariants.id !== id)

      setCartTotalQuantity(updatedCart.length)

      // persistencia de datos (usuarios no registrados)
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      return updatedCart
    })

    toast.success('Producto eliminado del carrito')
  }, [cartItems])
  const handleItemCartQtyDecrease = useCallback((item: CartProductType) => {
    const updatedCart = [...cartItems]

    const itemIndex = updatedCart.findIndex((cartItem) => cartItem.productVariants.id === item.productVariants.id)

    if (itemIndex > -1 && updatedCart[itemIndex].productVariants.quantity <= 1) {
      handleRemoveItemFromCart(item.productVariants.id)
    } else {
      updatedCart[itemIndex].productVariants.quantity--
      setCartItems(updatedCart)
    }

    // persistencia de datos (usuarios no registrados)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }, [cartItems])
  const handleItemCartQtyIncrease = useCallback((item: CartProductType) => {
    const updatedCart = [...cartItems]

    const itemIndex = updatedCart.findIndex((cartItem) => cartItem.productVariants.id === item.productVariants.id)

    if (itemIndex > -1 && updatedCart[itemIndex].productVariants.quantity >= item.productVariants.inStock) {
      toast.error('No hay mas stock de este producto')
    } else {
      updatedCart[itemIndex].productVariants.quantity++
      setCartItems(updatedCart)
    }

    // persistencia de datos (usuarios no registrados)
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }, [cartItems])
  const handleClearCart = useCallback(() => {
    setCartItems([])
    setCartTotalQuantity(0)

    toast.success('Carrito vaciado')

    // persistencia de datos (usuarios no registrados)
    localStorage.setItem('cart', JSON.stringify([]))
  }, [])

  // se usa la data en localStorage para setear el estado cartItems para usuarios no registrados
  useEffect(() => {
    // aplicar la condicional para usuarios no registrados
    // si el usuario esta registrado, se usa la data de la db
    setCartItems(JSON.parse(localStorage.getItem('cart') ?? '[]'))
  }, [])

  return (
    <GlobalContext.Provider value={{
      cartTotalQuantity,
      cartItems,
      handleAddItemToCart,
      handleRemoveItemFromCart,
      handleItemCartQtyDecrease,
      handleItemCartQtyIncrease,
      handleClearCart
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
