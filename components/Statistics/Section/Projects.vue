<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-20 bg-white p-4">
        <p class="mb-9 md:text-xl text-sm font-semibold leading-relaxed text-brand-black">
          {{ $t("statistics.organs") }}
        </p>
        <div class="flex-y-center lg:flex-row flex-col">
          <ClientOnly>
            <StatisticsChartHalfRadialChart class="mb-10" />
          </ClientOnly>
          <StatisticsChartLegends
            :legends="chart2Legends"
            title-class="md:!text-xl !text-sm !font-extrabold text-brand-black !leading-relaxed"
            subtitle-class="!text-base !font-medium !leading-tight text-gray-700"
          />
        </div>
      </div>
      <div class="rounded-20 bg-white p-4">
        <p
          class="mb-9 w-4/5 md:text-xl text-sm font-semibold leading-relaxed text-brand-black"
        >
          {{ $t("statistics.organizations") }}
        </p>
        <div class="flex-y-center space-x-8 lg:space-x-16 lg:flex-row flex-col">
          <ClientOnly>
            <StatisticsChartHalfRadialChart class="mb-10" />
          </ClientOnly>
          <StatisticsChartLegends
            :legends="chart2Legends"
            title-class="md:!text-xl !text-sm !font-extrabold text-brand-black !leading-relaxed"
            subtitle-class="!text-base !font-medium !leading-tight text-gray-700"
          />
        </div>
      </div>
    </div>
    <div class="space-y-3 bg-white rounded-xl shadow-primary p-5">
      <p class="md:text-xl text-sm font-semibold text-brand-black leading-relaxed">
        {{ $t("statistics.social_projects") }}
      </p>
      <div
        class="flex-y-center flex-wrap gap-5 md:gap-0 flex-col md:flex-row justify-between rounded-2xl px-6 py-3 border border-gray-200"
      >
        <div
          v-for="(item, key) in socialProjects"
          :key
          class="flex-y-center text-center relative"
        >
          <div
            class="rounded-full absolute left-0 bg-primary shadow-primary w-1 h-7"
          />
          <div class="flex-center flex-col md:mr-0 md:ml-5 mx-5 mb-1">
            <p class="text-2xl font-bold leading-[30px] text-brand-black">
              {{ formatCount(item?.count ?? 0) }}
            </p>
            <p class="text-base font-normal leading-tight text-gray-700 w-52">
              {{ item?.title ?? "-" }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-20 bg-white p-4">
        <p class="mb-9 md:text-xl text-sm font-semibold leading-relaxed text-brand-black">
          {{ $t("statistics.chart.version_one") }}
        </p>
        <div class="flex-y-center flex-col md:flex-row md:space-x-4">
          <ClientOnly>
            <StatisticsChartDonutFull class="mb-10 w-56 !h-48" />
          </ClientOnly>
          <StatisticsChartLegends
            :legends="chart2Legends"
            title-class="md:!text-xl !text-sm !font-extrabold text-brand-black !leading-relaxed"
            subtitle-class="!text-base !font-medium !leading-tight text-gray-700"
          />
        </div>
      </div>
      <div class="rounded-20 bg-white p-4">
        <p
          class="mb-8 md:text-xl text-sm font-semibold w-4/5 leading-relaxed text-brand-black"
        >
          {{ $t("statistics.organizations") }}
        </p>
        <div>
          <div class="flex-y-center w-full gap-1 mb-6">
            <div
              v-for="(legend, key) in chartLegends"
              :key
              class="h-10 rounded-lg pill-shadow"
              :style="{
                width: calculateWidth(legend?.quantity ?? 0),
                background: legend?.color,
              }"
            ></div>
          </div>

          <StatisticsChartLegends
            :legends="chartLegends"
            full
            no-percent
            title-class="!text-base !font-medium !leading-tight text-gray-700"
            subtitle-class="!text-base !font-medium !leading-tight !text-brand-black"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chart2Legends, chartLegends, socialProjects } from "~/data";

const { t } = useI18n();

const total = computed(() =>
  chartLegends?.reduce((acc: number, legend: any) => acc + legend?.quantity, 0)
);

const calculateWidth = (quantity: number) => {
  return (quantity / total.value) * 100 + "%";
};
</script>

<style scoped>
.shadow-primary {
  box-shadow: 0 0 30px 0 #38476d17;
}

.pill-shadow {
  box-shadow: 0 4px 20px 0 #1b87c533;
}
</style>
