<template>
  <div
    class="bg-white p-5 rounded-20 w-[500px] shrink-0 border hover:border-primary duration-300 block"
  >
    <div class="flex flex-col gap-5">
      <div class="grid grid-cols-2 sm:gap-8 gap-4">
        <div v-for="key in 2" :key="key" class="flex gap-4 items-center">
          <div>
            <span class="h-5 w-[5rem] rounded-sm shimmer" />
            <h6 class="text-base font-bold leading-[125%] text-primary mt-1.5">
              <span class="h-4 w-[7rem] rounded-sm shimmer" />
            </h6>
          </div>
        </div>
      </div>
      <div class="grid gap-2">
        <span class="h-10 w-full rounded-lg shimmer" />
        <span class="h-10 w-full rounded-lg shimmer" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
</script>
