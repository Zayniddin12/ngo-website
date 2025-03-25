<template>
  <div v-if="!responsiveSlider" class="grid grid-cols-2 gap-6 mt-9">
    <div v-for="index in 6" :key="index">
      <div
        class="w-full h-60 bg-white rounded-20 border-gray-500 backdrop-blur flex"
      >
        <div class="p-5 w-[60%] h-full">
          <span class="shimmer !bg-[#edeef1] w-[90%] h-5 rounded-lg mb-2" />
          <span class="shimmer !bg-[#edeef1] w-[95%] h-5 rounded-lg mb-7" />
          <div class="flex items-center gap-3 w-full h-12">
            <span class="bg-[#edeef1] h-10 w-10 rounded-lg" />
            <div>
              <span class="shimmer !bg-[#edeef1] w-28 h-4 rounded-lg" />
              <div>
                <span class="shimmer !bg-[#edeef1] w-16 h-4 rounded-lg" />
              </div>
            </div>
          </div>
          <div class="flex items-center gap-3 w-full h-12">
            <span class="bg-[#edeef1] h-10 w-10 rounded-lg" />
            <div>
              <span class="shimmer !bg-[#edeef1] w-28 h-4 rounded-lg" />
              <div>
                <span class="shimmer !bg-[#edeef1] w-16 h-4 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <span class="w-[40%] h-full rounded-r-20 shimmer !bg-[#edeef1]" />
      </div>
    </div>
  </div>
  <div v-else class="flex gap-6 flex-nowrap">
    <div v-for="index in 2" :key="index" class="w-[300px] h-full">
      <span class="shimmer !bg-[#edeef1] w-full rounded-t-20 h-28" />
      <div class="p-5 w-full h-[60%]">
        <span
          class="shimmer !bg-[#edeef1] w-[90%] bg-red-900 h-5 rounded-lg mb-2"
        />
        <span class="shimmer !bg-[#edeef1] w-[95%] h-5 rounded-lg mb-7" />
        <div class="flex items-center gap-3 w-full h-12">
          <span class="bg-[#edeef1] h-10 w-10 rounded-lg" />
          <div>
            <span class="shimmer !bg-[#edeef1] w-28 h-4 rounded-lg" />
            <div>
              <span class="shimmer !bg-[#edeef1] w-16 h-4 rounded-lg" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 w-full h-12">
          <span class="bg-[#edeef1] h-10 w-10 rounded-lg" />
          <div>
            <span class="shimmer !bg-[#edeef1] w-28 h-4 rounded-lg" />
            <div>
              <span class="shimmer !bg-[#edeef1] w-16 h-4 rounded-lg" />
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 w-full h-12">
          <span class="bg-[#edeef1] h-10 w-10 rounded-lg" />
          <div>
            <span class="shimmer !bg-[#edeef1] w-28 h-4 rounded-lg" />
            <div>
              <span class="shimmer !bg-[#edeef1] w-16 h-4 rounded-lg" />
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
