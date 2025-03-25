<template>
  <LayoutWrapperFull :menu="breadcrumbsForStatistics">
    <template #title>
      <h1 class="text-4xl font-extrabold leading-130">
        {{ $t('statistics.title') }}
      </h1>
    </template>
    <BaseTabFull
      v-model="activeTab"
      :list="tabList"
      class="mb-6 !w-full"
      item-class="!whitespace-wrap w-1/2"
      wrapper-class="!p-0.5 !rounded-xl w-full"
      active-class="!rounded-10"
      active-items-class="!rounded-10 !text-brand-black"
    />
    <StatisticsSectionInfo v-if="activeTab === 'tab1'" />
    <StatisticsSectionProjects v-else />
  </LayoutWrapperFull>
</template>

<script setup lang="ts">
import { breadcrumbsForStatistics } from '~/data'

const { t } = useI18n()

const activeTab = ref('tab1')

const tabList = [
  {
    label: t('statistics.tab.statistics_info'),
    value: 'tab1',
  },
  {
    label: t('statistics.tab.statistics_projects'),
    value: 'tab2',
  },
]
</script>

<style scoped></style>
