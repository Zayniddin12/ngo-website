<template>
  <div class="pages relative -translate-y-8 md:-translate-y-6 overflow-hidden">
    <main class="pb-[60px] relative translate-y-0 bg-white/20 backdrop-blur-md">
      <div class="absolute w-full h-full top-0 left-0 bottom-0 z-0">
        <div
          class="w-full h-full bg-white/5 backdrop-blur absolute top-0 left-0 z-1"
        />

        <img
          :alt="single?.title"
          :src="single?.image"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="relative z-10 container">
        <div class="my-4">
          <BaseBreadcrumb :breadcrumb="breadcrumbs" text-class="text-white" />
        </div>
        <div
          class="flex-center max-[980px]:flex-col gap-0 min-[980px]:gap-6 max-w-[984px] mx-auto"
        >
          <NuxtImg
            :src="single?.image"
            alt="image"
            class="w-[379px] h-[498px] border-2 border-white/20 rounded-xl object-cover object-center"
          />
          <div class="min-[980px]:py-10 py-4 text-white/90">
            <h3 class="font-extrabold leading-130 text-[32px]">
              {{ single?.title }}
            </h3>
            <p class="font-normal text-base leading-130 mt-5 mb-6">
              {{ extractContent(single?.description!) }}
            </p>
            <div class="sm:grid flex flex-col sm:grid-cols-2 gap-6">
              <div
                class="w-full rounded-xl border border-white/10 p-2 backdrop-blur-lg bg-white/10 flex items-center gap-2.5"
              >
                <div class="p-2 rounded-[7px] border border-white/10">
                  <i-calendar-event1 class="text-3xl" />
                </div>
                <div>
                  <p class="text-xs font-normal leading-130 text-white/60">
                    {{ $t('event.info.date') }}
                  </p>
                  <h4 class="text-base text-white/90 leading-125 font-bold">
                    {{ single?.date }}
                  </h4>
                </div>
              </div>
              <div
                class="w-full rounded-xl border border-white/10 p-2 backdrop-blur-lg bg-white/10 flex items-center gap-2.5"
              >
                <div class="p-2 rounded-[7px] border border-white/10">
                  <i-users class="text-3xl" />
                </div>
                <div>
                  <p class="text-xs font-normal leading-130 text-white/60">
                    {{ $t('event.info.waiting_people') }}
                  </p>
                  <h4 class="text-base text-white/90 leading-125 font-bold">
                    {{ single?.people_max }}
                  </h4>
                </div>
              </div>
              <div
                class="w-full rounded-xl border border-white/10 p-2 backdrop-blur-lg bg-white/10 col-span-2 flex items-center gap-2.5"
              >
                <div class="p-2 rounded-[7px] border border-white/10">
                  <i-map-pin class="text-3xl" />
                </div>
                <div>
                  <p class="text-xs font-normal leading-130 text-white/60">
                    {{ $t('event.info.address') }}
                  </p>
                  <h4 class="text-base text-white/90 leading-125 font-bold">
                    {{ single?.location }}
                  </h4>
                </div>
              </div>
            </div>
            <CommonCardUsers
              :users="
                single?.partners?.map((part) => ({
                  id: part.id,
                  full_name: part.name,
                  image: part.image,
                  link: `/residents/${part.slug}`,
                }))
              "
              class="mt-4"
            />
          </div>
        </div>
      </div>
    </main>
    <div class="flex max-sm:flex-col gap-6 mt-16 container">
      <div class="basis-3/5">
        <div>
          <h3
            class="text-brand-black-550 font-semibold text-28 leading-130 mb-4"
          >
            {{ $t('event.about') }}
          </h3>
          <div class="description" v-html="single?.description" />
        </div>
        <div class="mt-8">
          <h3
            class="text-brand-black-550 font-semibold text-28 leading-130 mb-4"
          >
            {{ $t('event.photos') }}
          </h3>
          <CommonCardReportImage
            :images="single?.report_image"
            class="grid lg:grid-cols-3 grid-cols-1 sm:grid-cols-2 gap-4"
          />
        </div>
        <div class="mt-8">
          <h3
            class="text-brand-black-550 font-semibold text-28 leading-130 mb-4"
          >
            {{ $t('event.requirements') }}
          </h3>
          <div
            class="requirements text-brand-black test-base font-normal leading-130"
            v-html="single?.requirements"
          />
        </div>
      </div>
      <div
        id="platforms-partners"
        class="max-h-[500px] overflow-y-auto overflow-x-hidden py-2 max-w-sm w-full"
      >
        <div class="text-brand-black-550 font-semibold leading-130 text-28">
          {{ $t('event_parners') }}
        </div>
        <CommonCardPlatformCards
          :horizontal="!isMobile"
          :list="single?.partners"
        />
      </div>
    </div>
    <ClientOnly>
      <div v-if="projectCards?.length" class="container md:mt-16 mt-8">
        <p class="text-[28px] font-semibold leading-9 text-brand-black mb-4">
          {{ $t('page.resident.singleTitle') }}
        </p>
        <Swiper
          :slides-per-view="'auto'"
          :space-between="20"
          class="!overflow-visible"
        >
          <SwiperSlide
            v-for="(event, key) in otherEvents?.records"
            :key="key"
            class="!overflow-visible !w-full sm:!max-w-screen-md"
          >
            <MainSocialCard :item="event" />
          </SwiperSlide>
        </Swiper>
      </div>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowSize,
} from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { projectCards } from '@/data'
import { useSocialStore } from '@/store/social'
import type { ISocialEvent } from '@/types'

const route = useRoute()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { t, locale } = useI18n()
const { width } = useWindowSize()
const socialStore = useSocialStore()
socialStore.fetchOtherEvents(route.params.slug as string)

// const single = ref<ISocialEvent>()
const isMobile = ref(false)

const { data: single } = await useAsyncData<ISocialEvent>('social-single', () =>
  socialStore.fetchSocialEventBySlug(route.params.slug as string)
)
const { data: otherEvents } = await useAsyncData('social-events', () =>
  socialStore.fetchOtherEvents(route.params.slug as string)
)

watch(width, () => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})

onMounted(() => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})

const breadcrumbs = computed(() => [
  {
    title: t('events.title'),
    link: '/social',
  },
  {
    title: single?.value?.title,
    link: '',
  },
])
</script>
<style scoped>
#platforms-partners {
  &::-webkit-scrollbar {
    @apply w-1 bg-gray-600 rounded;
  }

  &::-webkit-scrollbar-thumb {
    @apply w-full bg-primary rounded;
  }
}
.description p {
  @apply text-base text-brand-black font-normal leading-130;
}
</style>
