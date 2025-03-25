<template>
  <main class="overflow-hidden pages">
    <LayoutWrapperWithSide :menu="breadcrumbs" has-breadcrumbs has-right>
      <template #right>
        <div class="space-y-5">
          <template v-if="!isLoading">
            <CommonCountDouwn
              v-if="projectSingleData?.status !== EProjectStatus.completed"
              class="mx-auto"
              :target-date="projectSingleData?.start_date"
              :status="projectSingleData?.status!"
            />
          </template>
          <CountDownLoading v-else />
          <CommonCardSideCards has-youth has-volunteer />
        </div>
      </template>
      <div>
        <Transition name="fade" mode="out-in">
          <div :key="isLoading">
            <CommonCardResidentProjectCard
              v-if="!isLoading"
              projects
              :project="{
                name: projectSingleData?.name,
                description: projectSingleData?.description,
                price: projectSingleData?.price,
                from: projectSingleData?.start_date,
                to: projectSingleData?.end_date,
                status: projectSingleData?.status,
                image: projectSingleData?.image,
                tag: projectSingleData?.tag,
                location: projectSingleData?.location,
              }"
              card-style="max-lg:!flex-col"
              -img-style="max-lg:!w-full max-lg:!h-[234px]"
            />
            <CommonCardResidentProjectLoading v-else projects />
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
    </LayoutWrapperWithSide>
    <div class="mb-16">
      <div
        v-if="similarProjects?.length || isLoading"
        class="space-y-9 container"
      >
        <p class="text-[28px] font-semibold leading-9 text-brand-black">
          {{ $t('page.project.similar_projects') }}
        </p>

        <Swiper
          v-if="!isLoading"
          :slides-per-view="'auto'"
          class="!overflow-visible"
        >
          <SwiperSlide
            v-for="(similarProject, key) in similarProjects"
            :key="key"
            class="!overflow-visible !w-full sm:!w-[580px]"
          >
            <ProjectsCardAnnouncement :item="similarProject" />
          </SwiperSlide>
        </Swiper>
        <div v-else class="flex gap-5">
          <ProjectsCardAnnouncementLoading v-for="key in 3" :key />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import 'swiper/css'

import { useWindowSize } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'

import CountDownLoading from '~/components/Common/CountDownLoading.vue'
import { projectSingleTabList } from '~/data'
import { useProjectStore } from '~/store/projects'
import type { ISimilarProjects, ISocialProjectsSingle } from '~/types'
import { EProjectStatus } from '~/types/enums'

interface Props {
  project?: any
}

defineProps<Props>()
const activeTab = ref('about')

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const projectStore = useProjectStore()
const { width } = useWindowSize()
const isMobile = ref(false)
const projectSingleData = ref<ISocialProjectsSingle>()
const isLoading = ref(true)

const similarProjects = ref<ISimilarProjects[]>([])
// TODO: remove after test
const testForCountdown = ref(new Date(new Date().getTime() + 5 * 60000))

const getProjectDetail = async (id: string) => {
  try {
    const res = await useApi().$get<ISocialProjectsSingle>('send_request', {
      params: {
        model: 'resident.project',
        fields:
          'id,name,description,price,end_date,start_date,status,image,tag{id,name,slug},location,key_aspects{id,name,description},category{id}',
        id,
      },
    })

    if ('error' in res) {
      await router.push('/404')
    }

    projectSingleData.value = res
    if (res.category.id) {
      similarProjects.value = await projectStore.getSimilarProjects(
        res.category.id,
        res.id
      )
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    await router.push('/404')
  } finally {
    isLoading.value = false
  }
}

const breadcrumbs = computed(() => [
  {
    title: t('social_projects'),
    link: '/projects',
  },
  {
    title: projectSingleData.value?.name,
    link: '/projects/' + route.params.id,
  },
])
watch(activeTab, (value) => {
  if (value === 'about') {
    navigateTo(`/projects/${route.params.id}`)
  } else if (value === 'participants') {
    navigateTo(`/projects/${route.params.id}/participants`)
  } else if (value === 'results') {
    navigateTo(`/projects/${route.params?.id}/results`)
  }
})
onMounted(() => {
  getProjectDetail(route.params.id as string)
  if (width.value < 576) {
    isMobile.value = true
  }
})
function onTabChange(value: string) {
  activeTab.value = value
}
</script>
