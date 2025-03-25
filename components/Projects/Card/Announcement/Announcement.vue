<template>
  <div
    class="sm:flex-y-center flex-col shrink-0 sm:max-w-[560px] max-sm:w-full gap-3 cursor-pointer"
    @click="navigateToPage(item.id, item.type)"
  >
    <div
      class="flex sm:flex-row-reverse flex-col-reverse rounded-20 overflow-hidden bg-white border-2 border-gray-500 backdrop-blur"
    >
      <div class="p-5">
        <h3
          class="lg:text-lg text-xl text-brand-black font-extrabold leading-130 mb-7 line-clamp-2"
        >
          {{ item?.name }}
        </h3>
        <div class="flex items-center gap-2.5">
          <i-dollar class="text-primary text-2xl" />
          <div>
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{
                `${formatMoneyDecimal(item?.price)} ${$t(
                  'sum_single'
                ).toLowerCase()}`
              }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('sum') }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2.5 py-3">
          <i-map-pin class="text-primary text-2xl" />
          <div>
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{ item?.location }}
            </p>
            <p
              class="text-[11px] font-medium leading-130 text-gray-700 line-clamp-1"
            >
              {{ $t('address') }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-2.5">
          <i-calendar class="text-primary text-2xl" />
          <div>
            <p class="text-brand-black text-sm font-semibold leading-130">
              {{ dayjs(item?.start_date).format('DD.MM.YYYY') }}-{{
                dayjs(item?.end_date).format('DD.MM.YYYY')
              }}
            </p>
            <p class="text-[11px] font-medium leading-130 text-gray-700">
              {{ $t('request_period') }}
            </p>
          </div>
        </div>
      </div>
      <CommonImage
        :src="item?.image"
        class="max-sm:!w-full sm:max-w-[240px] shrink-0 sm:w-[240px] max-h-[270px]"
        image-class="object-cover object-center !w-full "
        alt="img"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import { TProjectType } from '~/types'
import { formatMoneyDecimal } from '~/utils'

const router = useRouter()

const navigateToPage = (id: number, type?: TProjectType) => {
  let result
  switch (type) {
    case 'gov_grant_project':
      result = '/grants'
      break
    case 'gov_subsidy_project':
      result = '/subsidies'
      break
    case 'social_project':
      result = '/projects'
      break
    default:
      result = '/projects'
  }

  router.push(`${result}/${id}`)
}

interface Props {
  item?: any
}

defineProps<Props>()
</script>

<style scoped></style>
