<template>
  <NuxtLink
    class="w-full flex-y-center flex-col lg:flex-row rounded-2xl border border-gray-500 bg-white overflow-hidden"
  >
    <div
      class="shimmer w-full h-52 lg:w-56 rounded-t-2xl lg:!rounded-t-none lg:rounded-l-2xl"
    />
    <div class="p-4 space-y-8 w-full">
      <div class="space-y-4 w-full">
        <div class="space-y-2 w-full">
          <p class="shimmer w-full h-5 rounded" />
          <p class="shimmer w-[40%] h-2 rounded" />
        </div>
        <div class="flex-y-center flex-col items-start lg:flex-row lg:gap-2">
          <div v-for="i in 3" key class="shimmer w-full h-10 rounded-sm" />
        </div>
        <p class="shimmer w-full h-3 rounded" />
        <p class="shimmer w-[70%] h-3 rounded" />
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts"></script>
