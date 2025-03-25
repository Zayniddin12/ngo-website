<template>
  <div
    :class="borderClass"
    class="bg-gray flex-y-center space-x-2.5 py-2 px-3 border rounded-lg"
  >
    <svg
      v-if="status === 'in_progress'"
      class="!m-0 text-warning text-2xl"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.001 20.777C9.1306 20.5796 8.29467 20.253 7.521 19.808M14.001 3.22299C15.9891 3.67706 17.7642 4.79268 19.0356 6.3872C20.307 7.98171 20.9994 9.96064 20.9994 12C20.9994 14.0393 20.307 16.0183 19.0356 17.6128C17.7642 19.2073 15.9891 20.3229 14.001 20.777M4.57997 17.093C4.03447 16.3005 3.62017 15.4253 3.35297 14.501M3.125 10.5C3.285 9.54999 3.593 8.64999 4.025 7.82499L4.194 7.51999M6.90796 4.57899C7.84361 3.93489 8.89328 3.47471 10.001 3.22299M12.001 8V12M12.001 16V16.01"
        stroke="#EDB716"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <i-circle-check-filled
      v-else-if="status === 'completed'"
      class="!m-0 text-primary text-2xl"
    />
    <i-circle-minus
      v-else-if="status === 'started'"
      class="!m-0 text-gray-400 text-2xl"
    />
    <i-clock-hour
      v-else-if="(status as any) === 'accepted'"
      class="!m-0 text-primary text-2xl"
    />
    <i-circle-x v-else class="!m-0 text-danger text-2xl" />
    <div>
      <p
        class="text-sm font-semibold leading-130 text-brand-black whitespace-nowrap"
      >
        {{ $t(status ? `status.type.${status}` : 'status.type.unknown') }}
      </p>
      <p class="text-[11px] font-medium leading-130 text-gray-700">
        {{ $t('project_status') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TProjectStatus } from '~/types'

interface Props {
  status?: TProjectStatus
}
const props = defineProps<Props>()

const borderClass = computed(() => {
  if (props.status === 'in_progress') {
    return 'border-warning'
  }
  if (props.status === 'completed') {
    return 'border-primary'
  }
  if (props.status === 'started') {
    return 'border-gray-400/50'
  }
  // TODO: For now, we don't have a these statuses
  if (props.status === 'cancelled') {
    return 'border-danger'
  }
  if (props.status === 'accepted') {
    return 'border-transparent'
  }
  return 'border-gray-400/50'
})
</script>

<style scoped></style>
