<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
    <CommonCardAttachedFile
      v-for="(item, idx) in items"
      :key="idx"
      :item="item"
    />
  </div>
</template>

<script setup lang="ts">
import type { IFileProject } from '~/types'

interface Props {
  items?: IFileProject[]
}
defineProps<Props>()
</script>
