<template>
  <div class="bg-white rounded-20 p-4 relative">
    <form class="flex-col gap-5" @submit.prevent>
      <FormRangePick
        :start-value="form.values.from"
        :end-value="form.values.to"
        class="mb-5"
        :is-clear="isClear"
        @update:model-value="upDateRangePick"
      />
      <FormGroup
        class="mb-5"
        label-class="mb-2  text-sm font-medium leading-tight text-brand-black"
        :label="$t('region')"
      >
        <FormSelect
          v-model="form.values.region"
          :error="form.$v.value.region?.$error"
          :placeholder="$t('select_region')"
          placeholder-class="text-sm font-medium leading-130 !text-gray-700"
          wrapper-styles="rounded-10 text-sm !font-normal !leading-tight !bg-gray border border-gray-500"
          selected-option-styles="!bg-gray"
          :options="regions"
        />
      </FormGroup>
      <FormGroup
        :label="$t('city')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2"
      >
        <FormSelect
          v-model="form.values.city"
          :error="form.$v.value.city?.$error"
          :placeholder="$t('select_city')"
          placeholder-class="text-sm font-medium leading-130 !text-gray-700"
          wrapper-styles="rounded-10 text-sm !font-normal !leading-tight !bg-gray border border-gray-500"
          selected-option-styles="!bg-gray"
          :options="districts"
          :disabled="!form.values.region"
        />
      </FormGroup>
      <BaseButton
        type="button"
        class="w-full mt-4"
        variant="secondary"
        :text="$t('reset_filter')"
        @click="clearFilter"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, unref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import { useHomeStore } from '~/store/home'

interface Props {
  form?: TForm<any>
}

const props = defineProps<Props>()
const isClear = ref(false)
const { t } = useI18n()
const { form } = unref(props)
const homeStore = useHomeStore()
function upDateRangePick(value: [number, number]) {
  isClear.value = false
  form.values.from = value[0]
  form.values.to = value[1]
}
const regions = computed(() => {
  const allRegionsOption = {
    name: t('all_regions'),
    id: '',
  }
  return [allRegionsOption, ...homeStore.regions]
})
const districts = computed(() => {
  const allDistrictsOption = {
    name: t('all_districts'),
    id: '',
  }
  return [allDistrictsOption, ...homeStore.districts]
})

homeStore.fetchDistricts(props.form?.values.region)
watch(props, () => {
  if (props.form?.values.region) {
    homeStore.fetchDistricts(props.form?.values.region)
  }
})
const emit = defineEmits(['clear'])
function clearFilter() {
  isClear.value = true
  emit('clear')
}

homeStore.fetchRegions()
</script>
