<template>
  <div
    class="flex-col p-5 rounded-2xl border border-brand-black/10 justify-start items-start gap-3 inline-flex"
  >
    <div class="flex items-center gap-2">
      <div>
        <img class="w-6 h-6" :src="image" :alt="name + ' image'" />
      </div>
      <h1 class="text-gray-700 text-base font-medium leading-tight">
        {{ name }}
      </h1>
    </div>
    <div class="gap-3 flex items-center">
      <h2
        class="text-center text-neutral-900 min-[830px]:text-4xl text-3xl font-extrabold leading-130"
      >
        {{ count }}
      </h2>
      <div
        class="px-2 py-1 rounded-md text-center min-[830px]:text-base text-sm font-semibold leading-tight"
        :class="percentageStyle"
      >
        {{ percentage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
  count: string
  image: string
  percentage: string
}

const props = withDefaults(defineProps<Props>(), {
  count: '',
  icon: 'files',
  percentage: '',
})

const percentageStyle = computed(() => {
  return {
    'text-primary bg-primary/10': props.percentage.includes('+'),
    'text-danger-600 bg-danger-600/10': props.percentage.includes('-'),
  }
})
</script>
