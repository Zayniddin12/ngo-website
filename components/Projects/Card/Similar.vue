<template>
  <NuxtLink
    :to="href"
    class="bg-white p-5 rounded-20 border hover:border-primary duration-300 block"
  >
    <div class="flex flex-col gap-5">
      <div class="grid grid-cols-2 sm:gap-8 gap-4">
        <div class="flex gap-4 items-center">
          <span class="rounded-lg w-1 h-7 bg-primary"></span>
          <div>
            <h4 class="text-xs text-gray-700">{{ $t('page.grants.sum') }}</h4>
            <h6 class="text-base font-bold leading-[125%] text-primary mt-1.5">
              {{ formatNumberSpace(price) }}
              <span class="text-sm font-bold ml-1 text-brand-black uppercase">{{
                $t('sum_single')
              }}</span>
            </h6>
          </div>
        </div>
        <div class="flex gap-4 items-center">
          <span class="rounded-lg w-1 h-7 bg-primary"></span>
          <div>
            <h4 class="text-xs text-gray-700">{{ $t('page.grants.date') }}</h4>
            <h6 class="text-base font-bold leading-[125%] text-primary mt-1.5">
              {{ dayjs(new Date(date)).format('DD.MM.YYYY') }}
            </h6>
          </div>
        </div>
      </div>
      <div class="grid gap-2">
        <h1
          class="text-base leading-130 text-brand-black line-clamp-2 font-bold"
        >
          {{ name }}
        </h1>
        <p
          class="text-sm leading-140 font-medium text-gray-700 line-clamp-2"
          v-html="description"
        />
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  href: string
  name: string
  description: string
  price: number
  date: string
}

defineProps<Props>()
</script>
