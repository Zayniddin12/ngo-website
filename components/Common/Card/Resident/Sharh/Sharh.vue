<template>
  <NuxtLink
    :target="item?.sharh_id_url ? '_blank' : ''"
    :to="item?.sharh_id_url ?? ''"
  >
    <div
      class="bg-white p-4 rounded-20 m-4"
      :class="item?.sharh_id_url ? 'cursor-pointer transition-300' : ''"
    >
      <div class="flex justify-between items-start">
        <div class="flex-y-center gap-3">
          <CommonImage
            :src="item?.image ?? '/images/default-user.png'"
            class="w-[50px] h-[50px] rounded-full"
            image-class="!w-full !h-full"
          />
          <div>
            <p class="text-brand-black text-base font-bold leading-tight">
              {{ item?.name ?? '' }}
            </p>
            <div class="flex-y-center gap-2">
              <BaseRating :rating="item?.rank ?? 0" />
              <span class="text-sm font-semibold leading-130 text-brand-black">
                {{ item?.rank ?? 0 }}
              </span>
            </div>
          </div>
        </div>
        <i-flag class="text-2xl text-white" />
      </div>

      <p
        class="line-clamp-3 text-brand-black text-sm font-medium mt-2.5 tracking-tight"
      >
        {{ item?.description }}
      </p>
      <span class="block bg-gray-500 w-full h-px my-2.5" />
      <div class="flex justify-between items-center">
        <span class="flex gap-2 items-center">
          <i-like class="text-xl text-gray-400" />
          <p class="text-gray-700 font-medium leading-140 text-xs">
            {{ $t('useful') }}
          </p></span
        >
        <span class="flex gap-2 items-center">
          <i-share class="text-xl text-gray-400" />
          <p class="text-gray-700 font-medium leading-140 text-xs">
            {{ $t('share') }}
          </p></span
        >
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IComment } from '@/types'

interface Props {
  item: IComment
}

defineProps<Props>()
</script>
