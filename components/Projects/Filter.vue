<template>
  <div class="bg-white p-4 rounded-20 space-y-4">
    <p
      class="text-xl font-extrabold text-brand-black leading-relaxed hidden md:block"
    >
      {{ $t('filter') }}
    </p>
    <div class="space-y-5">
      <form-input-range
        :updated-value="[form?.values?.price_from, form?.values?.price_to]"
        :is-clear="isClear"
        @min-value="form?.values?.price_from"
        @max-value="form?.values?.price_to"
        @update="upDateRange"
      />

      <FormGroup>
        <FormRangePick
          :start-value="form?.values?.from"
          :end-value="form?.values?.to"
          :is-clear="isClear"
          @update:model-value="upDateRangePick"
        />
      </FormGroup>
      <FormGroup
        :label="$t('category')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2"
      >
        <FormSelect
          v-model="form.values.category"
          :error="form?.$v?.value?.category?.$error"
          :placeholder="$t('select_category')"
          placeholder-class="text-sm font-medium leading-130 !text-gray-700"
          wrapper-styles="rounded-10 text-sm !font-normal !leading-tight !bg-gray border border-gray-500"
          selected-option-styles="!bg-gray"
          :options="categories"
        />
      </FormGroup>
      <FormGroup
        :label="$t('status.title')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2"
      >
        <FormSelect
          v-model="form.values.status"
          :error="form?.$v?.value?.status?.$error"
          :placeholder="$t('select_status')"
          placeholder-class="text-sm font-medium leading-130 !text-gray-700"
          wrapper-styles="rounded-10 text-sm !font-normal !leading-tight !bg-gray border border-gray-500"
          selected-option-styles="!bg-gray"
          :options="statuses"
        />
      </FormGroup>
      <FormGroup
        :label="$t('region')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2"
      >
        <FormSelect
          v-model="form.values.region"
          :error="form?.$v?.value?.region?.$error"
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
          :error="form?.$v?.value?.city?.$error"
          :placeholder="$t('select_city')"
          placeholder-class="text-sm font-medium leading-130 !text-gray-700"
          wrapper-styles="rounded-10 text-sm !font-normal !leading-tight !bg-gray border border-gray-500"
          selected-option-styles="!bg-gray"
          :options="districts"
          :disabled="!form?.values?.region"
        />
      </FormGroup>
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
import type { TForm } from '~/composables/useForm'
import { useHomeStore } from '~/store/home'
import { useProjectStore } from '~/store/projects'

interface Props {
  form?: TForm<number>
}

const props = defineProps<Props>()
const emit = defineEmits(['clear'])
const { t } = useI18n()
const { form } = unref(props)
const isClear = ref(false)
const statuses = [
  { id: '', name: 'all_statuses', status: true },
  { id: 'in_progress', name: 'in_progress', status: true },
  { id: 'started', name: 'started', status: true },
  { id: 'completed', name: 'completed', status: true },
]
function upDateRange(value: number[]) {
  isClear.value = false
  form.values.price_from = value[0]
  form.values.price_to = value[1]
}
function upDateRangePick(value: [number, number]) {
  isClear.value = false
  form.values.from = value[0]
  form.values.to = value[1]
}
const categories = computed(() => {
  const allCategoriesOption = {
    name: t('all_categories'),
    id: '',
  }
  return [allCategoriesOption, ...projectsStore.categories]
})
const projectsStore = useProjectStore()

projectsStore.fetchProjectCategory()

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
const homeStore = useHomeStore()
homeStore.fetchRegions()
homeStore.fetchDistricts(props?.form?.values?.region)
function clearForm() {
  isClear.value = true

  emit('clear')
}
watch(props, () => {
  if (props?.form?.values?.region) {
    homeStore?.fetchDistricts(props?.form?.values?.region)
  }
})
</script>
<style scoped></style>
