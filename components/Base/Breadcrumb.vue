<template>
  <div class="overflow-x-hidden hidden-print">
    <div
      class="hidden md:flex items-center gap-2 md:overflow-hidden py-3 md:py-4"
      :class="$attrs.class"
    >
      <NuxtLink
        to="/"
        class="flex-y-center gap-2 text-brand-black cursor-pointer leading-130 text-sm font-semibold transition-300 hover:text-primary group"
        :class="[textClass]"
      >
        <i-home class="text-2xl group-hover:text-inherit" />
        <p class="whitespace-nowrap">{{ $t('home') }}</p>
      </NuxtLink>
      <div
        v-for="(item, index) in breadcrumb"
        :key="index"
        class="flex-y-center gap-2 group shrink-0"
      >
        <div class="size-1 bg-gray-600 rounded-full" />
        <NuxtLink
          :to="item?.link"
          :class="[
            {
              'pointer-events-none !text-gray-700 ':
                index === breadcrumb?.length - 1,
            },
            textClass,
          ]"
          class="transition-300 flex cursor-pointer items-center text-brand-black leading-130 text-sm font-semibold min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap hover:text-primary"
        >
          {{ item?.title }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { IBreadcrumb } from '~/types'

interface Props {
  breadcrumb?: IBreadcrumb[]
  textClass?: string
}
defineProps<Props>()
</script>
