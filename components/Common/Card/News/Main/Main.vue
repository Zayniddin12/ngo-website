<template>
  <NuxtLink :to="`/news/${data?.id}`">
    <div
      class="lg:max-w-[579px] w-full md:h-[379px] rounded-[20px] bg-white overflow-hidden relative duration-300 hover:shadow-platformHover border border-transparent hover:border-primary"
      :class="{ isSmall: 'w-[200px] h-[200px]' }"
    >
      <div v-if="!loading">
        <CommonImage
          :src="data?.image[0].image"
          alt="image"
          class="w-full h-full object-cover"
        />
      </div>

      <div
        class="w-full pb-5 p-5 pr-6 z-10 absolute bottom-0"
        :class="{ news_card_shadow: !loading }"
      >
        <div
          v-if="!loading"
          class="px-3 py-[7px] bg-white/20 rounded-md border border-white/10 justify-center items-center gap-2.5 inline-flex"
        >
          <span class="text-stone-500 text-sm font-semibold leading-[18.20px]">
            #
          </span>
          <p class="text-white text-sm font-semibold leading-[18.20px]">
            {{ data?.category?.name }}
          </p>
        </div>
        <div v-if="loading" class="shimmer w-[40%] h-8 rounded-lg" />
        <p
          v-if="!loading"
          class="text-white text-base md:text-xl font-bold leading-140 mt-2 md:mt-3 line-clamp-2"
          :class="{ isSmall: 'text-xs mt-2' }"
        >
          {{ data?.title }}
        </p>
        <span
          v-if="loading"
          class="shimmer w-full rounded mt-2"
          :class="[
            {
              'h-3 line-clamp-2': isSmall,
              'h-4 md:h-6 md:mt-3': !isSmall,
            },
          ]"
        />
        <div
          class="flex gap-3 opacity-80"
          :class="[{ hidden: isSmall, 'mt-4': !isSmall }]"
        >
          <div v-if="!loading" class="flex gap-1 items-center">
            <i-eye class="text-base text-white" />
            <p class="text-white text-xs font-medium">
              {{ data?.view_count ?? '0' }}
            </p>
          </div>
          <div v-if="!loading" class="flex gap-1 items-center">
            <i-calendar class="text-base text-white" />
            <p class="text-white text-xs font-medium capitalize">
              {{
                dayjs(data?.date)
                  .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
                  .format('DD MMM, YYYY')
              }}
            </p>
          </div>
          <span v-if="loading" class="shimmer w-[10%] h-4 rounded" />
          <span v-if="loading" class="shimmer w-[30%] h-4 rounded" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/uz-latn'

import dayjs from 'dayjs'

interface Props {
  data: any
  isSmall: boolean
  loading?: boolean
}
defineProps<Props>()
</script>

<style scoped>
.news_card_shadow {
  background: linear-gradient(180deg, rgba(19, 22, 18, 0) 0%, #131612 100%);
}
</style>
