<template>
  <div class="c-date-picker relative">
    <VueDatePicker
      ref="datePicker"
      :disabled="disabled"
      :hide-navigation="[
        'month',
        'year',
        'calendar',
        'time',
        'minutes',
        'hours',
        'seconds',
      ]"
      :max-date="maxDate"
      :min-date="minDate"
      :model-value="pickerValue"
      :month-change-on-scroll="false"
      :readonly="disabled"
      :text-input-options="{
        enterSubmit: true,
        openMenu: false,
        format: 'dd.MM.yyyy',
      }"
      auto-apply
      format="dd.MM.yyyy"
      text-input
      v-bind="{ range, yearRange, formatLocale }"
      @update:model-value="onChangeValue"
    >
      <template #dp-input="{ value }">
        <FormInput
          :class="inputClass"
          :model-value="value"
          :placeholder="placeholder"
          input-wrapper-class="!py-[0px]"
          readonly
          class="!text-dark 1text-2xs !leading-130 !font-medium select_input"
          v-bind="{ error }"
        />
      </template>
    </VueDatePicker>
    <i-calendar class="text-xl absolute right-2 top-2.5 text-gray-700" />
  </div>
</template>

<script lang="ts" setup>
import '@vuepic/vue-datepicker/dist/main.css'

import VueDatePicker from '@vuepic/vue-datepicker'
import enUS from 'date-fns/locale/en-US/index.js'
import ru from 'date-fns/locale/ru/index.js'
import uz from 'date-fns/locale/uz/index.js'
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  modelValue?: string
  error?: boolean
  range?: boolean
  minDate?: string | Date
  maxDate?: string | Date
  disabled?: boolean
  customClass?: string
  inputClass?: string
  placeholder?: string
}

const props = defineProps<Props>()

interface Emits {
  (event: 'blur'): void

  (event: 'update:modelValue', value: string): void
}

const emit = defineEmits<Emits>()

const { locale } = useI18n()

const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
  },
})

const yearRange = [new Date().getFullYear() - 100, new Date().getFullYear() + 4]

const formatLocale = computed(() => {
  const locales = {
    uz,
    ru,
    en: enUS,
  }

  return locales[locale.value as keyof typeof locales]
})

const datePicker = ref()

const showMenu = ref(false)

const onChangeValue = (val: string) => {
  value.value = props.range
    ? `${dayjs(val[0]).format('YYYY-MM-DD')} - ${dayjs(val[1]).format(
        'DD.MM.YYYY'
      )}`
    : dayjs(val).format('YYYY-MM-DD')
  showMenu.value = false
}

const pickerValue = computed(() => {
  if (!props.modelValue) return undefined

  if (props.range) {
    const [start, end] = String(props.modelValue ?? '').split(' - ')
    const formattedStart = dayjs(start?.split('.').reverse().join('-')).format(
      'YYYY-MM-DD'
    )
    const formattedEnd = dayjs(end?.split('.').reverse().join('-')).format(
      'YYYY-MM-DD'
    )
    return [new Date(formattedStart), new Date(formattedEnd)]
  } else {
    const formattedDate = dayjs(
      props.modelValue?.split('.').reverse().join('-')
    ).format('YYYY-MM-DD')
    return new Date(formattedDate)
  }
})
</script>

<style>
.c-date-picker .dp__overlay_container {
  height: 288px !important;
}

.c-date-picker .dp__input {
  padding: 8px 12px !important;
}

.c-date-picker .dp__input_wrap svg {
  display: none !important;
}
.select_input::placeholder {
  color: green !important;
}
</style>
