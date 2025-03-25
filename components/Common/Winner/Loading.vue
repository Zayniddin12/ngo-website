<template>
  <div
    v-for="key in 3"
    :key="key"
    class="p-4 border border-gray-500 rounded-20 md:inline-flex bg-white md:flex-col w-full mb-3"
  >
    <div :class="!isMobile ? '!flex items-start  !justify-between w-full' : ''">
      <div
        class="flex items-center md:justify-between md:flex-col relative !overflow-visible"
        :class="!isMobile ? '!flex !flex-row !justify-center space-x-4' : ''"
      >
        <div
          class="w-[50px] h-[50px] shimmer shrink-0 md:w-20 md:h-20 relative rounded-full bg-white border-2 border-white flex-y-center justify-center items-center overflow-hidden shadow-platformCards"
        />
        <div class="ml-3 md:ml-0 w-[200px]">
          <p
            class="shimmer w-[180px] h-6 md:mt-5 md:mb-2 md:text-center"
            :class="{
              '!text-start': !isMobile,
            }"
          />
          <p class="md:mb-5 md:text-center shimmer h-4 w-[80%]" />
        </div>
      </div>
      <div class="shimmer w-24 h-8 rounded-lg" />
    </div>

    <div class="flex-y-center gap-2 mt-4 max-md:flex-col max-md:gap-5">
      <div v-for="key in 3" :key class="shimmer h-14 w-full rounded-lg" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowSize,
} from '@vueuse/core/index'

const { width } = useWindowSize()

const isMobile = ref(false)

watch(width, () => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})

onMounted(() => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})
</script>
