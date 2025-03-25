<template>
  <div v-if="!finished">
    <div
      v-if="status !== EProjectStatus.completed"
      class="bg-white p-5 max-w-[378px] flex-center flex-col rounded-2xl overflow-hidden"
    >
      <p class="text-brand-black text-lg font-bold leading-130">
        {{ $t('remained_time') }}
      </p>
      <div v-if="!loading" class="flex items-baseline gap-1.5 mb-9 mt-8">
        <div>
          <div class="flex gap-1">
            <div
              v-for="(item, index) in days"
              :key="index"
              :class="statusClass"
              class="flex-center rounded-md w-8"
            >
              <p class="leading-130 text-32 font-bold">{{ item }}</p>
            </div>
          </div>
          <p
            class="text-center text-sm font-medium text-info-500 leading-4 mt-1"
          >
            {{ $t('count_down.day') }}
          </p>
        </div>
        <img src="/svg/divider.svg" alt="divider" />
        <div>
          <div class="flex gap-1">
            <div
              v-for="(item, index) in hours"
              :key="index"
              :class="statusClass"
              class="flex-center rounded-md w-8"
            >
              <p class="leading-130 text-32 font-bold">{{ item }}</p>
            </div>
          </div>
          <p
            class="text-center text-sm font-medium text-info-500 leading-4 mt-1"
          >
            {{ $t('count_down.hour') }}
          </p>
        </div>
        <img src="/svg/divider.svg" alt="divider" />
        <div>
          <div class="flex gap-1">
            <div
              v-for="(item, index) in minutes"
              :key="index"
              :class="statusClass"
              class="flex-center rounded-md w-8"
            >
              <p class="leading-130 text-32 font-bold">{{ item }}</p>
            </div>
          </div>
          <p
            class="text-center text-sm font-medium text-info-500 leading-4 mt-1"
          >
            {{ $t('count_down.minute') }}
          </p>
        </div>
      </div>
      <div v-else class="shimmer h-14 w-full mb-9 mt-8 rounded-lg" />
      <BaseButton
        v-if="finished"
        class="w-full"
        variant="warning"
        :text="$t('count_down.call')"
      />
      <a v-else target="_blank" :href="linker?.one_id_url">
        <BaseButton class="w-full" variant="success" :text="$t('get_project')">
          <template #suffix><i-rocket class="text-2xl" /></template
        ></BaseButton>
      </a>
    </div>
    <div v-else class="bg-white max-w-[378px] block rounded-2xl p-5 !pb-3">
      <p class="text-brand-black mb-4 text-lg font-bold leading-130 text-left">
        {{ $t('status.type.completed') }}
      </p>
      <img src="/images/winner.png" alt="img" class="pointer-events-none" />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { onMounted, ref } from 'vue'

import { useHomeStore } from '~/store/home'
import { TProjectStatus } from '~/types'
import { EProjectStatus } from '~/types/enums'

interface Props {
  targetDate?: string // Format: "YYYY-MM-DD"
  status: TProjectStatus
  completed?: boolean
}

const props = defineProps<Props>()
const loading = ref(true)
const days = ref([0, 0])
const hours = ref([0, 0])
const minutes = ref([0, 0])
const seconds = ref([0, 0])

const target_date = new Date(dayjs(props.targetDate))
const finished = ref(false)

const homeStore = useHomeStore()
const { data: linker } = useAsyncData(async () => {
  const res = await homeStore.fetchOneId()
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})
let idTimer: any
const totalDuration = target_date.getTime() - new Date().getTime()
const remainingTime = ref(totalDuration)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 1000)
  getCountdown()
  const targetDateForCheck = new Date(target_date!).getTime()
  const currentDateForCheck = new Date().getTime()
  if (
    currentDateForCheck > targetDateForCheck &&
    props.status !== EProjectStatus.completed
  ) {
    finished.value = true
  } else {
    idTimer = setInterval(() => {
      getCountdown()
      if (days.value == '00' && hours.value == '00' && minutes.value == '00') {
        finished.value = true
      }
    }, 1000)

    days.value = days.value.toString().split('')
    hours.value = days.value.toString().split('')
    minutes.value = days.value.toString().split('')
  }
})

watch(
  finished,
  (value) => {
    if (value) {
      clearInterval(idTimer)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  clearInterval(idTimer)
})

function getCountdown() {
  // find the amount of "seconds" between now and target
  const current_date = new Date().getTime()
  let seconds_left = (target_date - current_date) / 1000
  days.value = pad(parseInt(seconds_left / 86400))
  remainingTime.value = target_date.getTime() - current_date
  seconds_left = seconds_left % 86400

  hours.value = pad(parseInt(seconds_left / 3600))
  seconds_left = seconds_left % 3600

  minutes.value = pad(parseInt(seconds_left / 60))
  seconds.value = pad(parseInt(seconds_left % 60))
}

function pad(n: number) {
  return (n < 10 ? '0' : '') + n
}

const percentageLeft = computed(
  () => (remainingTime.value / totalDuration) * 100
)

const statusClass = computed(() => {
  if (percentageLeft.value >= 50) {
    return 'bg-primary/10 text-primary'
  } else if (percentageLeft.value >= 25) {
    return 'bg-warning/10 text-warning'
  } else {
    return 'bg-danger/10 text-danger'
  }
})
</script>
