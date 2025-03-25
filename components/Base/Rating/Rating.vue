<template>
  <div class="flex-y-center gap-1">
    <div
      v-for="i in calculateRating"
      :key="i"
      class="bg-primary flex-center w-4 h-4 rounded"
    >
      <i-star class="text-xs text-white" />
    </div>
    <div
      v-for="i in 5 - calculateRating"
      :key="i"
      class="bg-gray-600 flex-center w-4 h-4 rounded"
      :class="itemClass"
    >
      <i-star :class="starColor" class="text-xs text-white" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rating: number
  itemClass?: string
  starColor?: string
}
const props = defineProps<Props>()

const calculateRating = computed(() => {
  return Math.round(props.rating)
})
</script>

<style scoped></style>
