<template>
  <div class="relative bg-white/5 rounded-[20px] p-4 md:p-5">
    <p
      class="self-stretch text-white text-xl font-bold leading-130 md:w-[439px]"
    >
      {{ $t('follow_news') }}
    </p>
    <p
      class="self-stretch text-white/40 text-sm font-normal leading-tight mt-3"
    >
      {{ $t('send_news_daily') }}
    </p>
    <form
      class="md:flex gap-6 items-end space-y-5 md:space-y-0"
      @submit.prevent="sendMail"
    >
      <FormGroup
        :label="$t('email')"
        label-class="mb-3 mt-5 md:mt-6 w-full !text-sm !font-bold !leading-none"
      >
        <FormInput
          v-model="form.values.email"
          :error="form.$v.value.email?.$error"
          :placeholder="$t('enter_email')"
          input-class="pl-4 py-3"
          class="bg-white/5 border-white/5 h-11"
        />
      </FormGroup>

      <BaseButton
        :loading="buttonLoading"
        class="w-full md:w-max !text-sm !font-bold !leading-none py-3.5"
        variant="white"
        type="submit"
        :text="$t('send')"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { email, required } from '@vuelidate/validators'

const { t } = useI18n()
const { showToast } = useCustomToast()
const buttonLoading = ref(false)
const form = useForm(
  {
    email: '',
  },
  {
    email: { required, email },
  }
)
const sendMail = async () => {
  form.$v.value.$touch()
  if (form.$v.value.$error) {
    showToast(t('email_error'), 'error')
    return
  }
  if (!form.$v.value.$invalid) {
    buttonLoading.value = true
    try {
      await useApi().$post('send_request', {
        params: {
          model: 'subscribe.news',
          fields: 'email',
        },
        body: {
          values: {
            email: form.values.email,
          },
        },
        headers: {
          'Content-Type': 'application/json',
        },
      })
      showToast(t('successfully_send'), 'success')
      form.$v.value.$reset()
      form.values.email = ''
    } catch (e) {
      showToast(t('email_error'), 'error')
    } finally {
      buttonLoading.value = false
    }
  }
}
</script>
