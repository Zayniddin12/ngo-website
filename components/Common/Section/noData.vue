<template>
  <div
    class="min-h-[200px] flex items-center justify-center my-20 container"
    :class="$attrs.class"
  >
    <div>
      <div class="flex items-center justify-center">
        <CommonImage
          class="w-[150px] h-[150px]"
          :src="image ?? '/svg/in-progress.svg'"
        />
      </div>
      <h5
        class="mb-2 text-brand-black font-bold text-xl md:text-2xl text-center mt-6 overflow-ellipsis leading-130"
      >
        {{ title }}
      </h5>
      <p
        class="font-samibold overflow-ellipsis text-base text-center leading-130 text-info"
      >
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
  loading?: boolean
}

defineProps<Props>()
</script>

<style lang="scss" scoped></style>
