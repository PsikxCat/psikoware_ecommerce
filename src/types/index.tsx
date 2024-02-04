export interface ProductVariantsType {
  id: string
  price: number
  inStock: number
  quantity: number
  color: string
  colorCode: string
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
// ! esto hay que ordenarlo !!!
interface DescriptionType {
  title: string
  content: string
}

interface SpecificationType {
  group: string
  content: Array<{ title: string, content: string }>
}

export interface ProductType {
  id: string
  name: string
  brand: string
  category: string
  shortDescription: string
  description: DescriptionType[]
  specifications: SpecificationType[]
  productVariants: ProductVariantsType[]
}
