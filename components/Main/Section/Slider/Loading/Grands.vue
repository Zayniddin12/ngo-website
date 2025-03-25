<template>
  <div class="block w-full">
    <div class="lg:grid lg:grid-cols-2 gap-3 block">
      <div class="z-30 !w-full lg:h-[442px] relative block mt-6 mb-4">
        <span class="mb-3 shimmer w-full h-9 rounded-lg" />
        <span class="mb-3 shimmer w-1/2 h-9 rounded-lg" />

        <span class="shimmer h-4 w-[90%]" />
        <span class="shimmer h-4 w-[80%]" />
        <span class="shimmer h-4 w-[70%]" />

        <div
          class="w-[193px] h-[42px] shimmer rounded-xl absolute -bottom-10 max-lg:hidden"
        />
      </div>
      <div class="flex gap-3">
        <div
          v-for="index in 3"
          :key="index"
          class="z-30 !w-[278px] h-[356px] border border-shimmer rounded-20 p-2"
        >
          <div class="z-30 !w-[278px] h-[356px]">
            <span class="shimmer w-[90%] h-4 rounded-sm" />
            <span class="shimmer w-[90%] h-4 rounded-sm mb-3" />
            <span class="shimmer w-[70%] h-3 rounded-sm" />
            <span class="shimmer w-[70%] h-3 rounded-sm mb-5" />
            <span class="shimmer w-[60%] h-10 rounded-md mb-4" />
            <span class="shimmer w-[60%] h-10 rounded-md mb-4" />
            <span
              class="shimmer w-[90%] h-16 mx-auto rounded-t-xl -mb-[84px]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
