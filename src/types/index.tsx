export interface ProductVariantType {
  color: string
  colorCode: string
  images: string[]
}

export interface CartProductType {
  id: string
  name: string
  description: string
  category: number
  brand: string
  price: number
  stock: number
  productVariant: ProductVariantType
  quantity: number
}
