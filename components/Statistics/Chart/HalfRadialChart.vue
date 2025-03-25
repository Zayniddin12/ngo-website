<template>
  <div>
    <client-only>
      <apexchart
        type="radialBar"
        width="320"
        :options="chartOptions"
        :series="series"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const series = ref([12])
const chartOptions = ref({
  chart: {
    type: 'radialBar',
    offsetY: 0,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        margin: 0,
        size: '60%',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
      },

      dataLabels: {
        show: true,
        value: {
          offsetY: -40,
          show: true,
          color: '#8E9BA8',
          fontFamily: 'Vela Sans, sans-serif',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: 'normal',
          formatter: () => t('total_requests'),
        },
        name: {
          offsetY: 20,
          show: true,
          color: '#252429',
          fontFamily: "'Vela Sans', sans-serif",
          fontWeight: '700',
          fontSize: '28px',
          lineHeight: '130%',
          formatter: () => formatMoneyDecimal(series.value[0] ?? 0),
        },
      },
    },
  },
  stroke: {
    lineCap: 'round',
    curve: 'smooth',
  },
  labels: [t('total_requests')],
})
</script>
