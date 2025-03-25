<template>
  <div
    v-if="!loading"
    :class="$attrs.class"
    class="grid grid-cols-2 sm:gap-4 gap-3 w-full"
  >
    <div
      v-for="(img, idx) in images"
      :key="idx"
      class="sm:h-[183px] h-[92px] cursor-pointer"
      @click="openModal(idx)"
    >
      <img
        :src="img?.file || img?.image || '/images/info-detail.svg'"
        alt="image"
        class="w-full h-full object-cover rounded-xl"
      />
    </div>
  </div>
  <div v-else class="grid grid-cols-2 gap-4 w-full">
    <div v-for="key in 6" :key class="h-[183px] w-full shimmer rounded-lg" />
  </div>
  <NewsLightbox
    :show="showLightbox"
    :images="images?.map((item) => {
      if (item?.file) {
        return item.file
      } else {
        return item.image
      }
    })!"
    :active="activeIndex"
    @close="closeModal"
  />
</template>

<script setup lang="ts">
interface Props {
  images?: {
    name: string
    file?: string
    image?: string
  }[]
  loading?: boolean
}

const showLightbox = ref(false)
const activeIndex = ref(0)

function closeModal() {
  activeIndex.value = 0
  showLightbox.value = false
}

function openModal(index: number) {
  activeIndex.value = index
  showLightbox.value = true
}

defineProps<Props>()
</script>
