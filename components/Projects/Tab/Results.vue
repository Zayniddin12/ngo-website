<template>
  <div>
    <template v-if="isLoading">
      <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
        <div class="grid grid-cols-2 gap-4 w-full">
          <div
            v-for="key in 6"
            :key
            class="sm:h-[183px] h-[92px] w-full shimmer rounded-lg"
          />
        </div>
        <div class="h-[64px] w-full shimmer rounded-lg mt-4" />
      </div>
      <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
        <div class="h-[64px] w-full shimmer rounded-lg mt-4" />
        <div class="h-[94px] w-full shimmer rounded-lg mt-4" />
      </div>
      <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
        <div class="h-[31px] w-full shimmer rounded-lg mt-4" />
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-3 w-full mt-4">
          <div class="h-[68px] w-full shimmer rounded-2xl" />
          <div class="h-[68px] w-full shimmer rounded-2xl" />
        </div>
      </div>
    </template>
    <CommonNoData
      v-else-if="
        !projectResult?.report_image?.length &&
        !projectResult?.report_document?.length &&
        !projectResult?.report_file?.length &&
        !projectResult?.report_description
      "
      image="/svg/noData/no_project_results.svg"
      :title="$t('no_project_results_title')"
      :subtitle="$t('no_project_results_desc')"
    />
    <div v-else class="grid sm:gap-6 gap-4">
      <div
        v-if="
          projectResult?.report_image?.length ||
          projectResult?.report_document?.length ||
          projectResult?.report_file?.length
        "
        class="bg-white p-4 md:p-5 rounded-2xl mt-5"
      >
        <h3
          v-if="projectResult?.report_image?.length"
          class="mb-4 text-brand-black text-xl leading-130 font-bold"
        >
          {{ $t('reporting_materials') }}
        </h3>
        <CommonCardReportImage
          v-if="projectResult?.report_image?.length"
          :loading="isLoading"
          :images="projectResult?.report_image"
        />

        <h3
          v-if="projectResult?.report_document?.length"
          class="my-4 text-brand-black text-xl leading-130 font-bold"
        >
          {{ $t('documents') }}
        </h3>
        <div class="grid gap-3">
          <CommonCardDownloadFile
            v-for="(item, idx) in projectResult?.report_document"
            :key="idx"
            :link="item.file"
            :title="item.name"
            :size="item.size"
          />
        </div>
      </div>
      <div
        v-if="projectResult?.report_description"
        class="w-full rounded-2xl bg-white p-5"
      >
        <p
          class="text-brand-black font-medium leading-140 mt-3 md:mb-6"
          v-html="projectResult?.report_description"
        ></p>
      </div>
      <div
        v-if="projectResult?.report_file?.length"
        class="bg-white p-4 md:p-5 rounded-2xl"
      >
        <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
          {{ $t('attached_file') }}
        </h3>
        <CommonCardAttachedFiles :items="projectResult?.report_file" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IProjectResult } from '~/types'

interface Props {
  projectResult?: IProjectResult
  isLoading: boolean
}
defineProps<Props>()
</script>
