<template>
  <div
    v-for="key in 4"
    :key="key"
    class="items-center justify-between inline-flex w-full"
  >
    <div class="flex gap-1 items-center w-full">
      <div class="w-12 h-10 rounded-lg shimmer" />
      <div
        class="flex-col justify-start items-start gap-[3px] inline-flex w-full"
      >
        <p class="w-full h-4 rounded shimmer"></p>
        <p class="w-full max-w-40 h-4 rounded shimmer"></p>
      </div>
    </div>
  </div>
</template>
