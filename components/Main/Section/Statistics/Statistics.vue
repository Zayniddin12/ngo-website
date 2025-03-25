<template>
  <div v-if="showSection" class="container py-10 md:pt-16 md:pb-14">
    <div class="mb-6 md:mb-7 flex items-end justify-between">
      <CommonSectionHeaderTitle
        title-class="text-28 max-sm:text-2xl text-brand-black"
        subtitle-class="max-w-[781px]"
        :title="$t('statistics.title')"
        :subtitle="$t('statistics.subtitle')"
      />
      <BaseButton
        v-if="false"
        class="hidden md:block !py-2 !px-6 !text-sm !font-bold !leading-none"
        size="sm"
        variant="greenBorder"
        @click="navigateTo('/statistics')"
      >
        <div class="flex items-center gap-2">
          <div class="text-black">{{ $t('all_services') }}</div>
          <div><i-arrow-right class="text-2xl !m-0" /></div>
        </div>
      </BaseButton>
    </div>
    <div
      v-if="!loading"
      class="flex flex-col md:grid md:grid-cols-3 min-[1100px]:grid-cols-4 gap-3"
    >
      <CommonCardStatistics
        v-for="(item, i) in statistics.map((item) => ({
          ...item,
          title: item.name,
          count: item.count,
          image: item.image,
        }))"
        v-bind="item"
        :key="i"
      />
    </div>
    <MainSectionStatisticsLoading v-else />
    <BaseButton
      v-if="false"
      class="block mt-6 w-full md:hidden !py-2 !px-6 !text-sm !font-bold !leading-none"
      size="sm"
      variant="outline-primary"
      @click="navigateTo('/statistics')"
    >
      <div class="flex items-center gap-2">
        <div class="text-black">{{ $t('all_services') }}</div>
        <div><i-arrow-right class="text-2xl !m-0" /></div>
      </div>
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home'
import type { IStatistics } from '~/types'

const homeStore = useHomeStore()
const statistics = ref<IStatistics[]>([])
const loading = ref(true)
const showSection = ref(true)

onMounted(() => {
  homeStore
    .fetchStatistics()
    .then((res) => {
      statistics.value = res
      showSection.value = res.length > 0
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<style scoped></style>
