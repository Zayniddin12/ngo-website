<template>
  <div class="md:py-16 py-8 container">
    <div
      class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 flex-wrap mb-6"
      :class="{ 'lg:!grid-cols-3': isResidents }"
    >
      <div
        v-for="key in 9"
        :key
        class="p-6 text-center bg-white rounded-2xl max-sm:flex items-center gap-3"
        :class="{ '!flex-col': isResidents }"
      >
        <div
          class="rounded-full shimmer bg-white w-[120px] h-[120px] object-cover object-center mb-6 mx-auto max-[500px]:w-20 max-[500px]:h-20"
        />
        <div class="w-full" :class="{ 'flex flex-col-reverse': isResidents }">
          <h3 class="w-[80%] mx-auto h-2 rounded shimmer" />
          <div>
            <p class="w-[90%] mx-auto h-4 rounded shimmer" />
          </div>
        </div>
        <div v-if="isResidents" class="mt-5 w-full">
          <div class="flex gap-3 border-t pt-5 mx-auto justify-center w-[80%]">
            <a
              v-for="key in 3"
              class="flex gap-4 p-2 bg-gray-500 rounded-[40px]"
            >
              <component :is="`i-${link?.icon}`" class="text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <BaseButton :text="$t('show_more')" variant="green" class="w-full" />
  </div>
</template>
<script setup lang="ts">
interface Props {
  isResidents?: boolean
}
defineProps<Props>()
</script>
