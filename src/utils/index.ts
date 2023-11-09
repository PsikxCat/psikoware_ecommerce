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

export const productRating = (data: any) => { // ! corregir anys (plural]) //////////////////////////////////
  return data.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / data.reviews.length
}

export const getUserTimeZone = () => {
  const offsetMinutes = new Date().getTimezoneOffset()
  const offsetHours = Math.abs(offsetMinutes / 60)
  const offsetMinutesPart = Math.abs(offsetMinutes % 60)
  const offsetSign = offsetMinutes < 0 ? '+' : '-'

  const userTimeZoneOffset = `${offsetSign}${String(offsetHours).padStart(2, '0')}:${String(offsetMinutesPart).padStart(2, '0')}`

  return userTimeZoneOffset
}
