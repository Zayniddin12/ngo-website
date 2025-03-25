<template>
  <div class="container pt-16 pb-14">
    <div class="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-3">
      <div
        v-for="index in 8"
        :key="index"
        class="flex-col p-5 rounded-2xl border border-brand-black/10 justify-start items-start gap-3 inline-flex"
      >
        <div class="flex items-center gap-2 w-full">
          <div class="bg-[#edeef1] h-6 w-6 rounded-lg" />
          <span class="shimmer !bg-[#edeef1] h-4 w-full rounded" />
        </div>
        <div class="gap-3 flex items-center w-full">
          <span class="shimmer !bg-[#edeef1] h-9 w-[80%] rounded" />
          <span class="shimmer !bg-[#edeef1] rounded-md h-8 w-8" />
        </div>
      </div>
    </div>
    <BaseButton
      class="block mt-6 w-full md:hidden !py-2 !px-6 !text-sm !font-bold !leading-none"
      size="sm"
      variant="outline-primary"
      @click="navigateTo('/statistics')"
    >
      <div class="flex items-center gap-2">
        <div class="text-black">{{ $t('all_services') }}</div>
        <div><i-arrow-right class="text-2xl !m-0" /></div>
      </div>
    </BaseButton>
  </div>
</template>
<script setup lang="ts"></script>
