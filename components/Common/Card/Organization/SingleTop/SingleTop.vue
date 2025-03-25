<template>
  <div
    class="p-4 md:p-8 rounded-[20px] bg-white flex-y-center flex-col md:flex-row max-lg:gap-5 justify-between"
  >
    <div class="gap-6 md:gap-7 flex-y-center flex-col md:flex-row">
      <div class="flex-y-center md:justify-between md:flex-col">
        <span
          class="w-[104px] h-[104px] rounded-full bg-white border-2 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
        >
          <CommonImage :src="imgSrc" class="object-cover w-full h-full" />
        </span>
      </div>
      <div class="flex flex-col items-center md:items-start mt-3 md:mt-0">
        <div>
          <p
            class="text-brand-black text-xl max-md:text-center font-extrabold leading-130 mb-0.5 group-hover:text-primary duration-300"
          >
            {{ item?.name }}
          </p>
          <p class="text-gray-700 text-xs leading-130 mb-4 font-medium">
            {{
              t('resident_with', {
                date: formattedDate,
              })
            }}
          </p>
        </div>
        <div class="flex-y-center gap-3">
          <span
            v-if="item?.mark"
            class="p-2 text-brand-black !text-sm !leading-130 !font-semibold border border-gray-500 rounded-lg flex gap-1 items-center w-[115px] md:w-full justify-center"
          >
            <i-star class="text-warning" />
            {{ t('ball', { count: item?.mark }) }}
          </span>
          <a
            v-if="item?.web_site || item?.sharh_link"
            :href="item?.web_site || item?.sharh_link"
            target="_blank"
            rel="noreferrer noopener"
          >
            <BaseButton
              variant="primary"
              :text="$t('website')"
              class="!text-sm !font-bold !leading-none !px-6 !py-2"
            >
              <template #suffix>
                <i-external-link class="text-xl !m-0" />
              </template>
            </BaseButton>
          </a>
        </div>
      </div>
    </div>

    <div
      v-if="isResident"
      class="px-4 py-3 border border-gray-500 rounded-xl inline-flex items-center md:!w-fit max-lg:w-full max-lg:justify-between md:flex-col md:gap-3 mt-5 md:mt-0 gap-7"
    >
      <a href="https://sharh.commeta.uz" target="_blank">
        <img
          class="w-[96px] h-6 mx-auto"
          src="/svg/sharh-black.svg"
          alt="icon"
        />
      </a>
      <div class="flex-row md:flex-y-center gap-1">
        <div class="flex gap-1 items-center">
          <span class="text-base font-bold leading-4 text-brand-black">
            {{ item?.sharh_rating?.toFixed(1) ?? 0 }}
          </span>
          <BaseRating
            item-class="w-5 h-5"
            :rating="item?.sharh_rating ?? 0"
            star-color="text-sharh-green"
          />
        </div>
        <p
          v-if="item?.sharh_comment_count"
          class="mx-auto text-center text-gray-700 text-xs leading-130 font-normal mt-0 md:mt-2"
        >
          {{ item?.sharh_comment_count }} {{ $t('comments') }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

import type { IResidentSingle } from '@/types/residents'

interface Props {
  item: IResidentSingle
  isResident?: boolean
}

const props = defineProps<Props>()

const { t } = useI18n()
const { isValidImageUrl } = useValidImage()

const formattedDate = computed(() =>
  dayjs(props.item?.register_date ?? new Date()).format('DD MMMM, YYYY')
)

const imgSrc = ref('/images/defaultImg-for-project.svg')

onUpdated(async () => {
  imgSrc.value = await isValidImageUrl(
    props.item?.image,
    '/images/defaultImg-for-project.svg'
  )
})
</script>
