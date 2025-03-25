<template>
  <div class="rounded-lg bg-gray py-3 pl-3 pr-4 flex items-center gap-2.5">
    <component :is="`i-money-peper`" class="text-2xl text-primary" />
    <div>
      <p
        class="text-brand-black text-sm font-semibold leading-130 line-clamp-1"
      >
        {{ formatPrice(+price, $i18n.locale) }}
        {{ $t('sum_single').toLowerCase() }}
      </p>
      <p class="text-gray-700 text-xs font-medium mt-0.5">{{ $t('sum') }}</p>
    </div>
  </div>
  <div class="rounded-lg bg-gray py-3 pl-3 pr-4 flex items-center gap-2.5">
    <component :is="`i-calendar`" class="text-2xl text-primary" />
    <div>
      <p
        class="text-brand-black text-sm font-semibold leading-130 line-clamp-1"
      >
        {{ dayjs(new Date(from)).format('DD.MM.YYYY') }} -
        {{ dayjs(new Date(to)).format('DD.MM.YYYY') }}
      </p>
      <p class="text-gray-700 text-xs font-medium mt-0.5">
        daw
        {{ $t('request_period') }}
      </p>
    </div>
  </div>
  <div class="rounded-lg bg-gray py-3 pl-3 pr-4 flex items-center gap-2.5">
    <component :is="`i-map-pin`" class="text-2xl text-primary" />
    <div>
      <p
        class="text-brand-black text-sm font-semibold leading-130 line-clamp-1"
      >
        {{ location }}
      </p>
      <p class="text-gray-700 text-xs font-medium mt-0.5">
        {{ $t('event.info.address') }}
      </p>
    </div>
  </div>
  <ProjectsCardStatus class="max-sm:w-full" :status="status" />
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

import { TProjectStatus } from '~/types'
import { formatPrice } from '~/utils'

interface Props {
  price: number
  from: string
  to: string
  location: string
  status: TProjectStatus
}

defineProps<Props>()
</script>
