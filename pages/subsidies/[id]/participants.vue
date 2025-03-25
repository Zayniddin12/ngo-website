<template>
  <ProjectsTabParticipants :participants="participants" :loading="loading" />
</template>
<script setup lang="ts">
import { useProjectStore } from '~/store/projects'
import { IParticipant } from '~/types'

const route = useRoute()
const loading = ref(true)
const projectStore = useProjectStore()
const activeTab = ref('participants')
const participants = ref<IParticipant>()

const emit = defineEmits<{
  (e: 'on-tab-change', value: string): void
}>()

onMounted(() => {
  projectStore
    .getParticipants(route.params.id as unknown as number)
    .then((res) => {
      participants.value = res
    })
    .finally(() => {
      loading.value = false
    })
  emit('on-tab-change', activeTab.value)
})
</script>
<style scoped></style>
