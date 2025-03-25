<template>
  <div
    class="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    :class="horizontal ? '!grid-cols-1' : ''"
  >
    <NuxtLink
      v-for="(item, index) in list"
      :key="index"
      :to="`/residents/${item?.user.id}`"
      class="p-3 md:pt-8 md:p-5 border border-gray-500 rounded-20 md:inline-flex bg-white group cursor-pointer hover:md:translate-y-[-8px] duration-300 md:flex-col hover:shadow-platformHover"
      :class="horizontal ? '!flex !flex-row !justify-between !py-4 !px-6' : ''"
    >
      <div
        class="flex items-center md:justify-between md:flex-col"
        :class="horizontal ? '!flex !flex-row !justify-center space-x-4' : ''"
      >
        <span
          class="w-[50px] h-[50px] shrink-0 md:w-20 md:h-20 rounded-full bg-white border-4 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
        >
          <CommonImage
            :src="item?.user.avatar || `/logos/ezgu.svg`"
            class="object-cover w-full h-full"
          />
        </span>
        <div class="ml-3 md:ml-0">
          <p
            class="text-brand-black text-xl font-extrabold leading-130 md:mt-5 md:mb-2 group-hover:text-primary duration-300 md:text-center"
            :class="horizontal ? '!text-start' : ''"
          >
            {{ item?.user?.full_name }}
          </p>
          <p
            class="text-gray-700 text-xs leading-130 md:mb-5 md:text-center font-medium"
          >
            {{
              t('resident_with', {
                date: dayjs(item?.time).format('DD MMMM, YYYY'),
              })
            }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

import type { IProduct } from '~/types'

const { t } = useI18n()
interface Props {
  list?: IProduct[]
  horizontal?: boolean
}

defineProps<Props>()
</script>
