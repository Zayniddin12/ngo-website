<template>
  <div>
    <div class="container flex justify-between">
      <div class="w-full">
        <slot name="nav-left" />
      </div>

      <div
        :class="{ 'max-md:!hidden': isGrand }"
        class="justify-center items-center gap-4 mt-6 md:mt-8 hidden sm:flex"
      >
        <button
          aria-label="button"
          :class="navigatePrevEl"
          class="flex-center disabled:opacity-50 disabled:pointer-events-none w-8 h-8 rounded-full border border-gray-500 transition-300 hover:border-primary-500 hover:bg-primary hover:text-white"
        >
          <i-chevron-right
            class="text-2xl relative rotate-180 translate-y-[0.5px] -translate-x-px"
          />
        </button>
        <button
          aria-label="button"
          :class="navigateNextEl"
          class="flex-center disabled:opacity-50 disabled:pointer-events-none w-8 h-8 rounded-full border border-gray-500 transition-300 hover:border-primary-500 hover:bg-primary hover:text-white"
        >
          <i-chevron-right
            class="text-2xl relative translate-y-[0.5px] translate-x-px"
          />
        </button>
      </div>
    </div>
    <div class="relative !overflow-hidden">
      <div
        v-if="isGrand && !loading"
        class="absolute lg:w-[46%] bg-white z-30 h-full overflow-x-visible left-0 hidden lg:block"
      />
      <div class="container">
        <div
          v-if="isGrand && !loading"
          class="absolute w-[10%] z-30 h-full overflow-x-visible right-0 hidden md:block bg-gradient-to-r from-white/0 to-white/50"
        />
        <div
          :class="{
            'lg:flex  block lg:justify-between container gap-3 relative':
              isGrand,
          }"
          class="py-6"
        >
          <div
            v-if="isGrand && !loading"
            class="z-30 container lg:!w-[400px] !w-full ml-0 pl-0 max-lg:pb-6"
          >
            <h3
              class="text-brand-black font-extrabold leading-tight text-4xl mb-3"
            >
              {{ $t(activeDescription?.title) }}
            </h3>

            <p class="text-base font-medium text-gray-700 leading-tight">
              {{ activeDescription?.short_description }}
            </p>
            <BaseButton
              :text="$t('show_all')"
              variant="outline-white"
              class="!absolute bottom-7 !py-2 !px-6 !border-primary hidden lg:block !text-sm !font-bold !leading-none"
              @click="navigateTo(isGrandActive ? '/grants' : '/subsidies')"
            >
              <template #suffix>
                <i-arrow-right class="text-2xl !mb-0"></i-arrow-right>
              </template>
            </BaseButton>
          </div>
          <Transition name="fade" mode="out-in">
            <div :key="loading">
              <div v-if="isGrand && loading">
                <MainSectionSliderLoadingGrands />
              </div>
            </div>
          </Transition>

          <Swiper
            v-bind="settings"
            :slides-per-view="'auto'"
            :class="{ 'lg:!w-1/2 !w-full': isGrand }"
            class="!overflow-visible max-lg:!ml-0"
          >
            <SwiperSlide
              v-for="(card, index) in cards"
              :key="index"
              class="min-[450px]:!max-w-[378px] min-[400px]:!max-w-[300px] !max-w-[280px]"
              :class="{ 'max-sm:!max-w-[302px]': isService }"
            >
              <CommonCardServiseCard
                :loading="loading"
                :step="index + 1"
                :card="card"
                :is-grant="isGrand"
                :is-service="isService"
                :is-resident="isResident"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
    <div
      :class="{ 'max-md:!hidden': isGrand, '!mt-1': isService }"
      class="justify-center items-center gap-4 mt-6 md:mt-8 sm:hidden flex"
    >
      <button
        aria-label="button"
        :class="navigatePrevEl"
        class="flex-center bg-white disabled:opacity-50 w-8 h-8 rounded-full border border-gray-500 transition-300 hover:border-primary-500 hover:bg-primary hover:text-white"
      >
        <i-chevron-right
          class="text-2xl relative rotate-180 translate-y-[0.5px] -translate-x-px"
        />
      </button>
      <button
        aria-label="button"
        :class="navigateNextEl"
        class="flex-center bg-white disabled:opacity-50 w-8 h-8 rounded-full border border-gray-500 transition-300 hover:border-primary-500 hover:bg-primary hover:text-white"
      >
        <i-chevron-right
          class="text-2xl relative translate-y-[0.5px] translate-x-px"
        />
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import 'swiper/css'

import { useWindowSize } from '@vueuse/core'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

const { width, height } = useWindowSize()

interface Props {
  loading?: boolean
  isService?: boolean
  isGrand?: boolean
  isResident?: boolean
  navigatePrevEl?: string
  navigateNextEl?: string
  cards?: any
  title?: string
  navigationWrapperClass?: string
  shortDescription?: string
  activeDescription?: any
  isGrandActive?: boolean
}

const props = defineProps<Props>()

const settings = {
  spaceBetween: 20,
  navigation: {
    nextEl: `.${props.navigateNextEl}`,
    prevEl: `.${props.navigatePrevEl}`,
  },

  modules: [Navigation],
  effect: 'cards',
}
</script>
