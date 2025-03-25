<template>
  <section class="bg-brand-black-150 py-4">
    <div
      class="container sm:text-center mx-auto flex flex-col-reverse md:flex-row gap-6 md:gap-4 md:items-center justify-between"
    >
      <p
        class="text-white/40 text-xs font-normal leading-none text-left w-full md:max-w-[330px] whitespace-nowrap"
      >
        {{ t('company_about', { year: currentYear }) }}
      </p>

      <div class="flex md:hidden justify-between items-start w-full">
        <LayoutFooterSocials :socials="social" />
        <div class="gap-2 flex md:flex-col items-center">
          <span class="text-white/40 text-xs font-normal leading-none">
            {{ $t('developed_by') }}:
          </span>
          <a href="https://uic.group/" target="_blank">
            <img
              loading="lazy"
              alt="UIC Logo"
              class=""
              src="/svg/uic-logo.svg"
              title="UIC Logo"
            />
          </a>
        </div>
      </div>

      <LayoutFooterSocials
        class="hidden md:flex justify-center w-full"
        :socials="social"
      />

      <div
        class="hidden md:flex items-center justify-end gap-2 !mt-0 group w-full"
      >
        <span class="text-white/40 group-hover:text-white duration-300">
          {{ $t('developed_by') }}:
        </span>
        <a href="https://uic.group/" target="_blank" class="">
          <CommonUicLogo />
        </a>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

import { useHomeStore } from '~/store/home'

const homeStore = useHomeStore()
homeStore.fetchSocials()

const social = computed(() => homeStore.socials)

const { t } = useI18n()
const currentYear = dayjs().format('YYYY')
</script>

<style scoped>
p,
span {
  font-size: 14px;
  font-feature-settings: 'clig' off, 'liga' off;
  font-style: normal;
  line-height: 140%; /* 19.6px */
}

p {
  font-weight: 400;
}

span {
  font-weight: 500;
}
</style>
