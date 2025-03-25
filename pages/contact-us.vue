<template>
  <div>
    <div class="contact-us">
      <div class="container">
        <div class="relative overflow-hidden z-10 pt-10">
          <BaseBreadcrumb :breadcrumb="menu" />
          <div
            class="flex md:items-center justify-center flex-col pt-6 pb-10 md:pt-3 md:pb-16"
          >
            <h3
              class="text-brand-black text-2xl md:text-4xl leading-130 font-extrabold"
            >
              {{ $t('feedback') }}
            </h3>
            <p
              class="text-gray-700 text-sm font-normal leading-130 mt-3 mb-6 md:mb-8"
            >
              {{ $t('contact.contact_us_title') }}
            </p>
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full lg:w-[881px] gap-6"
            >
              <div class="p-5 rounded-20 bg-white inline-block">
                <span class="p-2.5 rounded-[50px] bg-gray inline-block">
                  <component :is="`i-phone`" class="text-28 text-primary" />
                </span>
                <p
                  class="mb-1 mt-5 text-gray-700 font-normal leading-130 text-sm"
                >
                  {{ $t('support_phone') }}
                </p>
                <p
                  v-if="loading"
                  class="shimmer rounded-xl !bg-gray-500 w-[75%] h-5"
                ></p>
                <a
                  v-else
                  :href="`tel:${contactInfoData[0]?.phone}`"
                  class="text-brand-black font-semibold text-base leading-130 transition-300 cursor-pointer hover:text-primary"
                >
                  {{ formatPhoneNumber(contactInfoData[0]?.phone) }}
                </a>
              </div>
              <div class="p-5 rounded-20 bg-white inline-block">
                <span class="p-2.5 rounded-[50px] bg-gray inline-block">
                  <component :is="`i-mail`" class="text-28 text-primary" />
                </span>
                <p
                  class="mt-5 mb-1 text-gray-700 font-normal leading-130 text-sm"
                >
                  {{ $t('email') }}
                </p>
                <p
                  v-if="loading"
                  class="shimmer rounded-xl !bg-gray-500 w-[75%] h-5"
                ></p>
                <a
                  v-else
                  :href="`mailto:${contactInfoData[0]?.email}`"
                  class="text-brand-black font-semibold text-base leading-130 transition-300 cursor-pointer hover:text-primary"
                >
                  {{ contactInfoData[0]?.email }}
                </a>
              </div>
              <div class="p-5 rounded-20 bg-white inline-block">
                <span class="p-2.5 rounded-[50px] bg-gray inline-block">
                  <component :is="`i-map-pin`" class="text-28 text-primary" />
                </span>
                <p
                  class="mt-5 mb-1 text-gray-700 font-normal leading-130 text-sm"
                >
                  {{ $t('event.info.address') }}
                </p>
                <p
                  v-if="loading"
                  class="shimmer rounded-xl !bg-gray-500 w-[75%] h-5"
                ></p>
                <p
                  v-else
                  class="text-brand-black font-semibold text-base leading-130"
                >
                  {{ contactInfoData[0]?.address }}
                </p>
              </div>
            </div>
          </div>
          <NuxtImg
            class="absolute -top-24 -z-1 w-full h-auto hidden md:block"
            src="/svg/overlay.svg"
            alt="image"
          />
        </div>
      </div>
    </div>
    <div class="bg-white">
      <div class="container">
        <div
          class="flex md:items-center md:justify-center flex-col py-10 md:py-16"
        >
          <h3
            class="text-brand-black text-2xl md:text-4xl leading-130 font-extrabold"
          >
            {{ $t('contact.contact_us') }}
          </h3>
          <p
            class="text-gray-700 text-sm font-normal leading-130 mt-3 mb-6 md:mb-8"
          >
            {{ $t('contact.contact_us_text') }}
          </p>

          <form
            class="grid grid-cols-2 gap-6 w-full lg:w-[782px]"
            @submit.prevent
          >
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('contact.your_name')"
              label-class="text-brand-black text-sm font-semibold leading-140 mb-1"
            >
              <FormInput
                v-model="form.values.name"
                is-transparent
                :error="form.$v.value.name?.$error"
                :placeholder="$t('contact.enter_your_name')"
                input-class="pl-3 py-2.5 !bg-gray"
                class=""
              />
            </FormGroup>
            <FormGroup
              :label="$t('contact.phone_number')"
              label-class="text-brand-black text-sm font-semibold leading-140 mb-1"
              main-class="col-span-2 md:col-span-1"
            >
              <ClientOnly>
                <FormInput
                  v-model="form.values.number"
                  v-maska="'## ###-##-##'"
                  is-transparent
                  :error="form.$v.value.number?.$error"
                  :placeholder="$t('00 000-00-00')"
                  input-class="pl-1 py-2.5 !bg-gray !rounded-none !rounded-r-10"
                  class=""
                >
                  <template #prefix>
                    <span
                      class="text-brand-black text-sm font-semibold leading-140 pl-3 !bg-gray py-2.5 rounded-l-10"
                    >
                      +998
                    </span>
                  </template>
                </FormInput>
              </ClientOnly>
            </FormGroup>
            <FormGroup
              :label="$t('contact.email')"
              label-class="text-brand-black text-sm font-semibold leading-140 mb-1"
              main-class="col-span-2 md:col-span-1"
            >
              <FormInput
                v-model="form.values.email"
                is-transparent
                :error="form.$v.value.email?.$error"
                :placeholder="$t('contact.enter_email')"
                input-class="pl-3 py-2.5 !bg-gray"
                class=""
              />
            </FormGroup>

            <FormGroup
              :label="$t('contact.your_message')"
              main-class="flex flex-col gap-1 col-span-2 "
              label-class="text-brand-black text-sm font-semibold leading-140 mb-1"
            >
              <FormTextarea
                v-model="form.values.message"
                is-transparent
                :error="form.$v.value.message?.$error"
                :placeholder="$t('contact.enter_your_message')"
                input-class="pl-3 py-2.5 !h-[140px] !bg-gray font-medium leading-140 !text-dark"
                class="text-brand-black"
              />
            </FormGroup>

            <div class="col-span-2 md:col-span-1">
              <vue-recaptcha
                :key="trigger"
                size="large"
                :sitekey="key"
                @verify="verifyMethod"
                @expired="expiredMethod"
              />
            </div>
            <div class="flex-y-center justify-end col-span-2 md:col-span-1">
              <BaseButton
                class="w-full !text-sm md:w-[270px] !font-bold !leading-none !py-3 !px-6"
                variant="green"
                :text="$t('send')"
                :disabled="!captchaToken"
                @click="sendMail"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { email, required } from '@vuelidate/validators'
