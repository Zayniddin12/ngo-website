<template>
  <div v-if="showSection" ref="sectionTarget" class="overflow-hidden">
    <LayoutWrapperFull
      main-class="md:!mb-9 !mb-6"
      class="container pb-0 lg:pb-[58px]"
    >
      <template #title>
        <HeaderTitle
          :title="$t('project_announce_title')"
          :subtitle="$t('project_announce_subtitle')"
          subtitle-class="text-base"
          title-class="max-sm:text-2xl"
        />
      </template>
      <template #headerContent>
        <BaseButton
          :text="$t('all_project')"
          variant="greenBorder"
          class="max-[900px]:hidden !py-2 !px-6 !text-sm !font-bold !leading-none"
          @click="navigateTo('/projects')"
        >
          <template #suffix><i-arrow-right class="text-2xl !mb-0" /> </template>
        </BaseButton>
      </template>
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <div v-if="!responsiveSlider">
            <MainCardAnnouncement
              v-if="!loading"
              :project-announces="projectAnnounces"
            />
          </div>
          <div v-else>
            <Swiper
              space-between="20"
              :slides-per-view="'auto'"
              class="!overflow-visible"
            >
              <SwiperSlide
                v-for="(item, index) in projectAnnounces"
                :key="index"
                class="min-[540px]:max-w-[400px] min-[480px]:max-w-[380px] max-w-[320px] h-full border-2 border-white/40 rounded-20"
              >
                <div
                  class="flex flex-col-reverse rounded-20 overflow-hidden bg-white border border-white/40"
                >
                  <div class="p-3 md:p-5">
                    <h3
                      class="lg:text-xl text-lg text-brand-black font-extrabold leading-130 mb-7 line-clamp-2 lg:line-clamp-none h-[46px]"
                    >
                      {{ item.name }}
                    </h3>
                    <div class="flex items-center gap-2.5">
                      <i-dollar class="text-2xl text-primary" />
                      <div>
                        <p
                          class="text-brand-black text-sm font-semibold leading-130"
                        >
                          {{ formatNumberSpace(item?.price ?? 0) }} сум
                        </p>
                        <p
                          class="text-[11px] font-medium leading-130 text-gray-700"
                        >
                          {{ $t('sum') }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5 py-3">
                      <i-map-pin class="text-2xl text-primary" />
                      <div>
                        <p
                          class="text-brand-black text-sm font-semibold leading-130"
                        >
                          {{ item?.location }}
                        </p>
                        <p
                          class="text-[11px] font-medium leading-130 text-gray-700"
                        >
                          {{ $t('event.info.address') }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center gap-2.5">
                      <i-calendar class="text-2xl text-primary" />
                      <div>
                        <p
                          class="text-brand-black text-sm font-semibold leading-130"
                        >
                          {{
                            `${dayjs(item?.start_date ?? new Date()).format(
                              'DD.MM.YYYY'
                            )} - ${dayjs(item?.end_date ?? new Date()).format(
                              'DD.MM.YYYY'
                            )}`
                          }}
                        </p>
                        <p
                          class="text-[11px] font-medium leading-130 text-gray-700"
                        >
                          {{ $t('request_period') }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <img
                    :src="item?.image"
                    class="w-full h-[200px] lg:h-max rounded-t-20 object-cover"
                    alt="img"
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <BaseButton
              :text="$t('all_project')"
              variant="greenBorder"
              class="mt-6 w-full !py-2 !px-6 !text-sm !font-bold !leading-none"
              @click="navigateTo('/project')"
            >
              <template #suffix
                ><i-arrow-right class="text-2xl !mb-0" />
              </template>
            </BaseButton>
          </div>

          <div v-if="loading" class="container">
            <MainSectionProjectAnouncementsLoading />
          </div>
        </div>
      </Transition>
    </LayoutWrapperFull>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'

import { useIntersectionObserver, useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/vue'

import HeaderTitle from '~/components/Common/Section/HeaderTitle.vue'
import { useHomeStore } from '~/store/home'

const { width } = useWindowSize()
const sectionTarget = ref(null)
const sectionVisible = ref(false)
const responsiveSlider = ref(false)
const showSection = ref(true)
const loading = ref(true)
const homeStore = useHomeStore()
useIntersectionObserver(sectionTarget, ([{ isIntersecting }]) => {
  sectionVisible.value = isIntersecting
})

watch(
  sectionVisible,
  (newValue) => {
    if (newValue) {
      homeStore
        .fetchProjectAnouncements()
        .then((data: any) => {
          projectAnnounces.value = data
          showSection.value = data.length > 0
        })
        .finally(() => {
          loading.value = false
        })
    }
  },
  { once: true }
)
const projectAnnounces = ref<any[]>([])

onMounted(() => {
  if (width.value < 900) {
    responsiveSlider.value = true
  }
})
</script>
