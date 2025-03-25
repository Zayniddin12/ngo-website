<template>
  <NuxtMarquee
    :direction="direction ?? 'left'"
    class="py-2"
    :auto-fill="!!autoFill"
  >
    <div class="flex-x-center space-x-9 mx-3">
      <div v-for="(item, key) in items" :key class="flex-y-center space-x-1">
        <NuxtImg
          alt="image"
          :src="item?.image_url"
          :class="imgStyle"
          class="w-full h-7"
        />
      </div>
    </div>
  </NuxtMarquee>
</template>

<script setup lang="ts">
interface Props {
  items?: any[]
  reverseDirection?: boolean
  direction?: 'left' | 'right'
  imgStyle?: string
  autoFill?: boolean
}
defineProps<Props>()
</script>

<style>
.swiper-wrapper {
  -webkit-transition-timing-function: linear !important;
  transition-timing-function: linear !important;
}
</style>
