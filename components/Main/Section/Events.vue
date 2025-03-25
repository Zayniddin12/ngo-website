<template>
  <div ref="eventsSection">
    <Transition :key="loading">
      <template v-if="loading">
        <MainCardEventLoading />
      </template>
      <template v-else>
        <div v-if="showSection" class="pb-8 pt-0 lg:py-16">
          <div
            class="container mx-auto w-full flex items-end justify-between pb-6 md:pb-10"
          >
            <CommonSectionHeaderTitle
              wrapper-class="w-full md:w-2/4"
              :title="$t('events.title')"
              title-class="text-black max-sm:text-2xl"
              :subtitle="$t('events.subtitle')"
            />

            <BaseButton
              class="hidden md:block !py-2 !px-6 !text-sm !font-bold !leading-none"
              variant="greenBorder"
              hover-classes="!px-6 !py-2"
              :text="$t('events.button')"
              @click="navigateTo('/social')"
            >
              <template #suffix>
                <i-arrow-right class="!mb-0 text-2xl" />
              </template>
            </BaseButton>
          </div>
          <Transition name="fade" mode="out-in">
            <div :key="loading">
              <div v-if="!loading" class="flex-y-center w-full flex-y-center">
                <swiper
                  :space-between="24"
                  :speed="1000"
                  :autoplay="{ delay: 5000, pauseOnMouseEnter: true }"
                  loop
                  allow-touch-move
                  slides-per-view="auto"
                  class="w-full h-full"
                  :modules="[Autoplay]"
                  centered-slides
                >
                  <swiper-slide
                    v-for="(item, key) in events"
                    :key
                    class="!w-fit h-full flex-y-center justify-center"
                  >
                    <MainCardEvent :item="item" />
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </Transition>
          <div class="md:hidden mt-6 px-5">
            <BaseButton
              class="flex-row-reverse !py-2 !px-6 w-full !text-sm !font-bold !leading-none"
              variant="greenBorder"
              hover-classes="!px-6 !py-2"
              :text="$t('events.button')"
              icon-position="left"
              @click="navigateTo('/social')"
            >
              <template #prefix>
                <i-arrow-right class="!mb-0 text-2xl" />
              </template>
            </BaseButton>
          </div>
        </div>
      </template>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'

import { useIntersectionObserver } from '@vueuse/core'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

// import { events } from '~/data'
import { useHomeStore } from '~/store/home'
import type { ISocialEvent } from '~/types'

const loading = ref(true)
const showSection = ref(true)
const eventsSection = ref(null)
const sectionVisible = ref(false)
const homeStore = useHomeStore()
const events = ref<ISocialEvent[]>([])
const emit = defineEmits<{
  (e: 'loading', value: boolean): void
}>()

useIntersectionObserver(eventsSection, ([{ isIntersecting }]) => {
  sectionVisible.value = isIntersecting
})

watch(
  sectionVisible,
  (newValue) => {
    if (newValue) {
      homeStore
        .fetchSocialEvents()
        .then((res) => {
          events.value = res
          showSection.value = res.length > 0
        })
        .finally(() => {
          loading.value = false
          emit('loading', false)
        })
    }
  },
  { once: true }
)
</script>

<style scoped></style>
