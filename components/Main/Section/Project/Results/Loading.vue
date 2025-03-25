<template>
  <div v-if="!responsiveSlider" class="!grid !gap-6 !grid-cols-4">
    <div
      v-for="index in 8"
      :key="index"
      class="h-[368px] w-full rounded-20 border-gray-500 border bg-white relative"
    >
      <span
        class="bg-[#edeef1] h-7 w-[70px] rounded-lg absolute -top-3.5 left-4 z-10"
      />
      <span class="shimmer bg-[#edeef1] h-[50%] w-full rounded-t-20" />
      <span
        class="shimmer bg-[#edeef1] h-3 w-[80%] rounded-lg mt-4 ml-4 mb-2"
      />
      <span class="shimmer bg-[#edeef1] h-3 w-[80%] rounded-lg ml-4" />
      <span class="shimmer bg-[#edeef1] h-3 w-[80%] rounded-lg ml-4 mb-5" />
      <div class="w-full flex justify-between px-4">
        <div class="w-full flex gap-2">
          <span class="bg-[#edeef1] h-8 w-8 rounded-lg" />
          <div>
            <div><span class="w-full h-4 shimmer rounded-lg" /></div>
            <span class="w-10 h-4 shimmer bg-[#edeef1] mt-2 rounded-lg" />
          </div>
        </div>
        <div class="w-full flex gap-2">
          <span class="bg-[#edeef1] h-8 w-8 rounded-lg" />
          <div>
            <div><span class="w-full max-w-20 h-4 shimmer rounded-lg" /></div>
            <span class="w-10 h-4 shimmer mt-2 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="flex gap-6 flex-nowrap">
    <div v-for="index in 2" :key="index" class="w-[300px] h-full">
      <div
        class="h-[368px] w-full rounded-20 border-gray-500 border bg-white relative"
      >
        <span
          class="bg-[#edeef1] h-7 w-[70px] rounded-lg absolute -top-3.5 left-4 z-10"
        />
        <span class="shimmer bg-[#edeef1] h-[50%] w-full rounded-t-20" />
        <span
          class="shimmer bg-[#edeef1] h-3 w-[80%] rounded-lg mt-4 ml-4 mb-2"
        />
        <span class="shimmer bg-[#edeef1] h-3 w-[80%] rounded-lg ml-4" />
        <span class="shimmer bg-[#edeef1] h-3 w-[80%] rounded-lg ml-4 mb-5" />
        <div class="w-full flex justify-between px-4">
          <div class="w-full flex gap-2">
            <span class="bg-[#edeef1] h-8 w-8 rounded-lg" />
            <div>
              <div>
                <span class="w-full h-4 shimmer bg-[#edeef1] rounded-lg" />
              </div>
              <span class="w-10 h-4 shimmer bg-[#edeef1] mt-2 rounded-lg" />
            </div>
          </div>
          <div class="w-full flex gap-2">
            <span class="bg-[#edeef1] h-8 w-8 rounded-lg" />
            <div>
              <div>
                <span
                  class="w-full max-w-20 h-4 shimmer bg-[#edeef1] rounded-lg"
                />
              </div>
              <span class="w-10 h-4 shimmer bg-[#edeef1] mt-2 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
const responsiveSlider = ref(false)
onMounted(() => {
  if (width.value < 900) {
    responsiveSlider.value = true
  }
})
</script>
