'use client'

import type { UIProductType } from '@/types'
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
  cartItems: UIProductType[] | []
  currentUser: CurrentUser | null
  handleAddItemToCart: (product: UIProductType) => void
  handleRemoveItemFromCart: (id: string) => void
  handleItemCartQtyDecrease: (item: UIProductType) => void
  handleItemCartQtyIncrease: (item: UIProductType) => void
  handleClearCart: () => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export function GlobalState({ children, currentUser }: GlobalStateProps) {
  const [cartTotalQuantity, setCartTotalQuantity] = useState<number>(0)
  const [cartTotalAmount, setCartTotalAmount] = useState<number>(0)
  const [cartItems, setCartItems] = useState<UIProductType[] | []>([])

  const handleAddItemToCart = useCallback((item: UIProductType) => {
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

  const handleItemCartQtyDecrease = useCallback((item: UIProductType) => {
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

  const handleItemCartQtyIncrease = useCallback((item: UIProductType) => {
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

  useEffect(() => {
    if (cartItems.length > 0) {
      const totalQuantity = cartItems.reduce((acc, item) => acc + item.productVariants.quantity, 0)
      const totalPrice = cartItems.reduce((acc, item) => acc + item.productVariants.price * item.productVariants.quantity, 0)

      setCartTotalQuantity(totalQuantity)
      setCartTotalAmount(totalPrice)
    } else {
      setCartTotalQuantity(0)
      setCartTotalAmount(0)
    }
  }, [cartItems])

  // se usa la data en localStorage para setear el estado cartItems para usuarios no registrados
  useEffect(() => {
    // aplicar la condicional para usuarios no registrados ---TODO
    // si el usuario esta registrado, se usa la data de la db ---TODO
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
