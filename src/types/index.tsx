export interface ProductVariantsType {
  id: string
  price: number
  inStock: number
  quantity: number
  color: string
  colorCode: string // ! cambiar tipado a hex
  capacity?: string
  images: string[]
}

export interface CartProductType {
  id: string
  name: string
  category: string
  brand: string
  productVariants: ProductVariantsType
}
