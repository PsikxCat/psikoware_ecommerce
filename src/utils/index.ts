export const truncate = (str: string, num: number) => {
  if (str.length <= num) {
    return str
  }
  return str.slice(0, num) + '...'
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(price)
}
