<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
    <div
      class="px-3 py-2.5 bg-white rounded-[14px] border border-gray-200 items-center gap-2.5 inline-flex w-full"
    >
      <div class="flex-col justify-start items-start gap-[3px] inline-flex">
        <p class="text-gray-700 text-sm font-medium leading-140">
          {{ $t('start_project_time') }}
        </p>
        <p class="text-brand-black text-base font-bold leading-130">
          {{ formatDate(startDate) }}
        </p>
      </div>
    </div>
    <div
      class="px-3 py-2.5 bg-white rounded-[14px] border border-gray-200 items-center gap-2.5 inline-flex w-full"
    >
      <div class="flex-col justify-start items-start gap-[3px] inline-flex">
        <p class="text-gray-700 text-sm font-medium leading-140">
          {{ $t('completion_time') }}
        </p>
        <p class="text-brand-black text-base font-bold leading-130">
          {{ formatDate(endDate) }}
        </p>
      </div>
    </div>
    <div
      v-if="price"
      class="px-3 py-2.5 bg-white rounded-[14px] border border-gray-200 items-center gap-2.5 inline-flex w-full"
    >
      <div class="flex-col justify-start items-start gap-[3px] inline-flex">
        <p class="text-gray-700 text-sm font-medium leading-140">
          {{ $t('money_for_project') }}
        </p>
        <p class="text-brand-black text-base font-bold leading-130">
          {{
            `${formatPrice(price, $i18n.locale)} ${$t(
              'sum_single'
            ).toLowerCase()}`
          }}
        </p>
      </div>
    </div>
    <div
      v-if="sourceOfBudget"
      class="px-3 py-2.5 bg-white rounded-[14px] border border-gray-200 items-center gap-2.5 inline-flex w-full"
    >
      <div class="flex-col justify-start items-start gap-[3px] inline-flex">
        <p class="text-gray-700 text-sm font-medium leading-140">
          {{ $t('source_of_budget') }}
        </p>
        <p class="text-brand-black text-base font-bold leading-130">
          {{ sourceOfBudget }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/uz'

import dayjs from 'dayjs'
import { useI18n } from 'vue-i18n'

interface Props {
  startDate?: string
  endDate?: string
  price?: number | string
  sourceOfBudget?: string
}
defineProps<Props>()

const { locale } = useI18n()

const formatDate = (date) => {
  return dayjs(date)
    .locale(locale.value === 'uz' ? 'uz-latn' : locale.value)
    .format('MMMM D, YYYY')
}
</script>
