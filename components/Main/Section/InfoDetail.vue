<template>
  <main class="info__detail relative overflow-hidden">
    <div class="container pt-12 md:pt-[153px] pb-10 md:pb-16">
      <div class="md:flex items-center justify-between">
        <div class="md:w-[580px]">
          <h2
            class="text-2xl lg:text-4xl text-white font-extrabold leading-130"
          >
            {{ $t('info_detail_title') }}
          </h2>
          <p
            class="text-sm md:text-base text-white/60 mt-3 leading-140 font-medium"
          >
            {{ $t('info_detail_text') }}
          </p>
        </div>
        <BaseButton
          v-if="false"
          class="w-full mt-6 md:mt-0 md:w-auto hover:!bg-primary relative z-10"
          variant="call"
          :text="$t('online_chat')"
          icon="i-instagram"
        >
          <template #suffix>
            <i-chat class="text-2xl text-white" />
          </template>
        </BaseButton>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6 relative z-10"
      >
        <div
          class="p-4 bg-white/10 rounded-[20px] border border-white/10 shadow-[0px_20px_40px_0px_rgba(19,22,18,0.10)] cursor-pointer hover:-translate-y-2 transition-300"
        >
          <div class="flex gap-3 items-center">
            <span
              class="p-2 bg-white/10 rounded-lg border border-white/10 inline-flex"
            >
              <i-map-pin class="text-2xl text-white" />
            </span>
            <div>
              <p class="text-white text-base font-bold">
                {{ contanctInfoData[0]?.address }}
              </p>
              <p class="text-white/60 text-xs font-medium">
                {{ $t('contact.our_address') }}
              </p>
            </div>
          </div>
        </div>
        <a
          v-if="contanctInfoData?.length > 0"
          :href="`tel:${contanctInfoData[0]?.phone}`"
          class="p-4 bg-white/10 rounded-[20px] border border-white/10 shadow-[0px_20px_40px_0px_rgba(19,22,18,0.10)] hover:-translate-y-2 transition-300"
        >
          <div class="flex gap-3 items-center">
            <span
              class="p-2 bg-white/10 rounded-lg border border-white/10 inline-flex"
            >
              <i-phone class="text-2xl text-white" />
            </span>
            <div>
              <span class="text-white text-base font-bold">
                {{ formatPhoneNumber(contanctInfoData[0]?.phone) }}
              </span>
              <p class="text-white/60 text-xs font-medium">
                {{ t('contact.phone_number') }}
              </p>
            </div>
          </div>
        </a>
        <a
          v-if="contanctInfoData?.length > 0"
          :href="`mailto: ${contanctInfoData[0]?.email}`"
          class="p-4 bg-white/10 rounded-[20px] border border-white/10 shadow-[0px_20px_40px_0px_rgba(19,22,18,0.10)] hover:-translate-y-2 transition-300"
        >
          <div class="flex gap-3 items-center">
            <span
              class="p-2 bg-white/10 rounded-lg border border-white/10 inline-flex"
            >
              <i-mail class="text-2xl text-white" />
            </span>
            <div>
              <span class="text-white text-base font-bold">
                {{ contanctInfoData[0]?.email }}
              </span>
              <p class="text-white/60 text-xs font-medium">
                {{ t('contact.email') }}
              </p>
            </div>
          </div>
        </a>
      </div>
    </div>
    <img
      class="absolute right-0 w-full h-full md:w-max md:h-max top-0"
      src="/images/info-detail.svg"
      alt="image"
    />
  </main>
</template>

<script setup lang="ts">
import { useContactStore } from '~/store/contact'

const { t } = useI18n()

const contanctInfoData = computed(() => useContact.contacts)
const useContact = useContactStore()

useContact.fetchContacts()
</script>

<style scoped>
.info__detail {
  background: linear-gradient(90deg, #62ad5a 0%, #3a8033 110.49%);
}
</style>
