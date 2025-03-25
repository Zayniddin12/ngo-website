<template>
  <div
    class="pl-3.5 pr-4 py-3 bg-white rounded-[14px] border border-gray-200 items-center justify-between gap-2.5 inline-flex w-full cursor-pointer"
    :class="{ 'opacity-50 pointer-events-none': isDownloading }"
    @click="downloadFile(item?.file!, item?.name!, downloadProcessTrigger)"
  >
    <div class="flex gap-2.5 items-center justify-between">
      <div
        class="w-10 h-10 p-2 bg-[#62ad5a1f] rounded-lg justify-center items-center flex"
      >
        <component
          :is="`i-${getIcon(item?.type)}`"
          class="text-2xl text-primary"
        />
      </div>
      <div class="flex-col justify-start items-start gap-[3px] flex">
        <p
          class="text-neutral-900 text-base font-bold leading-tight line-clamp-1 !break-all"
        >
          {{ item?.name ?? $t('file') }}
        </p>
        <p class="text-zinc-500 text-sm font-medium leading-tight">
          {{ convertKBtoMB(item?.size ?? 0) }}
        </p>
      </div>
    </div>
    <div
      class="hover:bg-primary/20 rounded-lg p-2 cursor-pointer transition-300 active:scale-95"
    >
      <i-download v-if="!isDownloading" class="text-2xl text-primary" />
      <i-spinner
        v-else
        class="text-2xl text-primary animate-spin duration-100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IFileProject } from '~/types'
import { convertKBtoMB, downloadFile } from '~/utils'

const isDownloading = ref(false)

const downloadProcessTrigger = (value: boolean) => {
  isDownloading.value = value
}

interface Props {
  item?: IFileProject
}

defineProps<Props>()

const getIcon = (type?: IFileProject['type']) => {
  switch (type) {
    case 'image':
      return 'video'
    case 'video':
      return 'video'
    case 'other':
      return 'file-text'
    default:
      return 'file-text'
  }
}
</script>
