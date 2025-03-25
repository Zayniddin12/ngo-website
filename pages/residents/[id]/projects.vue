<template>
  <div class="pages">
    <p class="mb-4 !text-2xl font-bold leading-tight">
      {{ $t('projects') }}
    </p>
    <div v-if="!loading && projects?.length" class="space-y-4">
      <ProjectsCardHorizantalTwo
        v-for="(project, key) in projects"
        :key
        :list="project"
      />
      <BaseButton
        v-if="projects?.length > 5"
        class="w-full mt-6"
        variant="green"
        :text="$t('show_more')"
      />
    </div>
    <div v-else-if="loading" class="space-y-4">
      <ProjectsCardHorizantalTwoLoading v-for="key in 5" :key />
    </div>
    <CommonSectionNoData
      v-else
      :title="$t('no_project_yet')"
      :subtitle="$t('no_project_yet_appear')"
      image="/svg/noData/no_projects.svg"
    />
  </div>
</template>
<script setup lang="ts">
import { useProjectStore } from '@/store/projects'

const projectStore = useProjectStore()
projectStore.fetchProjectsByResident(useRoute().params?.id as string)

const loading = computed(() => projectStore.loading)
const projects = computed(() => projectStore.residentProjects)
</script>