import vueRecaptcha from 'vue3-recaptcha2'

import { useContactStore } from '~/store/contact'

const captchaToken = ref()
const trigger = ref(false)
const { t } = useI18n()
const key = computed(() => import.meta.env.VITE_RECAPTCHA_KEY)

const menu = computed(() => {
  return [
    {
      title: t('feedback'),
      link: '/contact-us',
    },
  ]
})
const useContact = useContactStore()
const contactInfoData = computed(() => useContact.contacts)
const loading = computed(() => useContact.loading)

useContact.fetchContacts()
const { showToast } = useCustomToast()
const buttonLoading = ref(false)
const form = useForm(
  {
    name: '',
    number: '',
    email: '',
    message: '',
  },
  {
    email: { required, email },
    name: { required },
    number: { required },
    message: { required },
  }
)

const sendMail = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    try {
      useApi()
        .$post('send_request', {
          params: {
            model: 'contact.us',
          },
          body: {
            fields: ['name', 'phone', 'description', 'email'],
            values: {
              name: form.values.name,
              phone: form.values.number,
              description: form.values.message,
              email: form.values.email,
            },
          },
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(() => {
          showToast(t('successfully_send'), 'success')
          form.$v.value.$reset()
          form.values.name = ''
          form.values.number = ''
          form.values.message = ''
          form.values.email = ''
          trigger.value = true
        })
    } catch (e) {
      showToast(t('email_error'), 'error')
    } finally {
      buttonLoading.value = false
    }
  } else {
    return showToast(t('form_empty'), 'error')
  }
}

function verifyMethod(response: any) {
  captchaToken.value = response
}
function expiredMethod() {
  captchaToken.value = null
}
</script>
<style scoped>
.contact-us {
  margin-top: -30px !important;
}
</style>
