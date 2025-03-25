<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="rounded-20 bg-white p-4">
        <p
          class="mb-9 md:text-xl text-base font-semibold leading-relaxed text-brand-black"
        >
          {{ $t('statistics.chart.version_one') }}
        </p>
        <div class="flex-y-center md:flex-row flex-col">
          <ClientOnly>
            <StatisticsChartHalfRadialChart class="mb-10" />
          </ClientOnly>
          <StatisticsChartLegends :legends="chartLegends" />
        </div>
      </div>
      <div class="rounded-20 bg-white p-4">
        <p
          class="mb-9 md:text-xl text-base font-semibold leading-relaxed text-brand-black"
        >
          {{ $t('statistics.chart.version_two') }}
        </p>
        <div class="flex-y-center md:space-x-16 md:flex-row flex-col gap-6">
          <ClientOnly>
            <StatisticsChartDonutFull class="w-52" />
          </ClientOnly>
          <StatisticsChartLegends :legends="chartLegends" />
        </div>
      </div>
    </div>
    <div class="space-y-3">
      <p
        class="md:text-xl text-base font-semibold text-brand-black leading-relaxed"
      >
        {{ $t('statistics.section.title') }}
      </p>
      <div class="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-3">
        <CommonCardStatistics
          v-for="(item, key) in statisticCards"
          v-bind="item"
          :key
          class="bg-white"
        />
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-20 bg-white p-4">
        <div class="flex-y-center justify-between mb-5">
          <div>
            <p
              class="md:text-xl text-base font-semibold leading-relaxed text-brand-black"
            >
              {{ $t('statistics.service.title') }}
            </p>
            <p
              class="md:text-xl text-base font-medium leading-130 text-gray-700"
            >
              {{ t('statistics.service.companies', { count: 422 }) }}
            </p>
          </div>
          <BaseButton size="sm" variant="secondary">
            <div class="flex items-center gap-2">
              <div class="text-black">{{ $t('all_services') }}</div>
              <div><i-arrow-right class="text-2xl !m-0" /></div>
            </div>
          </BaseButton>
        </div>
        <div class="flex-y-center divide-y flex-col">
          <StatisticsCardService
            v-for="(company, key) in companies"
            :key
            :company
            is-company
          />
        </div>
      </div>
      <div class="rounded-20 bg-white p-4">
        <div class="mb-5">
          <p
            class="md:text-xl text-base font-semibold leading-relaxed text-brand-black"
          >
            {{ $t('statistics.service.title') }}
          </p>
          <p class="md:text-xl text-base font-medium leading-130 text-gray-700">
            {{ t('statistics.service.companies', { count: 422 }) }}
          </p>
        </div>
        <div class="flex-y-center divide-y flex-col">
          <StatisticsCardService
            v-for="(company, key) in companies"
            :key
            :company
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chartLegends, companies, statisticCards } from '~/data'

const { t } = useI18n()
</script>

<style scoped></style>
