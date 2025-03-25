<template>
  <section class="container mx-auto">
    <div
      :style="cardStyle"
      class="backdrop-blur-[30px] w-full rounded-[30px] relative flex"
    >
      <div
        class="border-2 border-white/5 w-full rounded-[30px] p-0 md:p-10 flex flex-col-reverse"
      >
        <div
          class="flex flex-col p-4 pt-0 md:gap-16 space-y-4 md:space-y-0 md:justify-between"
        >
          <div class="space-y-4">
            <h1
              class="text-white text-2xl md:text-[40px] font-extrabold md:font-bold leading-130"
            >
              {{ $t('need_help') }}
            </h1>
            <p
              class="text-white/60 max-w-[332px] text-base font-normal leading-snug"
            >
              {{ $t('need_help_text') }}
            </p>
          </div>

          <div
            class="justify-start flex-col min-[960px]:flex-row min-[960px]:items-center md:gap-7 gap-4 flex"
          >
            <div
              class="justify-start lg:border-r border-white/10 pr-7 items-center gap-4 flex"
            >
              <div
                class="w-12 h-12 p-2.5 bg-white/5 rounded-full shadow border border-white/10"
              >
                <i-phone class="text-28 text-white" />
              </div>
              <div class="flex-col justify-start">
                <div
                  class="self-stretch text-white/60 text-sm font-normal leading-130"
                >
                  {{ $t('call_us') }}
                </div>
                <a
                  v-if="contactInfo?.phone"
                  :href="`tel:${contactInfo?.phone}`"
                  class="text-white text-base font-semibold leading-tight"
                >
                  {{ formatPhoneNumber(contactInfo?.phone) }}
                </a>
              </div>
            </div>
            <a
              v-if="contactInfo?.phone"
              :href="'tel:' + contactInfo?.phone"
              class="max-md:w-full z-5 relative"
            >
              <BaseButton class="max-md:w-full" size="sm" variant="white">
                <div class="flex items-center gap-2">
                  <div class="text-black">{{ $t('contact_with_us') }}</div>
                  <div><i-arrow-right class="text-black text-2xl !m-0" /></div>
                </div>
              </BaseButton>
            </a>
          </div>
        </div>
        <div class="hidden md:block">
          <img
            class="absolute min-[1120px]:w-[400px] w-[300px] bottom-0 right-[90px]"
            src="/images/woman-with-headset.png"
            alt="woman"
          />
          <NuxtImg
            src="/svg/wings.svg"
            class="absolute bottom-0 -right-1 z-3 min-[1120px]:w-[620px] md:w-[500px]"
            alt="wings"
          />
        </div>
        <div class="md:hidden block relative -top-8 flex-center">
          <img
            class="w-[232px] mx-auto"
            src="/images/woman-with-headset.png"
            alt="woman"
          />
          <img
            src="/svg/wings.svg"
            class="absolute bottom-0 z-20 !w-[620px] h-full"
            alt="wings"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { useContactStore } from '~/store/contact'

interface Props {
  type?: 'red' | 'green'
  phone?: string
  loading: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'red',
  phone: '',
})

const useContact = useContactStore()
useContact.fetchContacts()

const contactInfo = computed(() => useContact.contacts[0])

const cardStyle = computed(() => {
  if (props.type === 'red') {
    return {
      boxShadow:
        '0 36px 176px 0 rgba(243, 38, 99, 0.05), 0 10.853px 82.204px 0 rgba(243, 38, 99, 0.03), 0 4.508px 37.42px 0 rgba(243, 38, 99, 0.03), 0 1.63px 12.784px 0 rgba(243, 38, 99, 0.02)',
      background: 'linear-gradient(103deg, #f32663 -151.37%, #1a040a 87.73%)',
    }
  } else {
    return {
      boxShadow:
        '0px 36px 176px 0px rgba(243, 38, 99, 0.05), 0px 10.853px 82.204px 0px rgba(243, 38, 99, 0.03), 0px 4.508px 37.42px 0px rgba(243, 38, 99, 0.03), 0px 1.63px 12.784px 0px rgba(243, 38, 99, 0.02)',
      background: 'linear-gradient(103deg, #62AD5A -151.37%, #040E03 87.73%)',
    }
  }
})
</script>
