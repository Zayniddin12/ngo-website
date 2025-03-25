<template>
  <div
    class="w-full md:h-16 px-4 py-2 bg-neutral-100 rounded-lg justify-between items-center inline-flex"
  >
    <div class="justify-start items-center gap-4 flex">
      <div
        class="w-12 h-12 shrink-0 p-2.5 bg-[#e3eee2] rounded-[50px] border border-[eaf2e9] justify-center items-center flex"
      >
        <i-file-filled class="text-28 text-primary" />
      </div>
      <div class="flex-col justify-start items-start gap-1 inline-flex">
        <p class="text-brand-black text-base font-semibold leading-130">
          {{ title }}
        </p>
        <p class="self-stretch text-gray-700 text-sm font-medium leading-130">
          {{ convertKBtoMB(size) }}
        </p>
      </div>
    </div>
    <span @click="downloadFile(link!, title!, downloadProcessTrigger)">
      <BaseButton
        :disabled="isDownloading"
        class="hidden md:block"
        :text="$t('download_btn')"
        variant="green"
      >
        <template #suffix>
          <i-download v-if="!isDownloading" class="!mb-0 text-2xl" />
          <i-spinner v-else class="text-2xl text-primary animate-spin" />
        </template>
      </BaseButton>
      <i-download class="text-2xl text-primary block md:hidden" />
    </span>
  </div>
</template>
<script setup lang="ts">
import { downloadFile } from '~/utils'

const isDownloading = ref(true)

const downloadProcessTrigger = (value: boolean) => {
  isDownloading.value = value
}

interface Props {
  title: string
  size: number
  link: string
}

defineProps<Props>()
</script>
