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

export interface TableProductType extends ProductType {
  productRef: string
  variant: DBProductVariantType
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
  quantity: number
  color: string
  colorCode: string
  capacity?: string | null
  images: string[]
}

export interface DBProductVariantType extends ProductVariantType {
  variantProductRef: string
  productId: string
}

interface OrderProduct {
  id: string
  unitPrice: number
  name: string
  category: string
  quantity: number
  selectedImg: string
}

interface OrderUser {
  name: string
  email: string
}

export interface OrderType {
  id: string
  products: OrderProduct[]
  // address?: null | string // ? falta corregir el tema de la direccion
  amount: number
  status: string
  deliveryStatus: string
  createDateTime: Date
  paymentId: string
  user: OrderUser
}
