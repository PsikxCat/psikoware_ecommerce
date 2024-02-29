'use client'

import type { CartProductType } from '@/types'
import { createContext, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface CurrentUser {
  id: string
  name: string
  email: string
  emailVerified: string | null
  image: string | null
  createdAt: string
  updatedAt: string
  role: string
}

interface GlobalStateProps {
  children: React.ReactNode
  currentUser: CurrentUser | null
}

export interface GlobalContextType {
  cartTotalQuantity: number
  cartTotalAmount: number
  cartItems: CartProductType[] | []
  currentUser: CurrentUser | null
  handleAddItemToCart: (product: CartProductType) => void
  handleRemoveItemFromCart: (id: string) => void
  handleItemCartQtyDecrease: (item: CartProductType) => void
  handleItemCartQtyIncrease: (item: CartProductType) => void
  handleClearCart: () => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export function GlobalState({ children, currentUser }: GlobalStateProps) {
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0)
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0)
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

      // persistencia de datos
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      return updatedCart
    })

    toast.success('Producto añadido al carrito')
  }, [cartItems])

  const handleRemoveItemFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const updatedCart = prev.filter((item) => item.productVariant.id !== id)

      setCartTotalQuantity(updatedCart.length)

      // persistencia de datos
      localStorage.setItem('cart', JSON.stringify(updatedCart))

      return updatedCart
    })

    toast.success('Producto eliminado del carrito')
  }, [cartItems])

  const handleItemCartQtyDecrease = useCallback((item: CartProductType) => {
    const updatedCart = [...cartItems]

    const itemIndex = updatedCart.findIndex((cartItem) => cartItem.productVariant.id === item.productVariant.id)

    if (itemIndex > -1 && (updatedCart[itemIndex].productVariant.quantity) <= 1) {
      handleRemoveItemFromCart(item.productVariant.id)
    } else {
      updatedCart[itemIndex].productVariant.quantity = (updatedCart[itemIndex].productVariant.quantity) - 1
      setCartItems(updatedCart)
    }

    // persistencia de datos
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }, [cartItems])

  const handleItemCartQtyIncrease = useCallback((item: CartProductType) => {
    const updatedCart = [...cartItems]

    const itemIndex = updatedCart.findIndex((cartItem) => cartItem.productVariant.id === item.productVariant.id)

    if (itemIndex > -1 && (updatedCart[itemIndex].productVariant.quantity) >= item.productVariant.inStock) {
      toast.error('No hay mas stock de este producto')
    } else {
      updatedCart[itemIndex].productVariant.quantity = (updatedCart[itemIndex].productVariant.quantity) + 1
      setCartItems(updatedCart)
    }

    // persistencia de datos
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }, [cartItems])

  const handleClearCart = useCallback(() => {
    setCartItems([])
    setCartTotalQuantity(0)

    toast.success('Carrito vaciado')

    // persistencia de datos
    localStorage.setItem('cart', JSON.stringify([]))
  }, [])

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalQuantity = cartItems.reduce((acc, item) => acc + (item.productVariant.quantity), 0)
      const totalPrice = cartItems.reduce((acc, item) => acc + item.productVariant.price * (item.productVariant.quantity), 0)

      setCartTotalQuantity(totalQuantity)
      setCartTotalAmount(totalPrice)
    } else {
      setCartTotalQuantity(0)
      setCartTotalAmount(0)
    }
  }, [cartItems])

  // se usa la data en localStorage para setear el estado cartItems
  useEffect(() => {
    setCartItems(JSON.parse(localStorage.getItem('cart') ?? '[]'))
  }, [])

  return (
    <GlobalContext.Provider value={{
      cartTotalQuantity,
      cartTotalAmount,
      cartItems,
      currentUser,
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
