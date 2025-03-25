<template>
  <main class="overflow-hidden pages">
    <LayoutWrapperWithSide :menu="breadcrumbs" has-breadcrumbs has-right>
      <template #right>
        <div class="space-y-5">
          <template v-if="!loading">
            <CommonCountDouwn
              class="mx-auto"
              :target-date="grantSingle?.start_date"
              :status="grantSingle?.status!"
            />
          </template>
          <CountDownLoading v-else />
          <CommonCardSideCards has-youth has-volunteer />
        </div>
      </template>
      <div class="space-y-5">
        <Transition name="fade" mode="out-in">
          <div :key="loading">
            <div v-if="!loading" class="bg-white p-4 rounded-2xl">
              <p class="text-2xl text-brand-black font-bold leading-130 mb-6">
                {{ grantSingle?.name }}
              </p>
              <div class="grid grid-cols-2 gap-2">
                <CommonCardProjectInfo
                  v-bind="{
                    price: grantSingle?.price!,
                    from: grantSingle?.start_date!,
                    to: grantSingle?.end_date!,
                    location: grantSingle?.location!,
                    status: grantSingle?.status!,
                  }"
                />
              </div>
            </div>
            <div v-else class="w-full bg-white p-4 rounded-2xl">
              <span class="w-[80%] shimmer h-7 rounded mb-6" />
              <div class="grid grid-cols-2 gap-2">
                <span
                  v-for="key in 4"
                  :key="key"
                  class="w-full shimmer h-[50px] rounded mb-6"
                />
              </div>
            </div>
          </div>
        </Transition>

        <BaseTabFull
          v-model="activeTab"
          :list="projectSingleTabList(isMobile)"
          class="mt-5 mb-5"
          divider-class="!mx-0"
          show-divider
          wrapper-class="!p-0.5 !rounded-xl max-sm:!w-full"
          item-class="max-sm:!w-full"
          active-class="!rounded-10"
          active-items-class="!rounded-10 !text-brand-black"
        />
        <NuxtPage @on-tab-change="onTabChange" />
      </div>
      <CommonCardChekcProject class="mt-5" />
    </LayoutWrapperWithSide>
    <div class="mb-16">
      <div
        v-if="similarProjects?.length || loading"
        class="space-y-9 container mt-5"
      >
        <p class="text-[28px] font-semibold leading-9 text-brand-black">
          {{ $t('page.project.similar_projects') }}
        </p>

        <Swiper
          v-if="!loading"
          :slides-per-view="'auto'"
          class="!overflow-visible"
        >
          <SwiperSlide
            v-for="(similarProject, key) in similarProjects"
            :key="key"
            class="!overflow-visible !w-fit !ml-4 sm:!w-[580px]"
          >
            <ProjectsCardSimilar
              v-bind="{
                name: similarProject.name,
                description: similarProject.description,
                date: similarProject.end_date,
                price: similarProject.price,
                location: similarProject.location,
                href: getHrefUrl(similarProject.type),
              }"
            />
          </SwiperSlide>
        </Swiper>
        <div v-else class="flex gap-5">
          <ProjectsCardSimilarLoading v-for="key in 4" :key="key" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import 'swiper/css'

import { useWindowSize } from '@vueuse/core'
import dayjs from 'dayjs'
import { Swiper, SwiperSlide } from 'swiper/vue'

import CountDownLoading from '~/components/Common/CountDownLoading.vue'
import { projectSingleTabList } from '~/data'
import { useProjectStore } from '~/store/projects'
import { IGrantSingle, ISimilarProjects, TProjectType } from '~/types'
import { formatPrice } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const { width } = useWindowSize()
const isMobile = ref(width.value < 576)
const activeTab = ref(route.query.tab || 'about')

const breadcrumbs = computed(() => [
  {
    title: t('grants'),
    link: '/grants',
  },
  {
    title: grantSingle.value?.name,
    link: '/grants/' + route.params.id,
  },
])

const grantSingleStore = useProjectStore()

const {
  data: grantSingle,
  pending: loading,
  error,
} = useAsyncData(async () => {
  const res = await grantSingleStore.fetchGrantSingle(route.params.id || '')
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})

const { data: similarProjects } = useAsyncData(async () => {
  if (grantSingle.value?.category.id) {
    return await grantSingleStore.getSimilarProjects(
      grantSingle.value.category.id,
      grantSingle.value.id
    )
  }
  return []
})

watch(activeTab, (value) => {
  if (value === 'about') {
    navigateTo(`/grants/${route.params.id}`)
  } else if (value === 'participants') {
    navigateTo(`/grants/${route.params.id}/participants`)
  } else if (value === 'results') {
    navigateTo(`/grants/${route.params.id}/results`)
  }
})

if (error.value) {
  router.push('/404')
}

function onTabChange(value: string) {
  activeTab.value = value
}

const getHrefUrl = (type: TProjectType) => {
  switch (type) {
    case 'gov_subsidy_project':
      return `/subsidies/${route.params.id}`
    case 'gov_grant_project':
      return `/grants/${route.params.id}`
    case 'social_project':
      return `/projects/${route.params.id}`
    default:
      return `/projects/${route.params.id}`
  }
}
</script>
<style>
.description {
  @apply text-brand-black text-base font-medium leading-140 mt-4 mb-6;
}
.bottom_description p {
  @apply !text-brand-black text-base font-medium leading-140 mb-4 mt-2 pb-2;
}
.bottom_description strong {
  @apply text-danger-950 text-base font-bold leading-140;
}
.bottom_description ol li {
  @apply text-brand-black text-base font-medium leading-140 mb-4 mt-2;
}
</style>
