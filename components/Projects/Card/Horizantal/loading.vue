<template>
  <div
    class="w-full flex-y-center max-[880px]:flex-col rounded-2xl border border-gray-500 bg-white"
  >
    <div
      class="!h-[185px] w-44 shimmer !bg-[#edeef1] min-[880px]:rounded-l-2xl max-[880px]:rounded-t-2xl max-[880px]:w-full shrink-0"
    />
    <div class="p-4 space-y-8 w-full">
      <div class="w-full">
        <p class="shimmer h-5 w-[80%] rounded-lg" />

        <p class="shimmer h-3.5 w-full rounded-lg" />
        <p class="shimmer h-3.5 w-[90%] rounded-lg" />
      </div>
      <div class="flex-y-center max-sm:flex-col gap-2">
        <div v-for="key in 3" key class="w-full h-[46px] rounded-lg shimmer" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
