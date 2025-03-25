<template>
  <div
    id="form-to-send-question"
    class="bg-brand-black h-auto text-white overflow-hidden relative z-10"
  >
    <div
      class="absolute left-0 -bottom-20 z-50 w-full h-[248px]"
      style="
        background: linear-gradient(
          180deg,
          rgba(21, 33, 20, 0) 0%,
          #152114 105.36%
        );
      "
    />
    <div class="bg-brand-black text-white overflow-hidden relative">
      <div class="container mx-auto py-10 md:py-16 relative z-10">
        <CommonSectionHeaderTitle
          :title="$t('send_question_form.title')"
          :subtitle="$t('send_question_form.subtitle')"
          title-class="max-sm:text-2xl"
        />
        <div class="flex-x-center my-8">
          <CommonImage
            src="/svg/question_form_pattern_1.svg"
            class="md:hidden w-52"
          />
        </div>
        <section
          class="p-4 md:p-6 w-full lg:w-[580px] min-h-80 bg-white/10 rounded-2xl md:my-7 mt-7 z-10"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <FormGroup :label="$t('send_question_form.name_input.label')">
              <FormInput
                v-model="form.values.name"
                is-transparent
                :error="form.$v.value.name?.$error"
                :placeholder="$t('send_question_form.name_input.placeholder')"
                input-class="text-sm !font-normal !leading-tight !bg-white/10 border border-white/10"
              />
            </FormGroup>
            <FormGroup :label="$t('send_question_form.phone_input.label')">
              <ClientOnly>
                <FormInput
                  v-model="form.values.phone"
                  v-maska="'## ###-##-##'"
                  :error="form.$v.value.phone?.$error"
                  placeholder="00 000-00-00"
                  is-transparent
                  class="!bg-white/10 border border-white/10"
                  input-class="pl-[10px] text-sm !font-normal !leading-tight"
                >
                  <template #prefix>
                    <p class="ml-3 flex-center !text-sm !font-normal">+998</p>
                  </template>
                </FormInput>
              </ClientOnly>
            </FormGroup>
          </div>
          <FormGroup
            :label="$t('send_question_form.question_input.label')"
            class="mt-6 mb-6 md:mb-10"
          >
            <FormTextarea
              v-model="form.values.question"
              :error="form.$v.value.question?.$error"
              :placeholder="$t('send_question_form.question_input.placeholder')"
              is-transparent
              input-class="min-h-20 border border-white/10 !bg-white/10"
            />
          </FormGroup>
          <div
            class="flex-y-center flex-col md:flex-row flex-col-reverse justify-between"
          >
            <i18n-t
              scope="global"
              keypath="send_question_form.privacy.text"
              tag="p"
              class="text-white text-sm font-normal text-center md:text-start leading-130"
            >
              <template #link>
                <nuxt-link to="/public-offering">
                  <br /><span
                    class="text-sm font-semibold text-primary hover:text-primary-600 transition-300"
                  >
                    {{ $t('send_question_form.privacy.link_text') }}
                  </span>
                </nuxt-link>
              </template>
            </i18n-t>
            <BaseButton
              variant="success"
              class="min-w-44 w-full mb-6 md:mb-0 md:w-auto"
              :text="$t('send_question_form.send')"
              @click="sendQuestion"
            />
          </div>

          <div
            v-if="socialData"
            class="mt-5 md:mt-16 flex-y-center gap-6 justify-between"
          >
            <img
              class="hidden md:block"
              alt="image"
              src="/svg/divider-about.svg"
            />
            <LayoutFooterAboutSocials class="mx-auto" :socials="social" />
            <img
              class="hidden md:block"
              alt="image"
              src="/svg/divider-about.svg"
            />
          </div>
        </section>
        <NuxtImg
          alt="image"
          src="/svg/question_form_pattern.svg"
          class="absolute right-0 hidden lg:block w-[424px] bottom-4"
        />
      </div>
      <NuxtImg
        alt="image"
        src="/svg/wig.svg"
        class="absolute md:top-0 w-[700px] bottom-10 -right-20 md:right-0 md:2xl:right-10"
      />
      <div
        class="w-[260px] h-[260px] bg-primary rounded-full -left-52 blur-[600px] top-1/2 -translate-y-1/2 absolute hidden md:block"
      />
      <div
        class="w-[270px] h-[216px] bg-primary rounded-full blur-[600px] left-1/2 -translate-x-1/2 -top-52 absolute hidden md:block"
      />
      <div
        class="w-[212px] h-[170px] bg-primary rounded-full blur-[600px] -right-10 -bottom-20 absolute hidden md:block"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { required } from '@vuelidate/validators'

import { useHomeStore } from '~/store/home'

const homeStore = useHomeStore()
homeStore.fetchSocials()

const social = computed(() => homeStore.socials)

const { showToast } = useCustomToast()
const buttonLoading = ref(false)
const { t } = useI18n()
const form = useForm(
  {
    name: '',
    phone: '',
    question: '',
  },
  {
    name: { required },
    phone: { required },
    question: { required },
  }
)

interface Props {
  socialData?: boolean
}

defineProps<Props>()

const sendQuestion = () => {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    try {
      useApi()
        .$post('send_request', {
          params: {
            model: 'contact.agency',
            fields: 'name,phone,description',
          },
          body: {
            fields: ['name', 'phone', 'description'],
            values: {
              name: form.values.name,
              phone: form.values.phone,
              description: form.values.question,
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
          form.values.phone = ''
          form.values.question = ''
        })
    } catch (e) {
      showToast(t('email_error'), 'error')
    } finally {
      buttonLoading.value = false
    }
  } else {
    return showToast(t('validation.form_empty'), 'error')
  }
}
</script>
