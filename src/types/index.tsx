interface ProductCommonFields {
  name: string
  brand: string
  category: string
  shortDescription: string
  description: DescriptionType[]
  specifications: SpecificationGroupType[]
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

export interface ReviewType {
  id: string
  userId: string
  productId: string
  rating: number
  comment: string
  createDateTime: Date
}

export interface ProductType extends ProductCommonFields {
  id: string
  productVariants: ProductVariantType[]
  reviews: ReviewType[] | []
}

export interface DBProductType extends ProductCommonFields {
  productRef: string
}

export interface CartProductType extends ProductCommonFields {
  id: string
  // productRef: string
  productVariant: ProductVariantType
  reviews: ReviewType[] | []
}

export interface ProductVariantType {
  id: string
  price: number
  inStock: number
  quantity?: number | null
  color: string
  colorCode: string
  capacity?: string | null
  images: string[]
}

export interface DBProductVariantType extends ProductVariantType {
  variantProductRef: string
  productId: string
}
