<template>
  <NuxtLink
    :to="`/projects/${project?.id}`"
    class="w-full block p-4 rounded-2xl border border-gray-500 !bg-white hover:border-primary transition-300 cursor-pointer"
  >
    <div class="flex-col gap-y-3">
      <BaseButton
        v-if="project?.category?.name"
        variant="green"
        class="!rounded-20 border-2 solid border-white/15 !p-2 mb-3 block"
        :text="project?.category?.name"
      />

      <div
        class="flex flex-col min-[400px]:flex-row min-[400px]:items-center min-[400px]:justify-between"
      >
        <div class="flex items-center gap-4 mb-5">
          <div class="bg-primary w-1 h-9 rounded-xl group-hover:bg-white/40" />
          <div>
            <h3
              class="text-gray-700 font-normal text-sm max-[500px]:text-xs leading-tight"
            >
              {{ $t('page.grants.sum') }}
            </h3>
            <p
              class="text-brand-black text-base max-[500px]:text-xs leading-tight font-bold mt-1 group-hover:text-white"
            >
              {{ formatNumberSpace(project?.price) }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 mb-5">
          <div class="bg-primary w-1 h-9 rounded-xl group-hover:bg-white/40" />
          <div>
            <h3
              class="text-gray-700 font-normal text-sm max-[500px]:text-xs leading-tight"
            >
              {{ $t('page.grants.date') }}
            </h3>
            <p
              class="text-brand-black text-base max-[500px]:text-xs leading-tight font-bold mt-1 group-hover:text-white"
            >
              {{ dayjs(project?.end_date).format('DD.MM.YYYY') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="space-y-8">
      <div class="">
        <p class="text-lg font-extrabold leading-normal text-brand-black">
          {{ project?.name }}
        </p>
        <div class="description" v-html="project?.description" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  project?: any
}

defineProps<Props>()
</script>

<style scoped>
.description {
  @apply text-sm font-medium text-gray-700 leading-tight line-clamp-2 my-2;
}
</style>
