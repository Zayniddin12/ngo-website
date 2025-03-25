<template>
  <div class="container py-6">
    <CommonSectionHeaderTitle
      :title="$t('our_residents_title')"
      :subtitle="$t('our_residents_subtitle')"
      title-class="!text-brand-black leading-tight max-md:text-3xl"
      subtitle-class="text-base"
    />
    <div class="title flex gap-4 items-center py-6">
      <div class="container flex gap-4 flex-nowrap">
        >
        <div v-for="index in 3" :key="index" class="z-30 h-[260px] w-[378px]">
          <div
            class="p-6 shimmer w-full h-full border border-shimmer rounded-20"
          >
            <span class="shimmer !bg-[#edeef1] w-12 h-12 mb-4" />
            <span class="shimmer !bg-[#edeef1] w-full h-3.5 rounded-sm" />
            <span
              class="shimmer !bg-[#edeef1] w-full h-3.5 rounded-md my-0.5"
            />
            <span class="shimmer !bg-[#edeef1] w-full h-3.5 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
