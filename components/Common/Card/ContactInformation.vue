<template>
  <!-- if we use div here it's causing problem in /residents/[slug]/contact -->
  <template v-for="(item, idx) in items" :key="idx">
    <div
      v-if="item?.title"
      class="items-center justify-between gap-2.5 inline-flex w-full"
      :class="mainClass"
    >
      <div class="flex gap-2.5 items-center">
        <div
          class="w-10 h-10 p-2 bg-[#62ad5a1f] rounded-lg justify-center items-center flex"
        >
          <component :is="`i-${item?.icon}`" class="text-2xl text-primary" />
        </div>
        <div
          :class="bodyClass"
          class="flex-col justify-start items-start gap-[3px] inline-flex"
        >
          <p
            v-if="item?.icon !== 'external-link'"
            :class="titleClass"
            class="self-stretch text-neutral-900 text-base font-bold leading-140"
          >
            {{ item?.title }}
          </p>
          <a
            v-else
            :href="item?.title"
            :class="titleClass"
            target="_blank"
            class="self-stretch text-neutral-900 text-base font-bold leading-140"
            >{{ item?.title }}</a
          >
          <p class="text-zinc-500 text-sm font-medium leading-140">
            {{ item?.description }}
          </p>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
interface Props {
  mainClass: string
  bodyClass: string
  titleClass: string
  items: {
    icon: string
    title: string
    description: string
  }
}

defineProps<Props>()
</script>
