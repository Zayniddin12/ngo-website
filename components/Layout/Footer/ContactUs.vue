<template>
  <client-only>
    <main class="bg-primary py-10 md:py-6">
      <div class="container min-[810px]:flex justify-between items-center">
        <div class="mb-6 min-[810px]:mb-0">
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
          <div class="flex gap-2 md:gap-4 group transition-300">
            <span
              class="p-2.5 bg-brand-black/10 rounded-[50px] border shrink-0 border-white/25 w-max block transition-300 group-hover:opacity-75"
            >
              <component :is="'i-phone'" class="text-[28px] text-white" />
            </span>
            <div>
              <p
                class="text-white/60 text-sm font-normal leading-130 group-hover:text-white transition-300"
              >
                {{ $t('support_phone') }}
              </p>
              <a
                :href="`tel:${contanctInfoData[0]?.phone}`"
                class="text-white text-base font-semibold leading-tight mt-1 hover:text-white/80 duration-200"
              >
                {{ formatPhoneNumber(contanctInfoData[0]?.phone) }}
              </a>
            </div>
          </div>
          <div class="flex gap-2 md:gap-4 group transition-300">
            <span
              class="p-2.5 bg-brand-black/10 rounded-[50px] border shrink-0 border-white/25 w-max block transition-300 group-hover:opacity-75"
            >
              <component :is="`i-mail`" class="text-[28px] text-white" />
            </span>
            <div>
              <p
                class="text-white/60 text-sm font-normal leading-130 group-hover:text-white transition-300"
              >
                {{ $t('email') }}
              </p>
              <a
                :href="`mailto:${contanctInfoData[0]?.email}`"
                class="text-white text-base font-semibold leading-tight mt-1 hover:text-white/80 duration-200"
              >
                {{ contanctInfoData[0]?.email }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </client-only>
</template>
<script setup lang="ts">
import { useContactStore } from '~/store/contact'

const useContact = useContactStore()
useContact.fetchContacts()

const contanctInfoData = computed(() => useContact.contacts)
</script>
