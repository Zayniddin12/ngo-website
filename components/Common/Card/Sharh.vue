<template>
  <NuxtLink
    aria-label="Sharh"
    class="cursor-pointer transition-300 bg-[#F4F6F4] space-y-[10px] w-[340px] h-[185px] border-2 border-white p-4 rounded-20 block"
    :target="item?.sharh_id_url ? '_blank' : ''"
    :to="item?.sharh_id_url"
  >
    <div class="flex-y-center gap-3">
      <CommonImage
        :src="item?.image ?? '/images/default-user.png'"
        class="w-[50px] h-[50px] shrink-0 rounded-full"
        image-class="!w-full !h-full"
      />
      <div>
        <p class="text-brand-black text-base font-bold leading-tight">
          {{ item?.name ?? '' }}
        </p>
        <i18n-t
          keypath="common_source"
          scope="global"
          tag="p"
          class="text-brand-black text-sm font-medium tracking-tight"
        >
          <template #name>
            <span
              class="text-brand-black text-sm font-semibold tracking-tight"
              >{{ item?.company ?? '' }}</span
            >
          </template>
        </i18n-t>
      </div>
    </div>
    <div class="flex-y-center gap-2">
      <BaseRating :rating="item?.rank ?? 0" />
      <span class="text-sm font-semibold leading-130 text-brand-black">
        {{ item?.rank ?? 0 }}
      </span>
    </div>
    <p
      class="line-clamp-3 text-brand-black text-sm font-medium font-['Vela Sans'] tracking-tight"
    >
      {{ item?.description ?? '' }}
    </p>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IFeedback } from '~/types'

interface Props {
  item: IFeedback
}

defineProps<Props>()
</script>

<style scoped></style>
