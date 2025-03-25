<template>
  <div
    class="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    :class="horizontal ? '!grid-cols-1' : ''"
  >
    <div
      v-for="key in 8"
      :key
      class="p-3 md:pt-8 md:p-5 border border-gray-500 rounded-20 md:inline-flex bg-white md:flex-col"
      :class="horizontal ? '!flex !flex-row !justify-between !py-4 !px-6' : ''"
    >
      <div
        class="flex items-center md:justify-between md:flex-col"
        :class="horizontal ? '!flex !flex-row !justify-center space-x-4' : ''"
      >
        <span
          class="w-[50px] h-[50px] shimmer shrink-0 md:w-20 md:h-20 rounded-full bg-white border-4 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
        />
        <div class="ml-3 md:ml-0">
          <p
            class="md:mt-5 md:mb-2 h-4 rounded w-[150px] shimmer"
            :class="horizontal ? '!text-start' : ''"
          />
          <div>
            <p class="md:mb-5 h-3 w-[100px] rounded shimmer" />
          </div>
        </div>
      </div>
      <div class="flex items-center gap-2 mt-3 md:mt-0 card_platform md:w-1/3">
        <span
          v-for="i in 2"
          :key="i"
          class="px-2 py-2.5 shimmer border border-gray-500 rounded-lg w-[115px] h-9 md:w-full"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  horizontal?: boolean
}

defineProps<Props>()
</script>
