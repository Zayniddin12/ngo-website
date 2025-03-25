<template>
  <div class="mt-9 grid grid-cols-2 lg:gap-6 gap-3">
    <NuxtLink
      v-for="(item, index) in projectAnnounces"
      :key="index"
      :to="`/projects/${item?.id}`"
      class="flex rounded-20 overflow-hidden bg-white border-2 border-gray-500 hover:border-primary duration-300 backdrop-blur justify-between"
      :class="{ 'flex-row-reverse': index === 2 || index === 3 }"
    >
      <div class="p-5">
        <h3
          class="lg:text-lg text-xl text-brand-black font-extrabold leading-130 mb-7 line-clamp-2"
        >
          {{ item.name }}
        </h3>
        <div class="flex items-center gap-2.5">
          <i-dollar class="text-primary text-2xl" />
          <div>
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{ formatNumberSpace(item?.price ?? 0) }}
              {{ $t('sum_single').toLowerCase() }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('sum') }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2.5 py-3">
          <i-map-pin class="text-primary text-2xl" />
          <div>
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{ item?.location }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('address') }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2.5">
          <i-calendar class="text-primary text-2xl" />
          <div>
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{
                `${dayjs(item?.start_date ?? new Date()).format(
                  'DD.MM.YYYY'
                )} - ${dayjs(item?.end_date ?? new Date()).format(
                  'DD.MM.YYYY'
                )}`
              }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('request_period') }}
            </p>
          </div>
        </div>
      </div>
      <CommonImage
        :src="item?.image"
        class="lg:max-w-[240px] shrink-0 w-full max-w-[180px] max-h-240px]"
        image-class="object-cover object-center"
        alt="img"
      />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { IProjectAnouncement } from '~/types'

interface Props {
  projectAnnounces?: IProjectAnouncement[]
}
defineProps<Props>()
</script>

<style scoped></style>
