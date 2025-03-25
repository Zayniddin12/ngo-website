<template>
  <div
    class="h-fit w-full md:w-[376px] md:rounded-20 text-white rounded-xl bg-gradient-to-r from-blue-500 to-blue-700"
  >
    <div
      class="w-full h-full space-y-2 p-3 md:px-5 flex flex-col bg-[url('/svg/commeta.svg')] bg-no-repeat justify-center bg-custom-position"
    >
      <div class="flex items-start justify-between">
        <p class="text-sm font-bold leading-4">{{ $t('sharh_card.title') }}</p>
        <NuxtImg alt="image" src="/svg/sharh.svg" class="w-[95px] h-6" />
      </div>
      <p class="text-xs md:text-[9px] md:leading-3 font-normal leading-none">
        {{ $t('sharh_card.subtitle') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.bg-custom-position {
  background-position: 165px 25px;
}
</style>
