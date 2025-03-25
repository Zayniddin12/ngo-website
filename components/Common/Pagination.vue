<template>
  <ul class="pagination flex-y-center gap-2">
    <li
      v-if="paginationButtons"
      :class="`${navigationClass} ${hasFirst ? 'pointer-events-none' : ''}`"
      class="group cursor-pointer"
      @click="prev"
    >
      <button
        aria-label="button"
        :disabled="hasFirst"
        class="flex-y-center gap-1"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:stroke-primary transition-300"
            d="M10 3.33337L6 8.00004L10 12.6667"
            stroke="#8A8C8A"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>{{ $t('pagination.prev') }}</span>
      </button>
    </li>
    <li
      v-for="page in items"
      :key="page.label"
      class="transition-300 transition"
      :class="`${itemClass} ${page.active ? activeClass : ''} ${
        page.disable ? disableClass : ''
      }`"
    >
      <span v-if="page.disable" class="w-full h-full flex-center"> ... </span>
      <button
        v-else
        aria-label="button"
        class="w-full h-full"
        @click="goto(page.label)"
      >
        {{ page.label }}
      </button>
    </li>
    <li
      v-if="paginationButtons"
      :class="`${navigationClass} ${hasLast ? disableClass : ''}`"
      class="group cursor-pointer"
      @click="next"
    >
      <button
        aria-label="button"
        :class="{ 'pointer-events-none': hasLast }"
        :disabled="hasLast"
        class="flex-y-center gap-1"
      >
        <span>{{ $t('pagination.next') }}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            class="group-hover:stroke-primary transition-300"
            d="M6 3.33337L10 8.00004L6 12.6667"
            stroke="#8A8C8A"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  currentPage?: number
  total?: number
  limit?: number
  itemClass?: string
  navigationClass?: string
  activeClass?: string
  disableClass?: string
  paginationButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemClass:
    'text-gray-700 text-sm font-medium tracking-tight leading-130 rounded-lg w-9 h-9 p-2 flex-center transition-300 hover:!bg-primary hover:!text-white',
  navigationClass:
    'text-gray-700 text-sm font-medium tracking-tight leading-130 rounded-lg h-9 p-2 w-fit flex-center transition-300 hover:!text-primary',
  activeClass: '!bg-primary !border-transparent !text-white',
  disableClass: 'pointer-events-none',
})
const emit = defineEmits(['change', 'input'])
const pageCount = computed(() => Math.ceil(props.total / props.limit))
const items = computed(() => {
  const valPrev = props.currentPage > 1 ? props.currentPage - 1 : 1 // for easier navigation - gives one previous page
  const valNext =
    props.currentPage < pageCount.value
      ? props.currentPage + 1
      : pageCount.value // one next page
  const dotsBefore = valPrev > 3 ? 2 : null
  const dotsAfter = valNext < pageCount.value - 2 ? pageCount.value - 1 : null
  const output = []
  for (let i = 1; i <= pageCount.value; i += 1) {
    if (
      [
        1,
        pageCount.value,
        props.currentPage,
        valPrev,
        valNext,
        dotsBefore,
        dotsAfter,
      ].includes(i)
    ) {
      output.push({
        label: i,
        active: props.currentPage === i,
        disable: [dotsBefore, dotsAfter].includes(i),
      })
    }
  }
  return output
})
const hasFirst = computed(() => props.currentPage === 1)
const hasLast = computed(() => props.currentPage === pageCount.value)
watch(
  () => props.currentPage,
  () => {
    emit('change')
  }
)
function prev() {
  if (!hasFirst.value) {
    emit('input', props.currentPage - 1)
  }
}
function goto(page: number) {
  emit('input', page)
}
function next() {
  if (!hasLast.value) {
    emit('input', props.currentPage + 1)
  }
}
onMounted(() => {
  if (props.currentPage > pageCount.value) {
    emit('change')
  }
})
</script>
