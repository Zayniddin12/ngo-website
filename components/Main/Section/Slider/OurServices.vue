<template>
  <div class="!py-6">
    <CommonSectionSlider
      is-service
      :loading="loading"
      :cards="ServiceData"
      :navigate-next-el="navigateNextEl"
      :navigate-prev-el="navigatePrevEl"
    >
      <template #nav-left>
        <div class="title flex gap-4">
          <div
            class="sm:w-3 w-2 shrink-0 rounded-xl bg-primary shadow-green-card"
          ></div>
          <CommonSectionHeaderTitle
            :title="$t('our_services_title')"
            :subtitle="$t('our_services_subtitle')"
            title-class="!text-brand-black max-md:text-3xl leading-tight"
            subtitle-class="text-base"
          />
        </div>
      </template>
    </CommonSectionSlider>
  </div>
</template>
<script lang="ts" setup>
import { useAboutStore } from '~/store/about'
import type { IOurServices } from '~/types'

const loading = ref(true)

const emit = defineEmits<{
  (e: 'loading', value: boolean): void
}>()
let ServiceData = ref<IOurServices[]>([])
ServiceData = computed(() => aboutStore.serviceDatas)
const aboutStore = useAboutStore()

aboutStore.fetchOurServices()
onMounted(() => {
  if (ServiceData) {
    setTimeout(() => {
      loading.value = false
      emit('loading', loading.value)
    }, 1000)
  }
})
const navigatePrevEl = 'navigate-prev-el1'
const navigateNextEl = 'navigate-next-el1'
</script>
