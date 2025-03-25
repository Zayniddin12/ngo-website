<template>
  <footer class="footer">
    <LayoutFooterContactUs />
    <div class="pt-10 md:pt-[52px] bg-brand-black-150">
      <div class="container text-white">
        <div class="lg:flex justify-between gap-4">
          <div class="md:w-[278px] space-y-4 md:space-y-5">
            <NuxtLink to="/">
              <img
                v-if="$i18n.locale === 'ru'"
                :src="`/logos/logo.svg`"
                alt="Logo"
                class="max-[1150px]:w-[150px]"
              />
              <img
                v-else
                :src="`/logos/logo-${$i18n.locale}-light.svg`"
                alt="Logo"
                class="max-[1150px]:w-[150px]"
              />
            </NuxtLink>
            <p class="text-white/40 text-sm font-normal leading-140">
              {{ $t('company_about_main') }}
            </p>
          </div>
          <div class="md:flex gap-5 mt-8 lg:mt-0">
            <div class="w-[278px]">
              <h4
                class="text-white text-xl font-bold leading-relaxed mb-3 md:mb-6"
              >
                {{ $t('footer.menus.title') }}
              </h4>
              <div class="space-y-2 md:space-y-5 flex flex-col">
                <NuxtLink
                  v-for="(item, idx) in footerLinks"
                  :key="idx"
                  :to="item?.link"
                  class="text-white text-sm font-normal leading-130 cursor-pointer hover:underline duration-300 transition-300"
                >
                  {{ $t(item?.title) }}
                </NuxtLink>
              </div>
            </div>
            <LayoutFooterForm class="mt-8 md:mt-0" />
          </div>
        </div>
        <span class="h-px w-full block mt-6 md:mt-16 bg-white/10" />
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import { footerLinks } from '~/data'
</script>
