<template>
  <div class="flex-center flex-col gap-6 my-28 px-4">
    <CommonImage
      :src="image"
      error-state="/svg/noData/no_statistics.svg"
      image-class="!w-44 !h-auto min-h-36"
    />
    <div class="space-y-2 text-center">
      <p class="text-xl font-extrabold leading-relaxed text-brand-black">
        {{ title }}
      </p>
      <p class="text-sm font-medium leading-130 text-gray-700">
        {{ subtitle }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image?: string
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped></style>
