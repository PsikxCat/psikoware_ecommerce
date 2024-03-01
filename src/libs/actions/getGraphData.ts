import db from '@/libs/prismadb'
import dayjs from 'dayjs'

export default async function getGraphData() {
  try {
    // fechas inicio y fin del rango (ultimos 7 dias)
    const startDate = dayjs().subtract(6, 'day').startOf('day')
    const endDate = dayjs().endOf('day')

    // capturar las ordenes de los ultimos 7 dias (filtrar por fecha de creacion)
    const orders = await db.order.groupBy({
      by: ['createDateTime'],
      where: {
        createDateTime: { // filtrar por fecha de creacion
          gte: startDate.toISOString(), // greater than or equal
          lte: endDate.toISOString() // less than or equal
        },
        status: 'approved' // solo las ordenes aprobadas
      },
      _sum: {
        amount: true
      }
    })

    // inicializar el objeto (vacio) que almacenara los datos agregados con la estructura esperada (lunes: {day: 'lunes', date: '2021-08-02', totalAmount: 0})
    const aggregatedData: Record<string, { day: string, date: string, totalAmount: number }> = {}

    // clon de startDate para iterar sobre los 7 dias (funcionalidad?)
    let currentDate = startDate.clone()

    // iterar sobre los 7 dias, esta iteracion inicializara los objetos en aggregatedData
    while (currentDate.isSame(endDate) || currentDate.isBefore(endDate)) {
      // formatear la fecha actual a nombre dia 'dddd'
      const day = currentDate.format('dddd')

      // del objeto aggregatedData, inicializar el objeto con la key correspondiente que almacenara los datos de ese dia
      aggregatedData[day] = {
        day,
        date: currentDate.format('YYYY-MM-DD'),
        totalAmount: 0
      }
      // pasar al siguiente dia
      currentDate = currentDate.add(1, 'day')
    }

    // calcular el total de ventas por dia
    orders.forEach((order) => {
      const day = dayjs(order.createDateTime).format('dddd')
      const amount = order._sum.amount ?? 0

      aggregatedData[day].totalAmount += amount
    })

    // convertir el objeto a un array de objetos y ordenar por fecha
    const graphData = Object.values(aggregatedData).sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))

    return graphData
  } catch (error) {
    console.error('getGraphData', error)
  }
}
