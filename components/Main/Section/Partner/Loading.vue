<script setup lang="ts"></script>

<template>
  <div class="min-[900px]:grid hidden lg:grid-cols-5 gap-6 mt-10 mb-6">
    <div
      v-for="index of 20"
      :key="index"
      class="shimmer max-lg:shrink-0 !bg-[#edeef1] h-[100px] w-[170px] cursor-pointer px-2 items-center rounded-2xl border border-transparent"
    />
  </div>
  <div
    class="max-[900px]:flex hidden gap-6 mt-6 mb-8 md:my-10 !w-screen overflow-hidden"
  >
    <div
      v-for="index of 4"
      :key="index"
      class="shimmer shrink-0 !bg-[#edeef1] h-[100px] w-[170px] cursor-pointer px-2 items-center rounded-2xl border border-transparent"
    ></div>
  </div>
  <div
    class="max-[900px]:flex hidden gap-6 mt-6 mb-8 md:my-10 !w-screen overflow-hidden"
  >
    <div
      v-for="index of 4"
      :key="index"
      class="shimmer shrink-0 !bg-[#edeef1] h-[100px] w-[170px] cursor-pointer px-2 items-center rounded-2xl border border-transparent"
    ></div>
  </div>
</template>

<style scoped></style>
