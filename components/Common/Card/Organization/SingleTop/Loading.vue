<template>
  <div
    class="p-4 md:p-8 rounded-[20px] bg-white flex-y-center flex-col lg:flex-row justify-between"
  >
    <div class="gap-6 md:gap-7 flex-y-center flex-col md:flex-row w-full">
      <div class="flex-y-center md:justify-between md:flex-col">
        <span
          class="w-[104px] h-[104px] rounded-full bg-white shimmer border-2 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
        />
      </div>
      <div class="flex flex-col items-center md:items-start mt-3 md:mt-0 w-1/2">
        <div class="w-full">
          <p class="shimmer h-6 w-full rounded" />
          <p class="mb-4 shimmer w-[90%] h-3 rounded" />
        </div>
        <div class="flex-y-center gap-3 w-full">
          <div
            v-for="i in 2"
            :key="i"
            class="rounded-lg shimmer w-[115px] md:w-full h-7"
          />
        </div>
      </div>
    </div>

    <div
      v-if="isResident"
      class="px-4 py-3 border border-gray-500 rounded-xl inline-flex items-center md:flex-col md:gap-3 mt-5 md:mt-0 gap-7"
    >
      <a href="https://sharh.commeta.uz/ru">
        <img
          class="w-[96px] h-6 mx-auto"
          src="/svg/sharh-black.svg"
          alt="icon"
        />
      </a>
      <div class="flex-row md:flex-y-center gap-1">
        <div class="flex gap-1 items-center">
          <span class="text-base font-bold leading-4 text-brand-black">
            {{ item?.rating ?? 0 }}
          </span>
          <BaseRating item-class="w-5 h-5" :rating="item?.rating ?? 0" />
        </div>
        <p
          class="mx-auto text-center text-gray-700 text-xs leading-130 font-normal mt-0 md:mt-2"
        >
          77 777 отзывов
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const { t } = useI18n()
interface Props {
  item: any
  isResident: boolean
}

defineProps<Props>()
</script>
