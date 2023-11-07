'use client'

import { createContext, useState } from 'react'

interface GlobalStateProps {
  children: React.ReactNode
}
// # estos tipados son temporales, y se deberan definir conforme se vayan usando los contextos
export interface GlobalContextType {
  cartTotalQuantity: number
  setCartTotalQuantity: (value: number) => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

export function GlobalState({ children }: GlobalStateProps) {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0)

  return (
    <GlobalContext.Provider value={{
      cartTotalQuantity,
      setCartTotalQuantity
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
