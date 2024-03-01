'use client'

import { Chart as ChartJS, BarElement, Tooltip, CategoryScale, LinearScale, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, Tooltip, CategoryScale, LinearScale, Legend)

interface GraphData {
  day: string
  date: string
  totalAmount: number
}
interface BarGraphProps {
  data: GraphData[] | undefined
}

export default function BarGraph({ data }: BarGraphProps) {
  const labels = data?.map((item) => item.day)
  const amounts = data?.map((item) => item.totalAmount)

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Ventas',
        data: amounts,
        backgroundColor: 'rgba(130, 159, 67, 0.5)',
        borderColor: 'rgba(130, 159, 67, 1)',
        borderWidth: 2,
        borderRadius: 5,
        barPercentage: 0.8
      }
    ]
  }

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'rgba(234, 179, 8, 0.8)',
          font: {
            size: 14
          }
        },
        grid: {
          color: 'rgba(234, 179, 8, 0.2)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(234, 179, 8, 0.8)',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(234, 179, 8, 0.2)'
        }
      }
    }
  }

  return (
    <Bar data={chartData} options={options} />
  )
}
