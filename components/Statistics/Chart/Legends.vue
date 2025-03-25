<template>
  <div
    class="flex flex-wrap justify-between max-lg:gap-4 lg:flex-col gap-2"
    :class="{ 'divide-y': full }"
  >
    <div
      v-for="(project, idx) in legends"
      :key="idx"
      class="flex-y-center space-x-3"
    >
      <div
        class="w-3 h-3 rounded-[3px]"
        :style="{ background: project.color }"
      />
      <div :class="{ 'flex-y-center justify-between w-full py-3': full }">
        <p class="text-base font-medium leading-tight" :class="titleClass">
          {{ project?.name }}
        </p>
        <p
          v-if="noPercent"
          class="text-xl font-semibold leading-relaxed"
          :class="subtitleClass"
        >
          {{ project?.quantity }}
        </p>
        <p
          v-else
          class="md:text-xl text-sm font-semibold leading-relaxed"
          :class="subtitleClass"
        >
          {{ calculatePercentage(project?.quantity ?? 0) }} ({{
            project?.quantity
          }})
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IChartLegend } from '~/types'

interface Props {
  legends?: IChartLegend[]
  titleClass?: string
  subtitleClass?: string
  full?: boolean
  noPercent?: boolean
}

const props = defineProps<Props>()

const totalProjects = computed(() =>
  props.legends?.reduce(
    (acc: number, cur: IChartLegend) => acc + cur.quantity,
    0
  )
)

const calculatePercentage = (quantity: number) => {
  return ((quantity / totalProjects.value) * 100).toFixed(0) + '%'
}
</script>

<style scoped></style>
