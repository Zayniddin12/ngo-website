<template>
  <div
    class="flex-y-center justify-between w-full"
    :class="isCompany ? 'px-3 py-2' : 'p-4 pl-2'"
  >
    <div v-if="isCompany" class="flex-y-center space-x-2">
      <NuxtImg
        alt="image"
        :src="company?.image ?? '#'"
        class="rounded-full p-px w-[50px]"
      />
      <div class="space-y-1">
        <p class="text-base font-semibold text-brand-black leading-tight">
          {{ company?.title }}
        </p>
        <p class="text-xs font-medium text-gray-700 leading-none">
          {{
            t('statistics.service.join_date', {
              date: dayjs(company?.joinDate ?? new Date()).format('MMMM YYYY'),
            })
          }}
        </p>
      </div>
    </div>
    <div v-else class="flex-y-center space-x-2">
      <div class="w-8 h-8 p-1.5 bg-primary/10 rounded-lg flex-center">
        <component
          :is="`i-${company?.icon}`"
          class="!m-0 text-primary text-xl"
        />
      </div>
      <p class="text-base font-semibold text-brand-black leading-tight">
        {{ company?.title }}
      </p>
    </div>
    <div class="px-2 py-1 rounded-md flex-center bg-brand-black/15">
      <p class="text-base font-semibold text-brand-black leading-tight">
        {{ company?.projectCount }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { ICompany } from '~/types'

interface Props {
  company?: ICompany
  isCompany?: boolean
}

defineProps<Props>()

const { t } = useI18n()
</script>

<style scoped></style>
