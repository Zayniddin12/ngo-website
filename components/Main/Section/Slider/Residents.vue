<template>
  <div v-if="showSection" id="become-resident" class="py-6 -mb-32">
    <CommonSectionSlider
      :loading="loading"
      is-resident
      :cards="resident.map((re) => ({ name: re.title, ...re }))"
      :navigate-next-el="navigateNextEl"
      :navigate-prev-el="navigatePrevEl"
    >
      <template #nav-left>
        <div class="title flex gap-4 items-center">
          <CommonSectionHeaderTitle
            :title="$t('our_residents_title')"
            :subtitle="$t('our_residents_subtitle')"
            title-class="!text-brand-black leading-tight max-md:text-2xl"
            subtitle-class="text-base"
          />
        </div>
      </template>
    </CommonSectionSlider>
  </div>
</template>
<script lang="ts" setup>
import { useHomeStore } from '~/store/home'

const resident = computed(() => homeStore.resident)
const homeStore = useHomeStore()
const showSection = ref(true)
homeStore.fetchResident()

const loading = ref(true)
const emit = defineEmits<{
  (e: 'loading', value: boolean): void
}>()

watch(resident, () => {
  showSection.value = resident.value.length > 0
})

onMounted(() => {
  if (resident) {
    loading.value = false
    emit('loading', loading.value)
  }
})

const navigatePrevEl = 'navigate-prev-el3'
const navigateNextEl = 'navigate-next-el3'
</script>
