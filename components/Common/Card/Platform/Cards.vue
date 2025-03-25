<template>
  <div
    class="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-4"
    :class="horizontal ? '!grid-cols-1' : ''"
  >
    <NuxtLink
      v-for="(item, index) in list"
      :key="index"
      :to="`/residents/${item?.slug}`"
      class="p-3 md:pt-8 md:p-5 border border-gray-500 rounded-20 md:inline-flex bg-white group cursor-pointer hover:md:translate-y-[-8px] duration-300 md:flex-col hover:shadow-platformHover"
      :class="{
        [mainClass]: true,
        '!flex !flex-row !justify-between !py-4 !px-6': horizontal,
      }"
    >
      <div
        class="flex items-center md:justify-between md:flex-col"
        :class="horizontal ? '!flex !flex-row !justify-center space-x-4' : ''"
      >
        <span
          class="w-[50px] h-[50px] shrink-0 md:w-20 md:h-20 rounded-full bg-white border-4 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
        >
          <CommonImage
            :src="item?.image || `/logos/ezgu.svg`"
            class="object-cover w-full h-full"
          />
        </span>
        <div class="ml-3 md:ml-0">
          <p
            class="text-brand-black text-xl font-extrabold leading-130 md:mt-5 md:mb-2 group-hover:text-primary duration-300"
            :class="horizontal ? '!text-start' : 'md:text-center'"
          >
            {{ item?.name }}
          </p>
          <p
            class="text-gray-700 text-xs leading-130 md:mb-5 font-medium line-clamp-1 h-[15px]"
            :class="horizontal ? '!text-start' : 'md:text-center'"
          >
            {{
              $t('resident_with', {
                date: dayjs(new Date(item?.create_date!))
                  .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
                  .format('DD MMMM, YYYY'),
              })
            }}
          </p>
        </div>
      </div>
      <div
        v-if="item?.project_count || item?.rank"
        class="flex items-center gap-2 mt-3 md:mt-0 card_platform"
      >
        <div
          class="px-2 py-2.5 text-brand-black text-sm leading-none font-semibold border border-gray-500 rounded-lg md:w-full text-center"
        >
          <p class="whitespace-nowrap">
            {{ item?.project_count ?? 0 }} {{ t('project') }}
          </p>
        </div>
        <div
          class="p-2 whitespace-nowrap text-brand-black !text-sm leading-none font-semibold border border-gray-500 rounded-lg flex flex-nowrap gap-1 items-center w-[115px] md:w-full justify-center"
        >
          <i-star class="text-warning" />
          <p>{{ t('ball', { count: item?.rank ?? 0 }) }}</p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

import type { IResident } from '~/types'

const { t } = useI18n()
interface Props {
  list: Omit<IResident, 'description'>[]
  mainClass?: string
  horizontal?: boolean
}

defineProps<Props>()
</script>
