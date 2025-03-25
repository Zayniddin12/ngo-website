<template>
  <ProjectsTabResults
    class="pages"
    :project-result="projectResult"
    :is-loading="loading"
  />
</template>
<script setup lang="ts">
import { useProjectStore } from '~/store/projects'
import { IProjectResult } from '~/types'

const loading = ref(true)
const projectStore = useProjectStore()
const route = useRoute()
const projectResult = ref<IProjectResult>()
const activeTab = ref('results')

const emit = defineEmits<{
  (e: 'on-tab-change', value: string): void
}>()
onMounted(() => {
  projectStore
    .getProjectResult(route.params.id as unknown as number)
    .then((res) => {
      projectResult.value = res
    })
    .finally(() => {
      loading.value = false
    })
  emit('on-tab-change', activeTab.value)
})
</script>
