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

export interface UIProductType extends ProductCommonFields {
  id: string // ! POR ARREGLAR
  productVariants: ProductVariantType[]
  // reviews: ReviewType[] ?
}

export interface DBProductType extends ProductCommonFields {
  productRef: string // ! PENDIENTE
}

// ! pendiente de analisis
export interface ProductVariantType {
  price: number
  inStock: number
  quantity?: number
  color: string
  colorCode: string
  capacity?: string
  images: string[]
}

export interface DBProductVariantType extends ProductVariantType {
  variantProductRef: string
  productId: string // ? necesario?
}
