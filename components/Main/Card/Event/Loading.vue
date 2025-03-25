<template>
  <div class="py-8 md:py-16">
    <div class="container mx-auto w-full flex items-end justify-between py-10">
      <CommonSectionHeaderTitle
        wrapper-class="w-full md:w-2/4"
        :title="$t('events.title')"
        title-class="text-black"
        :subtitle="$t('events.subtitle')"
      />

      <BaseButton
        class="hidden md:block !py-2 !px-6 !text-sm !font-bold !leading-none"
        variant="greenBorder"
        hover-classes="!px-6 !py-2"
        :text="$t('events.button')"
      >
        <template #suffix>
          <i-arrow-right class="!mb-0 text-2xl" />
        </template>
      </BaseButton>
    </div>
    <div class="container flex flex-nowrap gap-6">
      <div
        v-for="index in 1"
        :key="index"
        class="w-full h-[500px] rounded-20 relative bg-white pl-4"
      >
        <div>
          <div
            class="h-9 w-[40%] rounded-lg shimmer !bg-[#edeef1] mt-40 block mb-2"
          />
        </div>
        <div class="h-9 w-[40%] rounded-lg shimmer !bg-[#edeef1] mb-4" />
        <div>
          <span class="shimmer bg-[#edeef1] w-[60%] h-4 rounded-sm mb-2" />
        </div>
        <div><span class="shimmer !bg-[#edeef1] w-[60%] h-4 rounded-sm" /></div>
        <span class="w-[30%] h-8 shimmer !bg-[#edeef1] rounded-xl mt-6" />
        <div>
          <span class="h-5 w-[90%] rounded-sm shimmer !bg-[#edeef1] mt-6" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
