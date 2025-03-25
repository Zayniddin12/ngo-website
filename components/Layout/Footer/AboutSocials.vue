<template>
  <div class="flex-y-center gap-3 md:gap-4 !mt-0">
    <div v-for="(item, idx) in items" :key="idx" class="flex gap-4">
      <a
        :href="item?.link"
        target="_blank"
        class="relative w-8 h-8 p-2 bg-white/10 rounded-3xl border border-white/10 hover:border-primary transition-300"
        :class="[bgClass]"
      >
        <img :src="item?.img" alt="image" />
      </a>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  iconClass?: string
  bgClass?: string
  socials?: {
    link?: string
    image?: string
  }[]
}

const props = defineProps<Props>()

const items = computed(() => [
  {
    img: '/svg/telegram-color.svg',
    link: props?.socials[0]?.link,
  },
  {
    img: '/svg/insta-color.svg',
    link: props?.socials[1]?.link,
  },
  {
    img: '/svg/facebook-color.svg',
    link: props?.socials[2]?.link,
  },
])
</script>

<style scoped>
.icon_position svg {
  margin: 0 !important;
}
</style>
