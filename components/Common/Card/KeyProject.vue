<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div
      v-for="(item, idx) in items"
      :key="idx + item?.id"
      class="px-3 pt-3 pb-5 rounded-xl border border-gray-200 items-start gap-1.5 flex flex-col"
    >
      <div class="flex gap-2 items-center">
        <span class="w-2.5 h-2.5 bg-primary rounded-full shadow-round" />
        <div class="text-neutral-900 text-base font-bold leading-tight">
          {{ item?.name }}
        </div>
      </div>
      <div class="self-stretch pl-[18px] justify-start items-start gap-2.5 inline-flex">
        <div class="text-brand-black text-sm font-medium leading-tight">
          {{ item?.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IDocument } from '~/types'

interface props {
  items: IDocument[]
}
defineProps<props>()
</script>

<style>
.shadow-round {
  filter: drop-shadow(0px 2px 15px rgba(98, 173, 90, 0.4));
}
</style>
