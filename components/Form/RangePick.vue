<template>
  <div class="w-full">
    <div class="w-full">
      <FormGroup
        class="relative w-full"
        :label="$t('request_period')"
        label-class="text-sm font-medium leading-130 text-brand-black mb-2 "
      >
        <div class="relative">
          <VueDatePicker
            v-model="selectedDateRange"
            class="w-full"
            range
            model-type="dd.MM.yyyy"
            format="dd.MM.yyyy"
            :enable-time-picker="false"
            :clearable="false"
            :placeholder="$t('placeholders.date_range')"
            auto-apply
            v-bind="{ formatLocale }"
            @update:model-value="updateDateRange"
          >
            <template #input-icon></template>
          </VueDatePicker>
          <i-date-range class="absolute-y right-3 text-transparent" />
        </div>
      </FormGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import enUS from 'date-fns/locale/en-US/index.js'
import ru from 'date-fns/locale/ru/index.js'
import uz from 'date-fns/locale/uz/index.js'
import { useI18n } from 'vue-i18n'

interface Props {
  startValue: number
  endValue: number
  isClear: boolean
}

const props = defineProps<Props>()
const selectedDateRange = ref([props?.endValue, props?.startValue])
const emit = defineEmits<{
  (e: 'update:modelValue', value: [number, number]): void
}>()
function updateDateRange() {
  emit('update:modelValue', selectedDateRange.value)
}

const { locale } = useI18n()

const formatLocale = computed(() => {
  const locales = {
    uz,
    ru,
    en: enUS,
  }

  return locales[locale.value as keyof typeof locales]
})

watch(
  props,
  () => {
    if (props.isClear) {
      selectedDateRange.value = []
    }
  },
  { deep: true }
)
</script>

<style>
:root {
  --dp-input-icon-padding: 10px;
}
.dp__input {
  border-radius: 10px;
  background-color: #f5f7f5 !important;
  border: 1px solid #ececec;
  @apply: transition-300;
}
.dp__input:focus-within {
  border: #3a8033;
}
.dp__input:hover {
  border: 1px solid #ececec;
}
</style>
