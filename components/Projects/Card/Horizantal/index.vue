<template>
  <NuxtLink
    :to="`/projects/${project?.id}`"
    class="w-full flex-y-center max-[880px]:flex-col rounded-2xl border border-gray-500 bg-white hover:border-primary transition-300 cursor-pointer"
  >
    <CommonImage
      :src="project?.image"
      class="!h-52 w-44 min-[880px]:rounded-l-2xl max-[880px]:rounded-t-2xl max-[880px]:w-full shrink-0"
      image-class="w-full h-full object-cover object-center"
    />
    <div class="p-4 space-y-8">
      <div class="">
        <p
          class="text-lg line-clamp-2 font-extrabold leading-normal text-brand-black"
        >
          {{ project?.name }}
        </p>
        <div class="description" v-html="project?.description"></div>
      </div>
      <div class="flex-y-center max-sm:flex-col gap-2">
        <ProjectsCardStatus class="max-sm:w-full" :status="projectStatus" />
        <div
          class="bg-gray max-sm:w-full flex-y-center flex-1 space-x-2.5 p-2 rounded-lg"
        >
          <i-calendar class="!m-0 text-primary text-2xl" />
          <div>
            <p
              class="text-sm font-semibold leading-130 text-brand-black lowercase whitespace-nowrap"
            >
              {{ formatMoneyDecimal(project?.price ?? 0) }}
              {{ $t('sum_single') }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('sum') }}
            </p>
          </div>
        </div>
        <div
          class="bg-gray max-sm:w-full flex-y-center flex-1 space-x-2.5 p-2 px-3 rounded-lg"
        >
          <i-calendar class="!m-0 text-primary text-2xl" />
          <div>
            <p
              class="text-sm font-semibold leading-130 text-brand-black whitespace-nowrap"
            >
              {{ dayjs(project?.start_date).format('DD.MM.YYYY') }}-{{
                dayjs(project?.end_date).format('DD.MM.YYYY')
              }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('request_period') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  project?: any
}
const props = defineProps<Props>()

const projectStatus = computed(() => props.project?.status)
</script>

<style scoped>
.description {
  @apply text-sm font-medium text-gray-700 leading-tight line-clamp-2;
}
</style>
