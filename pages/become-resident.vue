<template>
  <div>
    <div class="">
      <div class="container">
        <div class="relative overflow-hidden z-10 pt-10">
          <BaseBreadcrumb :breadcrumb="menu" />
          <div
            class="flex md:items-center justify-center flex-col pt-6 pb-10 md:pt-3 md:pb-16"
          >
            <h3
              class="text-brand-black text-2xl md:text-4xl leading-130 font-extrabold"
            >
              {{ $t('become_resident') }}
            </h3>
            <p
              class="text-gray-700 text-sm font-normal leading-130 mt-3 mb-6 md:mb-8"
            >
              {{ $t('contact.contact_us_title') }}
            </p>
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
          <BaseTabFull
            v-model="activeTab"
            :list="tabList"
            class="mb-6"
            wrapper-class="!p-0.5 !rounded-xl"
            active-class="!rounded-10"
            active-items-class="!rounded-10 !text-brand-black"
          />

          <form
            class="grid grid-cols-2 gap-6 w-full lg:w-[782px]"
            @submit.prevent
          >
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.nno')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.nno"
                is-transparent
                :error="form.$v.value.nno?.$error"
                :placeholder="$t('resident_form.placeholder.nno')"
                input-class="pl-3 py-2.5 !bg-gray"
                class=""
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.reg_date')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.reg_date"
                is-transparent
                :error="form.$v.value.reg_date?.$error"
                :placeholder="$t('resident_form.placeholder.reg_date')"
                input-class="pl-3 py-2.5 !bg-gray"
                type="date"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.number')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.number"
                is-transparent
                :error="form.$v.value.number?.$error"
                :placeholder="$t('resident_form.placeholder.number')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.destination')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.destination"
                is-transparent
                :error="form.$v.value.destination?.$error"
                :placeholder="$t('resident_form.placeholder.destination')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.address')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.address"
                is-transparent
                :error="form.$v.value.address?.$error"
                :placeholder="$t('resident_form.placeholder.address')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.fullname')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.fullname"
                is-transparent
                :error="form.$v.value.fullname?.$error"
                :placeholder="$t('resident_form.placeholder.fullname')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              :label="$t('resident_form.label.phone')"
              label-class="text-brand-black text-sm font-semibold leading-140 mb-1"
              main-class="col-span-2 md:col-span-1"
            >
              <ClientOnly>
                <FormInput
                  v-model="form.values.phone"
                  v-maska="'## ###-##-##'"
                  is-transparent
                  :error="form.$v.value.phone?.$error"
                  :placeholder="$t('00 000-00-00')"
                  input-class="pl-1 py-2.5 !bg-gray !rounded-none !rounded-r-10"
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
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.org_form')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.org_form"
                is-transparent
                :error="form.$v.value.org_form?.$error"
                :placeholder="$t('resident_form.placeholder.org_form')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.region')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.region"
                is-transparent
                :error="form.$v.value.region?.$error"
                :placeholder="$t('resident_form.placeholder.region')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-1"
              :label="$t('resident_form.label.branch_count')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.branch_count"
                is-transparent
                :error="form.$v.value.branch_count?.$error"
                :placeholder="$t('resident_form.placeholder.branch_count')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-1"
              :label="$t('resident_form.label.worker_count')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.worker_count"
                is-transparent
                :error="form.$v.value.worker_count?.$error"
                :placeholder="$t('resident_form.placeholder.worker_count')"
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.last_year_projects')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.last_year_projects"
                is-transparent
                :error="form.$v.value.last_year_projects?.$error"
                :placeholder="
                  $t('resident_form.placeholder.last_year_projects')
                "
                input-class="pl-3 py-2.5 !bg-gray"
              />
            </FormGroup>
            <FormGroup
              main-class="flex flex-col gap-1 col-span-2"
              :label="$t('resident_form.label.last_year_projects')"
              label-class="text-brand-black !text-sm !font-semibold !leading-tight !mb-px"
            >
              <FormInput
                v-model="form.values.actual_sum"
                is-transparent
                :error="form.$v.value.actual_sum?.$error"
                :placeholder="$t('resident_form.placeholder.actual_sum')"
                input-class="pl-3 py-2.5 !bg-gray"
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

const captchaToken = ref()
const trigger = ref(false)
const { t } = useI18n()
const key = computed(() => import.meta.env.VITE_RECAPTCHA_KEY)

const menu = computed(() => {
  return [
    {
      title: t('become_resident'),
      link: '/become-resident',
    },
  ]
})

const tabList = ref([
  { label: t('provider'), value: 1 },
  { label: t('nno'), value: 2 },
])

const activeTab = ref(2)

const form = useForm(
  {
    nno: '',
    reg_date: '',
    number: '',
    destination: '',
    address: '',
    fullname: '',
    phone: '',
    email: '',
    org_form: '',
    region: '',
    branch_count: '',
    worker_count: '',
    last_year_projects: '',
    actual_sum: '',
  },
  {
    nno: { required },
    reg_date: { required },
    number: { required },
    destination: { required },
    address: { required },
    fullname: { required },
    phone: { required },
    email: { required, email },
    org_form: { required },
    region: { required },
    branch_count: { required },
    worker_count: { required },
    last_year_projects: { required },
    actual_sum: { required },
  }
)

const sendMail = () => {
  form.$v.value.$touch()
  if (form.$v.value.$invalid) {
  }
}

function verifyMethod(response: any) {
  captchaToken.value = response
}
function expiredMethod() {
  captchaToken.value = null
}
</script>
