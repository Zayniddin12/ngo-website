<template>
  <BaseDropdown body-class="!w-[172px]">
    <template #head>
      <div
        :class="{ '!border-red': isHover }"
        class="bg-gray flex-center-between gap-4 relative group duration-300 cursor-pointer rounded-lg border"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        <p
          class="truncate text-sm font-semibold leading-130 text-brand-black pl-4"
        >
          {{ $t('share_title') }}
        </p>
        <button
          aria-label="button"
          class="w-10 h-10 bg-gray-500 flex-center duration-300 group-hover:bg-gray-3 relative shrink-0 t rounded-r-lg border-l border-transparent"
          :class="{ '!border-red': isHover }"
        >
          <i-share class="text-gray-700 text-xl leading-5" />
        </button>
      </div>
    </template>
    <template #body>
      <div class="py-1">
        <div
          v-for="i in socials"
          :key="i"
          class="capitalize px-3 py-2 flex-y-center gap-2 text-sm text-gray-1 font-semibold leading-normal hover:bg-gray/[0.08] hover:text-blue group transition-300 cursor-pointer"
        >
          <component
            :is="`i-${i}`"
            class="text-2xl leading-6 text-gray-2 group-hover:text-blue transition-300"
          />
          {{ i }}
        </div>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
const socials = ['facebook', 'telegram', 'linkedin']

interface Props {
  title?: string
}
defineProps<Props>()
const isHover = ref(false)
</script>
