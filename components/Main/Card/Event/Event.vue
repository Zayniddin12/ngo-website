<template>
  <div
    class="text-white relative cursor-pointer event-card"
    @click="navigateTo(`/social/${item?.slug}`)"
  >
    <div
      class="bg-brand-black/60 flex flex-col justify-end absolute z-10 w-80 md:w-[650px] lg:w-[900px] min-[1214px]:w-[1184px] h-[500px] rounded-20 py-6 px-4 md:py-10 md:px-16"
    >
      <CommonSectionHeaderTitle
        wrapper-class="space-y-4 md:w-[580px]"
        :title="item?.title"
        :subtitle="item?.description"
        is-subtitle-html
        subtitle-class="line-clamp-4 !text-gray-200"
        title-class="md:w-[425px] !text-2xl md:!text-4xl"
      />
      <div>
        <CommonCardUsers
          :users="
            item?.partners?.map((part) => ({
              id: part?.id,
              full_name: part?.name,
              image: part?.image,
              link: `/residents/${part?.slug}`,
            }))
          "
          is-tooltip
          class="my-6"
        />
      </div>
      <div
        class="flex md:flex-y-center flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0 md:mt-16"
      >
        <CommonSectionEventBottom
          :title="$t('event.info.date')"
          :subtitle="eventDate"
          subtitle-class="!text-base md:!text-xl"
        />
        <CommonSectionEventBottom
          :title="$t('event.info.address')"
          :subtitle="item?.location"
          subtitle-class="!text-base md:!text-xl"
        />
      </div>
    </div>
    <NuxtImg
      alt="image"
      :src="item?.image ?? '/images/defaultImg-for-events.svg'"
      class="object-cover object-center w-80 md:w-[650px] lg:w-[900px] min-[1214px]:w-[1184px] h-[500px] rounded-20"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import type { ISocialEvent } from '~/types'

interface Props {
  item?: ISocialEvent
  loading?: boolean
}

const props = defineProps<Props>()

const eventDate = computed(() => {
  return dayjs(props?.item?.date).format('DD MMMM, YYYY')
})
</script>

<style scoped>
.event-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(98, 173, 90, 0.28);
  z-index: 1;
  border-radius: 20px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.event-card:hover::before {
  opacity: 1;
}
</style>
