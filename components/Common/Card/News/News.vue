<template>
  <nuxt-link
    :to="`/news/${card?.id}`"
    class="flex-col !rounded-20 overflow-hidden cursor-pointer duration-300 group hover:shadow-platformHover group border hover:border-primary border-transparent"
  >
    <div v-for="(item, idx) in card?.image?.slice(0, 1)" :key="idx">
      <CommonImage
        :src="item.image"
        alt="news image"
        class="object-cover w-full h-[182px] rounded-t-20"
      />
    </div>
    <div v-if="loading" class="w-full h-[182px] rounded-t-20 shimmer" />
    <div class="flex flex-col h-full p-3 sm:p-4 bg-white">
      <div v-if="!loading">
        <div v-if="cardCategory">
          <div
            v-if="card?.category?.name"
            ref="category"
            class="px-3 py-[7px] bg-white/20 rounded-md border border-[#13161214] justify-center items-center gap-1 inline-flex w-max mb-2"
          >
            <span class="text-[#686A67] text-sm font-semibold block"> # </span>
            <p class="text-[#686A67] text-sm font-semibold leading-[18.20px]">
              {{ card?.category?.name }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="loading" class="shimmer w-[40%] h-8 rounded-lg" />
      <Highlighter
        :text-to-highlight="card?.title || ''"
        class="font-bold text-sm sm:text-base line-clamp-2 leading-140 mb-2"
        highlight-class-name="bg-[#EDB716] rounded-sm p-0.5"
        :search-words="[route.query.search]"
      />
      <span
        v-if="loading"
        class="shimmer !!bg-[#edeef1] h-3.5 mb-2 w-full rounded my-2"
      />
      <span
        v-if="loading"
        class="shimmer !!bg-[#edeef1] h-3.5 mb-2 w-1/2 rounded"
      />
      <div v-if="card?.description && !loading">
        <p class="text-gray-700 text-sm line-clamp-2 font-medium leading-136">
          {{ extractContent(card?.description).slice(0, 200) }}
        </p>
      </div>
      <span
        v-if="loading"
        class="shimmer !!bg-[#edeef1] h-2 mb-2 w-full rounded mt-2"
      />
      <span
        v-if="loading"
        class="shimmer !!bg-[#edeef1] h-2 mb-2 w-full rounded"
      />
      <div class="flex gap-3 mt-5">
        <div v-if="isView" class="flex gap-1 items-center">
          <i-eye class="text-base text-gray-700" />
          <p class="text-gray-700 text-xs font-medium">

            {{ card?.view_count ?? '0' }}
          </p>
        </div>
        <div v-if="!loading && card?.date" class="flex gap-1 items-center">
          <i-calendar class="text-base text-gray-700" />
          <p class="text-gray-700 text-xs font-medium capitalize">
            {{
              dayjs(card?.date)
                .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
                .format('DD MMM, YYYY')
            }}
          </p>
        </div>
        <span
          v-if="loading"
          class="shimmer !!bg-[#edeef1] w-[30%] h-4 rounded"
        />
        <span
          v-if="loading"
          class="shimmer !!bg-[#edeef1] w-[60%] h-4 rounded"
        />
      </div>
    </div>
  </nuxt-link>
</template>
<script lang="ts" setup>
import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/uz-latn'

import dayjs from 'dayjs'
import Highlighter from 'vue-highlight-words'

import { extractContent } from '~/utils'

const route = useRoute()

defineProps<{
  cardCategory?: boolean
  isView?: boolean
  card?: any
  loading?: boolean
}>()
</script>

<style scoped></style>
