<template>
  <main class="bg-primary py-10 md:py-6">
    <div class="container md:flex justify-between items-center">
      <div class="mb-6 md:mb-0">
        <h3 class="text-white text-2xl font-extrabold leading-130">
          {{ $t('contact_us') }}
        </h3>
        <p
          class="text-white/60 text-base font-medium leading-tight mt-1 md:mt-2"
        >
          {{ $t('contact_us_main') }}
        </p>
      </div>
      <div class="md:flex gap-4 lg:gap-6 space-y-3 md:space-y-0">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="flex gap-2 md:gap-4"
        >
          <span
            class="p-2.5 bg-brand-black/10 rounded-[50px] border border-white/25 w-max block"
          >
            <component :is="`i-${item.icon}`" class="text-[28px] text-white" />
          </span>
          <div>
            <p class="text-white/60 text-sm font-normal leading-130">
              {{ item.title }}
            </p>
            <a
              :href="item?.link"
              class="text-white text-base font-semibold leading-tight mt-1"
            >
              {{ item.content }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
const { t } = useI18n()
const items = ref([
  {
    title: t('support_phone'),
    icon: 'phone',
  },
  {
    title: t('email'),
    content: 'info@uic.group',
    icon: 'mail',
    link: 'mailto:info@uic.group',
  },
])
</script>
