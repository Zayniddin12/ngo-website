<template>
  <Transition name="fade" mode="out-in">
    <CommonCardSupportLoading v-if="loading" />
    <div v-else>
      <div
        class="flex flex-col gap-4 group transition-300 hover:border-white/40 justify-between p-4 bg-white/10 rounded-20 border border-white/10"
        :class="[
          { 'shadow-primary-hover': isHover },
          ...[{ '!bg-white !border-gray-500': whiteMode }],
        ]"
        @mouseenter="isHover = true"
        @mouseleave="isHover = false"
      >
        <div class="flex justify-between">
          <div
            class="w-16 inline-flex h-16 p-4 bg-white/10 rounded-full justify-center items-center border border-white/20"
            :class="{ '!bg-primary': whiteMode }"
          >
            <img
              class="w-full h-full object-contain object-center aspect-square"
              :src="image"
              :alt="name"
            />
          </div>
          <div
            class="h-6 px-1.5 py-1 bg-primary rounded-md border border-white/10 justify-center items-center gap-1 inline-flex"
          >
            <div
              class="text-right text-white text-xs font-semibold leading-none"
            >
              {{ category?.name }}
            </div>
          </div>
        </div>

        <h1
          class="w-full text-white mt-auto text-xl font-extrabold md:min-h-[52px] leading-130"
          :class="{ '!text-brand-black': whiteMode }"
        >
          {{ name }}
        </h1>

        <p
          class="text-zinc-500 text-sm font-medium line-clamp-2 leading-tight"
          v-html="description"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ISupportCard } from '~/types/support'

interface Props extends ISupportCard {
  whiteMode?: boolean
  loading?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Материальная помощь',
  badge: 'Финансы',
  icon: 'hands',
  description:
    'Мы окажем вам финансовую поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
})

const isHover = ref(false)
</script>
<style scoped>
.shadow-primary-hover {
  box-shadow: 0 4px 16px 0 #ffffff1f;
}
</style>
