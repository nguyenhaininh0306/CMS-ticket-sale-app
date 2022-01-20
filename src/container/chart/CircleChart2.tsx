import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
}

export const data = {
  labels: ['Vé đã sử dụng', 'Vé chưa sử dụng'],
  datasets: [
    {
      label: 'Gói sự kiện',
      data: [13568, 56024],
      backgroundColor: ['#FF8A48', '#4F75FF'],
      borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
      borderWidth: 1,
    },
  ],
}

const CircleChart2: React.FunctionComponent = () => {
  return <Doughnut data={data} options={options} />
}

export default CircleChart2
