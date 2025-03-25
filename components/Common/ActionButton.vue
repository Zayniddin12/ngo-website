<script setup lang="ts">
defineProps<{
  text: string
  icon: string
  textClass?: string
}>()

const emit = defineEmits<{
  (e: 'action'): void
}>()

const isHover = ref(false)
</script>

<template>
  <div
    class="flex items-center rounded-lg w-max cursor-pointer overflow-hidden border border-gray-500 duration-200 bg-gray gap-3"
    :class="{ '!border-red': isHover }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    @click="emit('action')"
  >
    <p
      v-if="text"
      :class="textClass"
      class="font-semibold text-sm truncate w-full leading-130"
    >
      {{ text }}
    </p>
    <div
      class="p-2.5 bg-gray-500 cursor-pointer duration-200"
      :class="{ '!border-red': isHover }"
      @click="emit('action')"
    >
      <slot name="suffix" class="text-xl flex-center text-gray-700" />
    </div>
  </div>
</template>

<style scoped></style>
