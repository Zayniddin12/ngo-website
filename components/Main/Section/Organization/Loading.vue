<template>
  <div
    v-for="index in 4"
    :key="index"
    class="bg-white w-full h-20 mb-4 rounded-2xl border border-gray-500 flex justify-between items-center p-2"
  >
    <div class="flex-center gap-2.5">
      <span class="h-16 w-16 !bg-[#edeef1] rounded-full" />
      <span class="h-4 w-44 shimmer rounded-xl" />
    </div>
    <div class="h-4 w-44 shimmer rounded-xl" />
    <div class="h-4 w-48 shimmer rounded-xl" />
    <div class="w-32 h-9 rounded-lg shimmer" />
  </div>
</template>
<script setup lang="ts"></script>
