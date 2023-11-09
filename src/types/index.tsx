export interface productVariantsType {
  id: string
  price: number
  inStock: number
  color?: string
  capacity?: string
  quantity: number
  colorCode: string // ! cambiar tipado a hex
  images: string[]
}

export interface CartProductType {
  id: string
  productVariants: productVariantsType
  name: string
  brand: string
  category: string
}
