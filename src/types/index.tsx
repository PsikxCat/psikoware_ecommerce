export interface SelectedImgType {
  color: string
  colorCode: string
  image: string
}

export interface CartProductType {
  id: string
  name: string
  description: string
  category: number
  brand: string
  price: number
  stock: number
  selectedImg: SelectedImgType
  quantity: number
}
