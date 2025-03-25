<template>
  <div>
    <swiper
      v-if="photos?.length"
      :modules="[Thumbs, Navigation]"
      :thumbs="{ swiper: thumbsSwiper }"
      :slides-per-view="'auto'"
      :navigation="{
        nextEl: '.slider-button-next',
        prevEl: '.slider-button-prev',
      }"
      space-between="20"
      class="mb-3 md:mb-5"
      @swiper="setMainSwiper"
    >
      <swiper-slide v-for="(item, index) in photos" :key="index">
        <CommonImage
          class="rounded-2xl w-full h-[490px] object-cover object-center cursor-pointer"
          :src="item?.image"
          :alt="`Photo ${index + 1}`"
          @click="handleImg(index)"
        />
      </swiper-slide>
    </swiper>
    <client-only>
      <swiper
        v-if="photos?.length"
        v-bind="thumbSettings"
        :slides-per-view="'auto'"
        @swiper="setThumbsSwiper"
        @slide-change="onChange"
      >
        <swiper-slide
          v-for="(item, index) in photos"
          :key="index"
          class="!w-[180px]"
          @click="slideTo(index)"
        >
          <CommonImage
            class="rounded-2xl h-[100px] bg-white object-cover object-center border-3 border-primary transition-300 cursor-pointer"
            :src="item.image"
            :alt="`Photo ${index + 1}`"
          />
        </swiper-slide>
        <i-chevron-right
          class="icon-chevron-right slider-button slider-button-prev text-2xl left-0 max-md:!hidden !rotate-180"
        />
        <i-chevron-right
          class="icon-chevron-right slider-button slider-button-next text-2xl right-0 max-md:!hidden"
        />
        <span
          class="left-0"
          :class="{ 'pointer-events-none opacity-0': isBeginning }"
        />
        <span
          class="right-0"
          :class="{ 'pointer-events-none opacity-0': isEnd }"
        />
      </swiper>
    </client-only>

    <NewsLightbox
      :show="show"
      :images="photos"
      :active="activeIndex"
      @close="closeModal"
    />
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'

import type SwiperClass from 'swiper'
import { Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

interface Props {
  photos: string[]
}
defineProps<Props>()

const activeIndex = ref(0)
const show = ref(false)
const mainSwiper = ref<SwiperClass | null>(null)
const thumbsSwiper = ref<SwiperClass | null>(null)

const setMainSwiper = (swiper: SwiperClass) => {
  mainSwiper.value = swiper
}
const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper
}

const thumbSettings = {
  spaceBetween: 20,
  watchSlidesProgress: true,
  modules: [Thumbs, Navigation],
}
const isBeginning = ref(true)
const isEnd = ref(false)
const onChange = (e: SwiperClass) => {
  isBeginning.value = e.isBeginning
  isEnd.value = e.isEnd
  if (e.visibleSlidesIndexes.includes(0)) {
    isBeginning.value = true
  }
  if (e.visibleSlidesIndexes.includes(e.slides.length - 1)) {
    isEnd.value = true
  }
}

const handleImg = (index: number) => {
  show.value = true
  activeIndex.value = index
}

const slideTo = (index: number) => {
  if (mainSwiper.value) {
    mainSwiper.value.slideTo(index)
  }
}

function closeModal() {
  activeIndex.value = 0
  show.value = false
}
</script>

<style>
.swiper-slide-thumb-active img {
  border-color: #388ff3 !important;
}

.slider-button {
  position: absolute;
  top: 36%;
  z-index: 3;
  font-size: 32px;
  line-height: 32px;
  color: #63676c;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all;
}
.swiper-slide-thumb-active div {
  border: 3px solid #62ad5a;
}
</style>
