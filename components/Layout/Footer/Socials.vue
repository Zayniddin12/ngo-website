<template>
  <div class="flex-y-center gap-3 md:gap-4 !mt-0">
    <ul class="flex gap-4">
      <li
        v-for="(item, idx) in socials"
        :key="idx"
        class="relative bg-white/5 rounded-[40px] w-7 h-7 flex items-center justify-center hover:bg-primary transition-300"
        :class="[bgClass]"
      >
        <a
          class="text-gray leading-6 transition-300 w-9 h-9 rounded-lg flex-center icon_position"
          :href="item?.link"
          target="_blank"
        >
          <CommonImage
            class="w-3.5 h-3.5 object-contain object-center"
            :src="item?.image"
            alt="image"
          />
        </a>
      </li>
    </ul>
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

defineProps<Props>()
</script>

<style scoped>
.icon_position svg {
  margin: 0 !important;
}
</style>
