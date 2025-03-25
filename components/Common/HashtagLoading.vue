<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="item in iterableNumber"
      :key="item"
      class="shimmer !bg-[#edeef1] w-[70px] h-[21px] mb-[10px] rounded-lg"
      :class="{ '!w-[164px]': item % 2 === 0 }"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  iterateNumber?: number
}
const props = defineProps<Props>()
const iterableNumber = ref(props.iterateNumber ?? 7)
</script>
