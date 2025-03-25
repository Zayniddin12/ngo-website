<template>
  <div
    :class="wrapperClass"
    class="relative p-1 bg-gray-500 rounded-2xl flex items-center w-max tab"
  >
    <div
      :class="activeClass"
      class="absolute h-[calc(100%_-_4px)] rounded-xl bg-white tab-shadow -translate-y-1/2 top-1/2 transition-all duration-300"
      :style="{ width: `${active.width}px`, left: `${active.left}px` }"
    />
    <template v-for="(tab, idx) in list" :key="idx">
      <button
        :id="`item_${tab.value}`"
        aria-label="tab"
        class="p-2 rounded-sm transition-300 text-xs md:text-sm font-medium z-10 text-dark px-3 md:px-9 flex-center gap-2"
        :class="[
          itemClass,
          modelValue === tab.value ? activeItemsClass : 'font-medium',
        ]"
        @click="pick(tab.value, $event)"
      >
        <i v-if="tab.icon?.length" :class="tab.icon" class="text-xl" />
        {{ tab.label }}
      </button>
      <div
        v-if="idx !== list?.length - 1 && showDivider"
        class="w-px h-5 rounded-10 bg-gray-600 mx-1"
        :class="[dividerClass]"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
interface Tab {
  label: string
  value: string | number
  icon?: string
}

interface Props {
  showDivider?: boolean
  modelValue?: string | number
  list: Tab[]
  itemClass?: string
  activeClass?: string
  activeItemsClass?: string
  wrapperClass?: string
  dividerClass?: string
}

const props = defineProps<Props>()

interface Emits {
  (e: 'update:modelValue', value: string | number): void
}

const $emit = defineEmits<Emits>()

const active = ref({ left: 0, width: 0 })

const pick = (tab: string | number, e?: { target: HTMLButtonElement }) => {
  const target = e?.target as HTMLButtonElement
  active.value = {
    left: target?.offsetLeft,
    width: target?.offsetWidth,
  }
  $emit('update:modelValue', tab)
}

const updateActiveTab = () => {
  nextTick(() => {
    if (process.client) {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      if (item) {
        pick(props.modelValue, { target: item })
      } else {
        const firstItem = document.getElementById(
          `item_${props.list[0].value}`
        ) as HTMLButtonElement
        if (firstItem) {
          pick(props.list[0].value, { target: firstItem })
        }
      }
    }
  })
}

watch(
  () => props.modelValue,
  () => {
    updateActiveTab()
  },
  { immediate: true }
)

onMounted(() => {
  updateActiveTab()
})
</script>

<style scoped>
.tab-shadow {
  box-shadow: 0 4px 8px 0 rgba(18, 28, 37, 0.1);
}
.tab::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.tab {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
