<template>
  <LayoutWrapperWithSide
    :menu="breadcrumbs as IBreadcrumb[]"
    has-breadcrumbs
    has-right
  >
    <template #right>
      <div class="space-y-5">
        <CommonCardSideCards has-volunteer has-youth />
      </div>
    </template>
    <div class="pb-16">
      <CommonCardResidentProjectCard :project="project" :is-loading="loading" />
      <div class="w-full rounded-2xl bg-white p-5 mt-8">
        <h4 class="text-brand-black text-2xl font-bold leading-130">
          {{ project?.name }}
        </h4>
        <p class="text-primary mt-1 font-semibold text-20 leading-130">
          {{ formatDate(project?.start_date ?? '') }}
        </p>
        <p
          class="text-brand-black font-medium leading-140 mt-3 md:mb-6"
          v-html="project?.description"
        />
        <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
          {{ $t('aspect_project') }}
        </h3>
        <CommonCardKeyProject :items="project?.key_aspects" />
      </div>
      <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
        <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
          {{ $t('attached_file') }}
        </h3>
        <CommonCardAttachedFiles :items="project?.file" />
      </div>

      <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
        <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
          {{ $t('terms_requirements') }}
        </h3>
        <CommonCardTermsRequirements
          v-bind="{
            startDate: project?.start_date,
            endDate: project?.end_date,
            price: project?.price,
            sourceOfBudget: project?.source_of_budget,
          }"
        />
      </div>

      <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
        <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
          {{ $t('reporting_materials') }}
        </h3>
        <CommonCardReportImage :images="project?.report_image" />

        <h3 class="my-4 text-brand-black text-xl leading-130 font-bold">
          {{ $t('documents') }}
        </h3>
        <CommonCardDownloadFile
          v-for="document of project?.report_document"
          :key="document.file"
          :link="document.file"
          :title="document.name"
          :size="document.size"
        />
      </div>

      <CommonCardChekcProject class="mt-5" />
    </div>
  </LayoutWrapperWithSide>
</template>

<script setup lang="ts">
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/uz'

import dayjs from 'dayjs'

import { useProjectStore } from '@/store/projects'
import { IBreadcrumb, IProjectDetailAbout } from '@/types'

const { locale, t } = useI18n()

const project = ref<IProjectDetailAbout>()
const loading = ref(false)

onMounted(async () => {
  const { data } = await useAsyncData(
    `get-project-by-slug-${useRoute().params.slug}`,
    () => useProjectStore().fetchProject(useRoute().params.slug as string)
  )

  project.value = data.value as IProjectDetailAbout
  loading.value = false
})

const formatDate = (date: string) => {
  return dayjs(date)
    .locale(locale.value === 'uz' ? 'uz' : locale.value)
    .format('MMMM D, YYYY')
}

const breadcrumbs = computed(() => [
  {
    title: t('projects'),
    link: '/projects',
  },
  {
    title: project.value?.name,
    link: '',
  },
])
</script>
