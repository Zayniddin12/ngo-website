<template>
  <div class="flex-y-center flex-1 space-x-2.5 p-2 rounded-lg">
    <div class="w-1 h-8 bg-primary rounded-full"></div>
    <div class="space-y-1">
      <p class="text-xs font-normal leading-none text-gray-700">
        {{ title }}
      </p>
      <p
        class="text-base font-bold leading-tight text-brand-black whitespace-nowrap"
      >
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  titleClass?: string
  subtitleClass?: string
}
defineProps<Props>()
</script>

<style scoped></style>
