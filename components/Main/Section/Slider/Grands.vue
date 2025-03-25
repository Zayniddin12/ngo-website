<template>
  <div
    v-if="showSection"
    ref="grandSection"
    class="bg-white py-10 md:py-16"
    :class="{ 'overflow-hidden': loading }"
  >
    <CommonSectionSlider
      :loading="loading"
      :cards="activeModel"
      :navigate-next-el="navigateNextEl"
      :navigate-prev-el="navigatePrevEl"
      is-grand
      :active-description="activeDescription"
      :is-grand-active="isGrand"
    >
      <template #nav-left>
        <BaseTabFull
          :model-value="list[0]?.value"
          active-class="absolute !h-[calc(100%_-_8px)] rounded-xl bg-white tab-shadow -translate-y-1/2 top-1/2 transition-300"
          :list="list"
          item-class="max-md:w-full p-0"
          wrapper-class="max-md:!w-full"
          @update:model-value="ActiveTab"
        />
      </template>
    </CommonSectionSlider>
    <div class="px-4">
      <BaseButton
        :text="$t('show_all')"
        variant="greenBorder"
        class="!border-primary !py-2 lg:hidden block w-full !text-sm !font-bold !leading-none"
      >
        <template #suffix>
          <i-arrow-right class="text-2xl !mb-0"></i-arrow-right>
        </template>
      </BaseButton>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

import { useHomeStore } from '~/store/home'
import type { IProjectType } from '~/types'

const { t } = useI18n()
const GrandsDescription = ref({
  title: 'grants',
  short_description: t('short_description_subsidies'),
})
const SubsideDescription = ref({
  title: 'subsidies',
  short_description: t('short_description_subsidies'),
})
const loading = ref(true)
const list = ref([
  { label: t('grants'), value: 'grants' },
  { label: t('subsidies'), value: 'subsidies' },
])
const homeStore = useHomeStore()
const grands = ref<IProjectType[]>([])
const grandSection = ref(null)
const sectionVisible = ref(false)
const subsidies = ref<IProjectType[]>([])
const navigatePrevEl = 'navigate-prev-el2'
const navigateNextEl = 'navigate-next-el2'
const activeModel = ref<IProjectType[]>([])
const isGrand = ref(true)
const showSection = ref(true)

const activeDescription = ref(GrandsDescription.value)

const ActiveTab = (value: any) => {
  activeModel.value = value === 'grants' ? grands.value : subsidies.value
  activeDescription.value =
    value === 'grants' ? GrandsDescription.value : SubsideDescription.value
  isGrand.value = value === 'grants'
}

useIntersectionObserver(grandSection, ([{ isIntersecting }]) => {
  sectionVisible.value = isIntersecting
})

watch(
  sectionVisible,
  (newValue) => {
    if (newValue) {
      Promise.all([homeStore.fetchGrands(), homeStore.fetchSubsides()])
        .then(([grandsData, subsidesData]) => {
          grands.value = grandsData
          activeModel.value = grandsData
          subsidies.value = subsidesData
          showSection.value = grandsData.length > 0 || subsidesData.length > 0
        })
        .finally(() => {
          setTimeout(() => {
            loading.value = false
          }, 1000)
        })
    }
  },
  { once: true }
)
</script>
