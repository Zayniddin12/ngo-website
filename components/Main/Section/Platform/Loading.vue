<template>
  <div
    class="grid grid-cols-1 gap-3 md:gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <div
      v-for="index in 8"
      :key="index"
      class="bg-white rounded-20 border border-gray-500 w-full h-[258px] flex justify-center flex-col gap-4"
    >
      <div class="!bg-[#edeef1] shimmer w-20 h-20 rounded-full mx-auto mt-8" />
      <div class="w-[80%] h-5 shimmer mx-auto rounded-xl" />
      <div class="w-[60%] h-3 shimmer mx-auto rounded-lg" />
      <div class="flex justify-between gap-2">
        <div
          v-for="index in 2"
          :key="index"
          class="shimmer w-full rounded-xl h-9 mx-6"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
