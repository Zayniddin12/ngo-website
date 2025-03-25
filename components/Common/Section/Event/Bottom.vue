<template>
  <div :class="wrapperClass">
    <p
      class="text-white/60 text-xs font-normal leading-none"
      :class="titleClass"
    >
      {{ title }}
    </p>
    <p class="text-white text-xl font-bold leading-7" :class="subtitleClass">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TClassName } from '~/types'

interface Props {
  wrapperClass?: TClassName
  titleClass?: TClassName
  subtitleClass?: TClassName
  title?: string
  subtitle?: string
}

defineProps<Props>()
</script>

<style scoped></style>
