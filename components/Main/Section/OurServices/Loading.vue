<template>
  <div class="md:pt-12 md:pb-16 py-6 text-center container">
    <div
      class="grid xl:grid-cols-4 md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 min-[900px]:gap-6 gap-4 mt-6 md:mt-10"
    >
      <div
        v-for="key in 12"
        :key
        class="min-[850px]:p-6 p-3 rounded-20 border border-gray-500 bg-white text-left"
      >
        <div class="w-16 h-16 shimmer rounded-full" />
        <h3 class="mt-7 mb-4 h-4 w-full shimmer rounded" />
        <p class="h-2 w-full shimmer rounded" />
        <p class="h-2 w-1/2 shimmer rounded" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
