<template>
  <div class="bg-white pt-0 lg:pt-4 pb-4 px-4 rounded-20 space-y-4">
    <p
      class="text-xl font-extrabold text-brand-black leading-relaxed hidden lg:block"
    >
      {{ $t('filter') }}
    </p>
    <div class="space-y-5">
      <FormGroup
        :label="$t('region')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2"
      >
        <FormSelect
          v-model="form.values.region"
          :error="form.$v.value.region?.$error"
          :placeholder="$t('select_location')"
          placeholder-class="text-sm font-medium leading-130 !text-gray-700"
          wrapper-styles="rounded-10 text-sm !font-normal !leading-tight !bg-gray border border-gray-500"
          selected-option-styles="!bg-gray"
          :options="regions"
        />
      </FormGroup>
      <FormGroup
        :label="$t('resident_form.placeholder.reg_date')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2"
      >
        <FormDatePicker
          v-model="form.values.birthDate"
          :max-date="new Date()"
          input-class="h-10 !text-dark 1text-2xs !leading-130 !font-medium !bg-gray !border !border-gray-500 fomt-bold text-brand-black placeholder-brand-black :placeholder-brand-black"
          :placeholder="$t('resident_form.placeholder.place_of_birth')"
        />
      </FormGroup>
      <div class="w-full h-[1px] bg-gray-500" />
      <BaseButton
        variant="secondary"
        class="w-full !text-sm !font-bold !leading-none"
        :text="$t('reset_filter')"
        @click="clearForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useHomeStore } from '~/store/home'

interface Props {
  form?: TForm<any>
}

const { t } = useI18n()
const props = defineProps<Props>()
const emit = defineEmits(['clear'])
const { form } = unref(props)

function clearForm() {
  emit('clear')
}

const homeStore = useHomeStore()

const regions = computed(() => {
  const allRegionsOption = {
    name: t('all_regions'),
    id: '',
  }
  return [allRegionsOption, ...homeStore.regions]
})

watch(
  () => form.values.region,
  (newRegion) => {
    if (newRegion === 'all_regions') {
      homeStore.fetchRegions()
    }
  }
)

homeStore.fetchRegions()
</script>

<style scoped></style>
