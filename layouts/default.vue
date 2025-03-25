<template>
  <main
    class="default__layout"
    :class="{ 'lg:mt-[130px]  mt-[100px]': !isMain }"
  >
    <CommonTest />
    <LayoutHeader :has-sticky="isMain" />

    <slot />

    <footer>
      <LayoutFooter />
      <LayoutFooterBottom />
    </footer>

    <LayoutMobileHeaderMenu />
  </main>
</template>
<script setup lang="ts">
const route = useRoute()
const isMain = computed(() => route.fullPath === '/')
</script>
