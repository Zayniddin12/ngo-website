<template>
  <div>
    <CommonDropdown
      v-bind="{ listStyle }"
      list-style="w-[160px]"
      :active="isShown"
      @change="handleChange"
      @outside-click="handleOutsideClick"
    >
      <template #head>
        <span
          :class="currentLangStyle"
          class="flex items-center gap-1 text-white/40 font-medium leading-20 text-sm"
        >
          <img :src="currentLanguage?.flag" alt="flag" />
          {{ currentLanguage?.name }}
          <i-chevron-right
            class="icon-arrow-up2 text-lg text-white/40 rotate-90 text-gray transition-all duration-300"
            :class="[{ '!-rotate-90': isShown }, currentLangStyle]"
          ></i-chevron-right>
        </span>
      </template>
      <div
        v-for="item of languagesList"
        :key="item.code"
        class="py-2.5 pl-3 pr-2.5 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl hover:bg-white-200 flex items-center gap-3"
        :class="currentLanguage?.name == item.name ? 'bg-gray' : ''"
        @click="onSelect(item?.code)"
      >
        <img :src="item?.flag" alt="flag" />
        <p class="text-sm text-brand-black leading-20 font-medium">
          {{ item.name }}
        </p>
      </div>
    </CommonDropdown>
  </div>
</template>

<script lang="ts" setup>
import { useLanguageSwitcher } from '~/composables/useLanguageSwitcher.js'

interface Props {
  listStyle?: string
  currentLangStyle?: string
}
defineProps<Props>()

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

async function onSelect(code: string) {
  if (currentLanguage.value?.code !== code) {
    await changeLocale(code)
    isShown.value = false
    if (process.client) {
      window.location.reload()
    }
  }
}

const isShown = ref(false)

const handleChange = (val: boolean) => {
  isShown.value = val
}

const handleOutsideClick = () => {
  isShown.value = false
}
</script>
