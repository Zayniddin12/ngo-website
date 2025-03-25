<template>
  <div
    class="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    :class="!isMobile ? '!grid-cols-1' : ''"
  >
    <NuxtLink
      v-for="(item, index) in list"
      :key="index"
      :to="`/residents/${item?.company?.slug}`"
      :class="{ '!bg-primary !border-primary': item?.status === 'approved' }"
      class="p-4 border border-gray-500 rounded-20 md:inline-flex bg-white group cursor-pointer hover:md:translate-y-[-8px] duration-300 md:flex-col hover:shadow-platformHover"
    >
      <div :class="!isMobile ? '!flex items-start  !justify-between' : ''">
        <div
          class="flex items-center md:justify-between md:flex-col relative !overflow-visible"
          :class="!isMobile ? '!flex !flex-row !justify-center space-x-4' : ''"
        >
          <img
            v-if="item?.status === 'approved'"
            class="absolute left-2 -top-4 z-30 w-[60px] max-md:-left-4 max-md:-top-[22px]"
            alt="crown"
            src="/svg/crown.svg"
          />
          <span
            :class="{ '!border-warning-150': item?.status === 'approved' }"
            class="w-[50px] h-[50px] shrink-0 md:w-20 md:h-20 relative rounded-full bg-white border-2 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
          >
            <CommonImage
              :src="item?.company.image || `/logos/ezgu.svg`"
              class="object-cover w-full h-full"
            />
          </span>
          <div class="ml-3 md:ml-0">
            <p
              class="text-brand-black text-xl font-extrabold leading-130 md:mt-5 md:mb-2 duration-300 md:text-center"
              :class="{
                '!text-start': !isMobile,
                'text-white': item?.status === 'approved',
              }"
            >
              {{ item?.company.name }}
            </p>
            <p
              :class="{ 'text-white': item?.status === 'approved' }"
              class="text-gray-700 text-xs leading-130 md:mb-5 font-medium"
            >
              {{
                t('resident_with', {
                  date: dayjs(new Date(item?.company.date))
                    .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
                    .format('DD MMMM, YYYY'),
                })
              }}
            </p>
          </div>
        </div>
        <div>
          <div
            v-if="item?.status === 'approved'"
            class="relative flex items-start max-md:items-center gap-1 max-md:mt-5 md:-mb-10 -mb-6"
          >
            <BaseButton class="max-md:w-[60%]" variant="green-text">
              {{ $t('participants.status.approved') }}
            </BaseButton>
            <img class="max-md:relative" src="/images/cup.png" alt="cup" />
          </div>

          <BaseButton
            v-if="item?.status === 'new'"
            class="max-md:w-full max-md:mt-5"
            variant="secondary-gold"
          >
            {{ $t('participants.status.new') }}
          </BaseButton>
          <BaseButton
            v-if="item?.status === 'rejected'"
            class="max-md:w-full max-md:mt-5"
            variant="bg-gray"
          >
            {{ $t('participants.status.rejected') }}
          </BaseButton>
        </div>
      </div>

      <div
        :class="{ '-mt-[30px]': item?.status === 'approved' }"
        class="flex-y-center mt-2 gap-2 max-md:flex-col max-md:gap-5"
      >
        <div
          :class="{
            '!backdrop-blur-lg bg-gray/10  !border-transparent':
              item?.status === 'approved',
          }"
          class="border-solid max-md:w-full border border-gray flex-y-center flex-1 space-x-2.5 p-2 px-3 rounded-lg"
        >
          <div>
            <p
              :class="{ '!text-gray-500': item?.status === 'approved' }"
              class="text-sm font-medium leading-140 text-gray-700"
            >
              {{ $t('date_application') }}
            </p>
            <p
              :class="{ 'text-white': item?.status === 'approved' }"
              class="text-base font-bold leading-130 text-brand-black whitespace-nowrap mt-1"
            >
              {{
                dayjs(new Date(item?.date_of_application)).format('DD.MM.YYYY')
              }}
            </p>
          </div>
        </div>
        <div
          :class="{
            '!backdrop-blur-lg max-md:w-full bg-gray/10  !border-transparent':
              item?.status === 'approved',
          }"
          class="border-solid max-md:w-full border border-gray flex-y-center flex-1 space-x-2.5 p-2 px-3 rounded-lg"
        >
          <div>
            <p
              :class="{ '!text-gray-500': item?.status === 'approved' }"
              class="text-sm font-medium leading-140 text-gray-700"
            >
              {{ $t('completion_time') }}
            </p>
            <p
              :class="{ 'text-white': item?.status === 'approved' }"
              class="text-base font-bold leading-130 text-brand-black whitespace-nowrap mt-1"
            >
              {{ calculateCompletionTime(item?.start_date, item?.end_date) }}
              {{ $t('hour') }}
            </p>
          </div>
        </div>
        <div
          :class="{
            '!backdrop-blur-lg bg-gray/10 !border-transparent':
              item?.status === 'approved',
          }"
          class="border-solid max-md:w-full border border-gray flex-y-center flex-1 space-x-2.5 p-2 px-3 rounded-lg"
        >
          <div>
            <p
              :class="{ '!text-gray-500': item?.status === 'approved' }"
              class="text-sm font-medium leading-140 text-gray-700"
            >
              {{ $t('sum') }}
            </p>
            <p
              :class="{ 'text-white': item?.status === 'approved' }"
              class="text-base font-bold leading-130 text-brand-black whitespace-nowrap mt-1"
            >
              {{ formatNumberSpace(item?.price) }}
              <span class="lowercase">{{ $t('sum_single') }}</span>
            </p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/uz-latn'

import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowSize,
} from '@vueuse/core'
import dayjs from 'dayjs'

import { TParticipantStatus } from '~/types'
import { formatNumberSpace } from '~/utils'

interface Props {
  list?: {
    id: number
    company: {
      name: string
      date: string
      image: string
      slug: string
    }
    date_of_application: string
    start_date: string
    end_date: string
    price: number
    status: TParticipantStatus
  }[]
}
defineProps<Props>()
const calculateCompletionTime = (startDate: string, endDate: string) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  return end.diff(start, 'month')
}

const { t } = useI18n()
// const list = [
//   {
//     image: 'https://picsum.photos/72',
//     company_name: 'Company 1',
//     time: new Date(),
//     projects_count: 5,
//     ball_count: 10,
//     id: 1,
//     completion_time: 24,
//     sum: 800700000,
//     primary_winner: true,
//     secondary_winner: false,
//     participant: false,
//   },
//   {
//     image: 'https://picsum.photos/73',
//     company_name: 'Company 2',
//     time: new Date(),
//     projects_count: 8,
//     ball_count: 15,
//     id: 2,
//     completion_time: 24,
//     sum: 800700000,
//     primary_winner: false,
//     secondary_winner: true,
//     participant: false,
//   },
//   {
//     image: 'https://picsum.photos/73',
//     company_name: 'Company 2',
//     time: new Date(),
//     projects_count: 8,
//     ball_count: 15,
//     id: 2,
//     completion_time: 24,
//     sum: 800700000,
//     primary_winner: false,
//     secondary_winner: false,
//     participant: true,
//   },
// ]

const { width } = useWindowSize()

const isMobile = ref(false)

watch(width, () => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})

onMounted(() => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})
</script>
