<template>
  <NuxtLink
    class="rounded-full transition-300 hover:border-white/0 hover:bg-primary/20 border border-white/10 py-2 pl-2 pr-4"
    :to="link"
  >
    <div class="flex flex-row gap-2.5 items-center">
      <div class="rounded-full p-1 bg-primary/10">
        <slot name="icon" />
      </div>

      <h1 class="text-white text-sm font-medium leading-130">
        {{ text }}
      </h1>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  link?: string
  text?: string
}

defineProps<Props>()
</script>

<style scoped></style>
