<template>
  <div
    class="w-full flex flex-col md:flex-row items-center rounded-2xl bg-white p-5"
  >
    <div
      class="sm:w-[234px] w-full aspect-[234/234] shrink-0 rounded-xl shimmer h-full"
    />
    <div :class="{ 'ml-0': projects }" class="ml-4 w-full mt-2 grid gap-4">
      <p class="w-full h-6 shimmer rounded" />
      <p class="w-[40%] h-6 shimmer rounded" />
      <CommonHashtagLoading :iterate-number="3" />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <span
          v-for="item in 4"
          :key="item"
          class="shimmer !bg-[#edeef1] w-full h-[34px] rounded-lg mb-[10px]"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  projects?: boolean
}
defineProps<Props>()
</script>
