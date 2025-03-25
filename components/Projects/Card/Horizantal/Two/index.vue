<template>
  <NuxtLink
    :to="`/residents/project/${list?.slug}`"
    class="w-full flex-y-center flex-col lg:flex-row rounded-2xl border border-gray-500 bg-white hover:border-primary transition-300 cursor-pointer overflow-hidden"
  >
    <NuxtImg
      alt="image"
      :src="list?.image ?? ''"
      class="object-cover object-center w-full h-52 lg:w-56 rounded-t-2xl lg:!rounded-t-none lg:rounded-l-2xl"
    />
    <div class="p-4 space-y-8">
      <div class="space-y-4">
        <div class="space-y-2">
          <p class="text-lg font-extrabold leading-normal text-brand-black">
            {{ list?.name }}
          </p>
          <p class="text-xs font-medium leading-none">
            {{ $t('project_status') }}:
            <span class="text-base font-bold leading-tight">
              {{ $t('status.type.' + list?.status) }}
            </span>
          </p>
        </div>
        <div class="flex-y-center flex-col items-start lg:flex-row lg:gap-2">
          <ProjectsCardStatusTwo
            :title="$t('project_type')"
            :subtitle="$t('status.type.' + list?.status)"
          />
          <ProjectsCardStatusTwo
            :title="$t('project_sum')"
            :subtitle="formatNumberSpace(list?.price) + ' ' + 'UZS'"
          />
          <ProjectsCardStatusTwo
            :title="$t('request_period')"
            :subtitle="`${dayjs(new Date()).format('DD.MM.YYYY')} - ${dayjs(
              new Date()
            ).format('DD.MM.YYYY')}`"
          />
        </div>
        <p
          class="text-sm font-medium text-gray-700 leading-tight line-clamp-2"
          v-html="list?.description"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  list?: {
    description?: string
    image?: string
    name?: string
    slug?: string
    status?: string
    price?: string
  }
}
defineProps<Props>()
</script>
