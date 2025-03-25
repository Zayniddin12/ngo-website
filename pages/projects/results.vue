<template>
  <main class="overflow-hidden pages">
    <LayoutWrapperWithSide :menu="breadcrumbs" has-breadcrumbs has-right>
      <template #right>
        <div class="space-y-5">
          <CommonCardSideCards has-youth has-volunteer />
        </div>
      </template>
      <div>
        <CommonCardResidentProjectCard :project="single" />

        <BaseTabFull
          v-model="activeTab"
          :list="projectSingleTabList()"
          class="mt-8 mb-5"
          show-divider
          wrapper-class="!p-0.5 !rounded-xl"
          active-class="!rounded-10"
          active-items-class="!rounded-10 !text-brand-black"
        />
      </div>
    </LayoutWrapperWithSide>
    <div class="space-y-9 mb-16 container">
      <p class="text-[28px] font-semibold leading-9 text-brand-black">
        {{ $t('page.project.similar_projects') }}
      </p>

      <Swiper :slides-per-view="'auto'" class="!overflow-visible">
        <SwiperSlide
          v-for="(project, key) in projectCards"
          :key="key"
          class="!overflow-visible !w-[580px]"
        >
          <ProjectsCardAnnouncement :item="project" />
        </SwiperSlide>
      </Swiper>
    </div>
  </main>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'

import {
  AttachedFiles,
  projectCards,
  projectData,
  projectSingleTabList,
  ReportImage,
} from '~/data'

const activeTab = ref('results')

const route = useRoute()
const { t } = useI18n()

const single = computed(() => projectCards.find((item) => item.id === +3))
const breadcrumbs = computed(() => [
  {
    title: t('page.resident.title'),
    link: '/residents',
  },
  {
    title: single.value?.title,
    link: '/residents/' + route.params.id,
  },
])
watch(activeTab, (value) => {
  if (value === 'about') {
    navigateTo('/projects/1')
  } else if (value === 'participants') {
    navigateTo('/projects/participants')
  } else if (value === 'results') {
    navigateTo('/projects/results')
  }
})
</script>
