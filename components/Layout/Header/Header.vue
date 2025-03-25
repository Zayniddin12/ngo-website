<template>
  <header class="static">
    <LayoutHeaderTop
      :class="!hasSticky ? 'hidden' : ''"
      :open-menu="openMenu"
      @update:model-value="toggleMenu"
    />
    <LayoutHeaderMid
      :menu="menu"
      :open-menu="openMenu"
      :class="
        !hasSticky
          ? 'translate-y-0'
          : isSticky
          ? 'translate-y-0'
          : '-translate-y-40'
      "
      class="fixed top-0 w-full z-40 transition-300 header-shadow"
      @update:model-value="toggleMenu"
    />
  </header>
  <Transition name="from-left">
    <LayoutMobileBurgerMenu
      v-if="openMenu"
      :links="routerBtnData"
      @close-mobile-header="toggleMenu"
      @update:model-value="toggleMenu"
    />
  </Transition>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

import { menu, routerBtnData } from '~/data/'

interface Props {
  hasSticky?: boolean
}

defineProps<Props>()

const route = useRoute()
const { y } = useWindowScroll()

const isSticky = ref(false)
const openMenu = ref(false)

watch(
  y,
  () => {
    isSticky.value = y.value > 100
  },
  { deep: true }
)

watch(
  () => route.name,
  () => {
    openMenu.value = false
  }
)

onMounted(() => {
  isSticky.value = y.value > 100
})

function toggleMenu(item: boolean) {
  openMenu.value = item
  document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
  if (item) {
    document.getElementsByTagName('body')[0].classList.add('overflow-hidden')
  }
}
</script>
<style>
.from-left-enter-active {
  animation: from-left 300ms ease-out;
}

.from-left-leave-active {
  animation: from-left 300ms ease-in reverse;
}

@keyframes from-left {
  0% {
    opacity: 0;
    transform: translateX(-100%) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}

.header-shadow {
  box-shadow: 0 12px 44px 0 #0000000a;
}
</style>
