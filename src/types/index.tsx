export interface ProductVariantType {
  id: string
  price: number
  inStock: boolean
  color?: string
  capacity?: string
  quantity: number
  colorCode: string
  images: string[]
}

export interface CartProductType {
  id: string
  productVariant: ProductVariantType
  name: string
  brand: string
  category: string
}
