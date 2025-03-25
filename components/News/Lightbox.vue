<template>
  <CommonModal
    v-bind="{ show }"
    no-header
    body-class="!bg-transparent !max-w-[784px] !overflow-visible !shadow-none"
  >
    <div class="relative w-full">
      <button
        aria-label="button"
        class="slider-prev top-1/2 -translate-y-1/2 w-8 h-8 flex-center rounded-full duration-300 group hover:bg-white/50 absolute -left-16 absolute-y cursor-pointer border border-white/40 hover:border-transparent"
      >
        <i-chevron-right
          class="text-2xl text-white relative rotate-180 translate-y-[0.5px] -translate-x-px"
        />
      </button>
      <Swiper
        v-if="images?.length"
        v-bind="settings"
        :thumbs="{ swiper: thumbsSwiper }"
        @swiper="onInit"
        @active-index-change="sliderChange"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index">
          <div
            class="overflow-hidden relative rounded-lg max-h-[70vh] sm:min-h-[70vh] h-full flex-center mt-6"
          >
            <img
              :src="image"
              alt="images"
              class="rounded-lg object-cover object-center h-full"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <Swiper
        v-if="images?.length && isThumbs"
        v-bind="thumbsSettings"
        class="mySwiper thumbs-swiper"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide v-for="(image, index) in images" :key="index" class="mt-4">
          <div class="h-[100px] w-[150px] overflow-hidden relative rounded-lg">
            <img
              :src="image"
              alt="images"
              class="w-full h-full object-cover cursor-pointer"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <button
        aria-label="button"
        class="slider-next w-8 h-8 flex-center rounded-full duration-300 group hover:bg-white/50 absolute -right-16 bottom-1/2 translate-y-1/2 absolute-y cursor-pointer border border-white/40 hover:border-transparent"
      >
        <i-chevron-right
          class="text-2xl text-white relative translate-y-[0.5px] translate-x-px"
        />
      </button>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/thumbs'

import type SwiperClass from 'swiper'
import { FreeMode, Keyboard, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref } from 'vue'

interface Props {
  images: string[]
  active: number
  show?: boolean
  isThumbs?: boolean
}

const props = defineProps<Props>()
const thumbsSwiper = ref<SwiperClass>()
const thumbsSettings = {
  spaceBetween: 60,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [Thumbs, FreeMode],
}

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}

const settings = computed(() => {
  return {
    spaceBetween: 20,
    grabCursor: true,
    keyboard: { enabled: true },
    initialSlide: props.active,
    navigation: {
      nextEl: '.slider-next',
      prevEl: '.slider-prev',
    },
    thumbs: { swiper: thumbsSwiper.value },
    modules: [Thumbs, FreeMode, Navigation, Keyboard],
  }
})

const emit = defineEmits(['change'])
const imageSlider = ref()
const activeIndex = ref()
function sliderChange(e: any) {
  activeIndex.value = e?.activeIndex
  emit('change', e?.activeIndex)
}

watch(
  () => props.show,
  () => {
    if (!props.show) {
      thumbsSwiper.value = undefined // Reset thumbsSwiper when the component is hidden
    }
  }
)

function onInit(swiper: any) {
  imageSlider.value = ''
  imageSlider.value = swiper
}
</script>

<style scoped>
.swiper-slide-thumb-active div {
  border: 1px solid #388ff3;
}
</style>
