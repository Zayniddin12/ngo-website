<template>
  <div class="!w-full relative">
    <p class="mb-2 text-gray-700 text-sm font-medium leading-tight">
      {{ $t('sum') }}
    </p>
    <div class="flex justify-between gap-3 mb-2">
      <FormInput
        v-model="barMinValue"
        v-maska="moneyMask"
        input-class="py-2 w-full px-3 leading-none text-xs font-normal text-center text-brand-black rounded-lg border-2 border-gray-500 bg-gray"
      />
      <FormInput
        v-model="barMaxValue"
        v-maska="moneyMask"
        input-class="py-2 w-full px-3 leading-none text-xs font-normal text-center text-brand-black rounded-lg border-2 border-gray-500 bg-gray"
      />
    </div>
    <MultiRangeSlider
      v-if="!loading"
      :min="0"
      :max="1000000000"
      :step="1"
      :ruler="false"
      :label="false"
      :tooltip="false"
      :min-value="Number(barMinValue.toString().split(' ').join(''))"
      :max-value="Number(barMaxValue.toString().split(' ').join(''))"
      @input="updateValues"
    />
    <span v-else class="w-full h-1 relative shimmer !bg-[#edeef1] rounded-xl" />
  </div>
</template>
<script setup lang="ts">
import MultiRangeSlider from 'multi-range-slider-vue'

import { moneyMask } from '@/utils'

const props = withDefaults(
  defineProps<{
    updatedValue: [number, number]
    isMoney?: boolean
    moneyType?: string
    step?: number
    isClear?: boolean
  }>(),
  {
    step: 1,
    moneyType: '₽',
  }
)
const loading = ref(true)
onMounted(() => {
  if (MultiRangeSlider) {
    loading.value = false
  }
})

const emit = defineEmits<{
  (e: 'update', value: [number, number]): void
}>()
const barMinValue = ref(Number(props.updatedValue[0]) ?? 0)
const barMaxValue = ref(Number(props.updatedValue[1]) ?? 1000000000)
const updateValues = (e: {
  minValue: number | undefined
  maxValue: number | undefined
}) => {
  barMinValue.value = formatNumberSpace(e?.minValue)
  barMaxValue.value = formatNumberSpace(e?.maxValue)
  emit('update', [e?.minValue, e?.maxValue])
}
watch(props, () => {
  if (props.isClear) {
    barMinValue.value = 0
    barMaxValue.value = 1000000000
  }
})
</script>
<style>
.multi-range-slider {
  cursor: pointer;
  background: transparent;
  box-shadow: none !important;
  border: none;
  user-select: auto;
  border-radius: 0;
  padding: 0 !important;
  width: 100% !important;
  top: 10px;
}
.multi-range-slider .bar-inner {
  background: #62ad5a;
  cursor: pointer;
  border: none;
  box-shadow: none;
}
.multi-range-slider .thumb::before {
  content: url('/svg/range-dot.svg');
  box-shadow: none !important;
  border: none;
  margin: 0 !important;
  padding: 0 !important;
  border-radius: 0 !important;
  background: none !important;
  width: 20px !important;
  height: 20px !important;
  top: -9px !important;
  left: -10px;
}
.multi-range-slider .caption {
  display: none !important;
}
.multi-range-slider .bar-right,
.multi-range-slider .bar-left {
  box-shadow: none !important;
  border-radius: 4px;
}

.bar-right {
  height: 4px !important;
  padding: 0 !important;
}
.bar-left {
  height: 4px !important;
  padding: 0 !important;
}
</style>
