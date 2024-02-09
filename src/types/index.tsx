export interface CartProductType {
  id: string
  name: string
  category: string
  brand: string
  productVariants: ProductVariantType
}

export interface ProductDatabaseType {
  productRef: string
  name: string
  brand: string
  category: string
  shortDescription: string
  description: DescriptionType[]
  specifications: SpecificationGroupType[]
}

export interface ProductType {
  id: string
  name: string
  brand: string
  category: string
  shortDescription: string
  description: DescriptionType[]
  specifications: SpecificationGroupType[]
  productVariants: ProductVariantType[]
}

export interface ProductVariantType {
  variantProductRef?: string
  price: number
  inStock: number
  quantity?: number
  color: string
  colorCode: string
  capacity?: string
  images: string[]
}

export interface DescriptionType {
  title: string
  content: string
}

export interface SpecificationGroupType {
  group: string
  content: SpecificationType[]
}

export interface SpecificationType {
  title: string
  details: string
}
