import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      ticks: {
        color: '#888888',
        font: {
          size: 14,
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#888888',
        font: {
          size: 14,
        },
      },
    },
  },
}

const labels = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']

export const data = {
  labels,
  datasets: [
    {
      label: 'dataset',
      fill: true,
      data: [
        145000000, 175000000, 185000000, 235000000, 220000000, 160000000,
        190000000,
      ],
      borderColor: '#FF8A48',
      pointBackgroundColor: '#FF8A48',
      tension: 0.5,
      pointRadius: 0,
    },
  ],
}

const LineChart: React.FunctionComponent = () => {
  return <Line options={options} data={data} />
}

export default LineChart
