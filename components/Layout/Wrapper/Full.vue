<template>
  <div class="container mx-auto" :class="$attrs.class">
    <div v-if="menu?.length" :class="{ 'my-4': menu }">
      <BaseBreadcrumb :breadcrumb="menu" />
    </div>
    <div class="my-4">
      <div
        :class="mainClass"
        class="flex items-end justify-between max-md:block mb-6"
      >
        <slot name="title" />
        <slot name="headerContent" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBreadcrumb } from '~/types'

interface Props {
  menu?: IBreadcrumb[]
  mainClass?: string
}

defineProps<Props>()
</script>

<style scoped></style>
