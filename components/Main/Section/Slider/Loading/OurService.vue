<template>
  <div class="container overflow-hidden">
    <div class="title flex gap-4 items-center !py-6">
      <div class="h-16 w-3 rounded-xl bg-primary shadow-green-card"></div>
      <CommonSectionHeaderTitle
        :title="$t('our_services_title')"
        :subtitle="$t('our_services_subtitle')"
        title-class="!text-brand-black max-md:text-3xl leading-tight"
        subtitle-class="text-base"
      />
    </div>
    <div class="flex gap-4 flex-nowrap">
      <div v-for="index in 3" :key="index" class="z-30 w-[302px] shrink-0">
        <div
          class="shimmer w-full h-[360px] border border-shimmer rounded-20 p-2"
        >
          <span class="shimmer !bg-[#edeef1] w-12 h-12 rounded-full mb-4" />
          <span class="shimmer !bg-[#edeef1] w-[90%] h-5 rounded-sm mb-2" />
          <span class="shimmer !bg-[#edeef1] w-[70%] h-5 rounded-sm mb-3" />
          <span class="shimmer !bg-[#edeef1] w-[70%] h-3.5 rounded-sm" />
          <div class="w-full flex justify-between items-center mt-[30%]">
            <span class="shimmer !bg-[#edeef1] w-[20%] h-3.5 rounded-md my-1" />
            <span class="shimmer !bg-[#edeef1] w-[10%] h-3.5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
