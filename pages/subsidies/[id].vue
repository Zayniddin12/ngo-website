<template>
  <main class="overflow-hidden pages">
    <LayoutWrapperWithSide :menu="breadcrumbs" has-breadcrumbs has-right>
      <template #right>
        <div class="space-y-5">
          <template v-if="!loading">
            <CommonCountDouwn
              class="mx-auto"
              :loading="loading"
              :target-date="subsidySingle?.start_date"
              :status="subsidySingle?.status!"
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
                {{ subsidySingle?.name }}
              </p>
              <div class="grid grid-cols-2 gap-2">
                <CommonCardProjectInfo
                  v-bind="{
                    price: subsidySingle?.price!,
                    from: subsidySingle?.start_date!,
                    to: subsidySingle?.end_date!,
                    location: subsidySingle?.location!,
                    status: subsidySingle?.status!,
                  }"
                />
              </div>
            </div>
            <div v-else class="w-full bg-white p-4 rounded-2xl">
              <span class="w-[80%] shimmer h-7 rounded mb-6" />
              <div class="grid grid-cols-2 gap-2">
                <span
                  v-for="key in 4"
                  :key
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
    <div
      v-if="similarProjects?.length || loading"
      class="space-y-9 mb-16 container"
    >
      <p class="text-[28px] container font-semibold leading-9 text-brand-black">
        {{ $t('page.project.similar_projects') }}
      </p>

      <Swiper
        v-if="!loading"
        :slides-per-view="'auto'"
        class="!overflow-visible"
      >
        <SwiperSlide
          v-for="(project, key) in similarProjects"
          :key="key"
          class="!overflow-visible !w-fit !ml-4 sm:!w-[580px]"
        >
          <ProjectsCardSimilar
            v-bind="{
              name: project?.name,
              description: project?.description,
              date: project?.end_date,
              price: project?.price,
              location: project?.location,
              href: getHrefUrl(project?.type!),
            }"
          />
        </SwiperSlide>
      </Swiper>
      <div v-else class="flex gap-5">
        <ProjectsCardAnnouncementLoading v-for="key in 3" :key />
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'

import CountDownLoading from '~/components/Common/CountDownLoading.vue'
import { projectSingleTabList } from '~/data'
import { useProjectStore } from '~/store/projects'
import { IGrantSingle, TProjectType } from '~/types'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const activeTab = ref(route.query.tab || 'about')
const { width } = useWindowSize()
const isMobile = ref(false)
const similarProjects = ref()

const { data: subsidySingle, pending: loading } = useAsyncData(
  'subsidySingle',
  () => useProjectStore().fetchSubsidySingle(route.params.id || '')
)

const breadcrumbs = computed(() => [
  {
    title: t('subsides'),
    link: '/subsidies',
  },
  {
    title: subsidySingle.value?.name,
    link: '/subsidies/' + route.params.id,
  },
])

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

watch(activeTab, (value) => {
  if (value === 'about') {
    router.push(`/subsidies/${route.params.id}`)
  } else if (value === 'participants') {
    router.push(`/subsidies/${route.params.id}/participants`)
  } else if (value === 'results') {
    router.push(`/subsidies/${route.params.id}/results`)
  }
})

onMounted(async () => {
  if (width.value < 576) {
    isMobile.value = true
  }

  try {
    if (subsidySingle.value?.category?.id) {
      await useProjectStore().getSimilarProjects(
        subsidySingle.value.category.id,
        subsidySingle.value.id
      )
      similarProjects.value = useProjectStore().similarProjects
    }
  } catch (error) {
    console.error(error)
    await router.push('/404')
  }
})

function onTabChange(value: string) {
  activeTab.value = value
}
</script>

<style>
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
