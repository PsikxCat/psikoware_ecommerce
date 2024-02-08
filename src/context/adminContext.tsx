'use client'

import { createContext, useState } from 'react'

interface AdminStateProps {
  children: React.ReactNode
}

export interface AdminContextType {
  productVariantsImages: File[][]
  setProductVariantsImages: (value: File[][] | ((prevState: File[][]) => File[][])) => void
}

export const AdminContext = createContext<AdminContextType | null>(null)

export function AdminState({ children }: AdminStateProps) {
  const [productVariantsImages, setProductVariantsImages] = useState<File[][]>([])

  return (
    <AdminContext.Provider value={{
      productVariantsImages,
      setProductVariantsImages
    }}>
      {children}
    </AdminContext.Provider>
  )
}
