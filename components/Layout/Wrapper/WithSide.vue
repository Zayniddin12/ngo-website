<template>
  <div class="container mx-auto">
    <div v-if="menu" class="">
      <BaseBreadcrumb :breadcrumb="menu" />
    </div>
    <div class="mb-4">
      <div class="flex-y-center justify-between lg:mb-6 display-none">
        <slot name="title" />
      </div>
      <div
        class="flex flex-col min-[940px]:flex-row gap-5 lg:gap-6"
        :class="{ '!flex-col-reverse': makeReverse }"
      >
        <div
          v-if="hasLeft"
          :class="[leftSideStyle, { 'hidden md:block': hideResponsive }]"
          class="basis-[100%] md:basis-1/4"
        >
          <slot name="left" />
        </div>
        <div :class="mainStyle" class="basis-[100%] md:basis-3/4">
          <slot />
        </div>
        <div
          v-if="hasRight"
          :class="[rightSideStyle, { 'hidden md:block': hideResponsive }]"
          class="basis-[100%] md:basis-1/4"
        >
          <slot name="right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBreadcrumb } from '~/types'

interface Props {
  menu?: IBreadcrumb[]
  hasRight?: boolean
  hasLeft?: boolean
  hideResponsive?: boolean
  makeReverse?: boolean
  leftSideStyle?: string
  rightSideStyle?: string
  mainStyle?: string
}

defineProps<Props>()
</script>

<style scoped></style>
