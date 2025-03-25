<template>
  <div>
    <DoughnutChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ArcElement, Chart, Legend, registerables, Tooltip } from 'chart.js'
import { DoughnutChart } from 'vue-chart-3'

// Custom plugin for rounded edges
const roundEdgesPlugin = {
  id: 'roundEdgesPlugin',
  afterDatasetsDraw(chart: Chart) {
    const ctx = chart.ctx as CanvasRenderingContext2D
    chart.getDatasetMeta(0).data.forEach((arc, index) => {
      const vm = arc.getProps(
        [
          'startAngle',
          'endAngle',
          'innerRadius',
          'outerRadius',
          'backgroundColor',
        ],
        true
      ) as any
      const radius = (vm.outerRadius + vm.innerRadius) / 2
      const thickness = (vm.outerRadius - vm.innerRadius) / 2

      // New drawing logic
      const startAngle = Math.PI - vm.startAngle - Math.PI / 2
      const endAngle = Math.PI - vm.endAngle - Math.PI / 2

      ctx.save()
      ctx.translate(arc.x, arc.y)

      // ctx.fillStyle = index === 0 ? vm.backgroundColor : prevColor;
      ctx.beginPath()
      ctx.arc(
        radius * Math.sin(startAngle),
        radius * Math.cos(startAngle),
        thickness,
        0,
        2 * Math.PI
      )
      ctx.fillStyle = chartData.value.datasets[0].backgroundColor[index]
      ctx.fill()

      // ctx.fillStyle = vm.backgroundColor;
      ctx.beginPath()
      ctx.arc(
        radius * Math.sin(endAngle),
        radius * Math.cos(endAngle),
        thickness,
        0,
        2 * Math.PI
      )
      ctx.fill()

      ctx.restore()
    })
  },
}

const textCenterPlugin = {
  id: 'textCenterPlugin',
  afterDraw(chart: Chart) {
    const ctx = chart.ctx as CanvasRenderingContext2D
    const width = chart.width
    const height = chart.height
    const centerX = width / 2
    const centerY = height / 2
    const customText = {
      text: '',
      color: '#8898AA', // Customize text color
      fontSize: '10px', // Customize font size
    }

    ctx.restore()
    ctx.font = `${customText.fontSize}em sans-serif`
    ctx.textBaseline = 'middle'
    ctx.fillStyle = customText.color

    // Draw the custom text
    ctx.fillText(
      customText.text,
      centerX - ctx.measureText(customText.text).width / 2,
      centerY - parseInt(customText.fontSize, 10)
    )

    // Calculate total sum
    const dataset = chart.data.datasets[0]
    const total = dataset.data.reduce(
      (acc: number, currentValue: number) => acc + currentValue,
      0
    )

    // Customize total sum text properties
    const totalText = {
      text: formatMoneyDecimal(total), // TODO: Replace with total
      color: '#080A15', // Customize total text color
      fontSize: (height / 180).toFixed(2), // Customize total font size
      fontWeight: 'bold',
      fontFamily: "'Vela Sans', sans-serif",
    }

    // Draw the total sum
    ctx.fillStyle = totalText.color
    ctx.font = `${totalText.fontSize}em sans-serif`
    ctx.fillText(
      totalText.text,
      centerX - ctx.measureText(totalText.text).width / 2,
      centerY
    )

    ctx.save()
  },
}

// Register the necessary components and plugin
Chart.register(
  ...registerables,
  ArcElement,
  Tooltip,
  Legend,
  roundEdgesPlugin,
  textCenterPlugin
)

// Chart data
const chartData = ref<any>({
  labels: ['Paris', 'Nîmes', 'Toulon'],
  datasets: [
    {
      data: [70, 20, 120],
      backgroundColor: ['#EDB716', '#E91313', '#62AD5A'],
    },
  ],
})

// Chart options
const chartOptions = ref<any>({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: true,
    },
    roundEdgesPlugin: true, // Enable the custom plugin
  },
  // rotation: -90,
  // circumference: 180,
})
</script>

<style scoped></style>
