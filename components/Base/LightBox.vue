<template>
  <CommonModal
    v-bind="{ show }"
    no-header
    body-class="!bg-transparent !overflow-visible"
    has-close-icon
    @close="$emit('close')"
  >
    <div v-if="loading.list">
      <Loader />
    </div>
    <div v-else class="relative w-full">
      <button
        aria-label="prev"
        class="slider-prev w-12 h-12 flex-center backdrop-blur-sm bg-white/[12%] hover:!backdrop-blur-0 hover:bg-transparent transition-300 group absolute -left-16 absolute-y cursor-pointer border border-white/40"
      >
        <i
          class="icon-arrow text-2xl text-white transition-300 block rotate-180"
        />
      </button>
      <h3
        class="text-white font-minion text-lg line-clamp-2 font-bold leading-130"
      >
        {{ item?.title }}
      </h3>
      <p class="text-xs text-white/80 font-medium font-minion mb-3 mt-1">
        {{
          dayjs(item?.published_at)
            .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
            .format('DD-MMMM YYYY, hh:mm')
        }}
      </p>
      <Swiper
        v-if="list?.length"
        v-bind="settings"
        :thumbs="{ swiper: thumbsSwiper }"
      >
        <SwiperSlide v-for="(listItem, index) in list" :key="index">
          <div class="aspect-video overflow-hidden relative">
            <img
              :src="listItem?.image?.thumbnail[EImageSize.LARGE]"
              alt="images"
              class="w-full h-full object-contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        v-if="list?.length"
        v-bind="thumbsSettings"
        class="mySwiper thumbs-swiper"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide
          v-for="(listItem, index) in list"
          :key="index"
          class="mt-4"
        >
          <!--              :class="item.id == slideId ? 'border-2 border-red' : ''"-->
          <img
            class="object-cover aspect-video cursor-pointer"
            :src="listItem?.image?.thumbnail[EImageSize.SMALL]"
            alt="cover image"
          />
        </SwiperSlide>
      </Swiper>
      <button
        aria-label="next"
        class="slider-next w-12 h-12 flex-center backdrop-blur-sm bg-white/[12%] hover:!backdrop-blur-0 hover:bg-transparent transition-300 group absolute -right-16 absolute-y cursor-pointer border border-white/40"
      >
        <i class="icon-arrow text-2xl text-white transition-300 block" />
      </button>
    </div>
  </CommonModal>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/thumbs'

import dayjs from 'dayjs'
import type SwiperClass from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import Loader from '~/components/LightBox/Loader.vue'

interface Props {
  item?: IGallery
  show?: boolean
}
const props = defineProps<Props>()

defineEmits<{
  (e: 'close'): void
}>()

const data = ref()
const loading = computed(() => data.value?.loading)
const list = computed(() => data.value?.list)
watch(
  () => props.show,
  () => {
    if (!props.show) {
      thumbsSwiper.value = undefined // Reset thumbsSwiper when the component is hidden
    }
    if (props.show) {
      data.value = useListFetcher<IGalleryImages>(
        `news/PhotoGalleryImages/?content__slug=${props.item?.slug}`
      )
    }
  }
)

const thumbsSwiper = ref<SwiperClass>()

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}

const settings = {
  spaceBetween: 10,
  grabCursor: true,
  // keyboard: { enabled: true },
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  thumbs: { swiper: thumbsSwiper.value },
  modules: [Thumbs, FreeMode, Navigation],
}
const thumbsSettings = {
  spaceBetween: 10,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [Thumbs, FreeMode],
}
</script>

<style scoped>
.thumbs-swiper .swiper-slide-thumb-active {
  border: 2px solid #dd3333 !important;
}
</style>
