<template>
  <LayoutWrapperWithSide has-left>
    <template #left>
      <div class="page-shadow bg-white rounded-20 p-5">
        <p class="text-xl font-bold leading-relaxed mb-5">
          {{ $t('documents') }}
        </p>
        <div class="space-y-2">
          <BaseButton
            variant="greenBorder"
            class="w-full !p-4 !rounded-xl !text-sm !font-semibold !leading-130"
            :text="$t('public_offering')"
            :hover-classes="{
              '!bg-primary/20': route.path === '/public-offering',
            }"
            @click="navigateTo('/public-offering')"
          />
          <BaseButton
            variant="greenBorder"
            class="w-full !p-4 !rounded-xl !text-sm !font-semibold !leading-130"
            :text="$t('legal_offer')"
            :hover-classes="{
              '!bg-primary/20': route.path === '/legal-offer',
            }"
            @click="navigateTo('/legal-offer')"
          />
          <BaseButton
            variant="greenBorder"
            class="w-full !p-4 !rounded-xl !text-sm !font-semibold !leading-130"
            :text="$t('terms_of_agreement')"
            :hover-classes="{
              '!bg-primary/20': route.path === '/terms-of-agreement',
            }"
            @click="navigateTo('/terms-of-agreement')"
          />
        </div>
      </div>
    </template>
    <div class="page-shadow bg-white rounded-20 p-6">
      <template v-if="!loading">
        <h3 class="text-lg md:text-2xl font-medium">{{ title }}</h3>
        <p v-html="content"></p>
      </template>
      <template v-else>
        <h3 class="py-4 shimmer w-full rounded-lg mb-4"></h3>
        <p
          v-for="item of 4"
          :key="item"
          class="w-full shimmer h-20 rounded-lg my-1"
        ></p>
      </template>
    </div>
  </LayoutWrapperWithSide>
</template>

<script setup lang="ts">
interface Props {
  loading?: boolean
  title?: string
  content?: string
}

defineProps<Props>()

const route = useRoute()
</script>

<style scoped>
.page-shadow {
  box-shadow: 0 0.28px 0 0 #1c4e4200, 0 -0.59px 1.04px 0 #1c4e4201,
    0 -2.42px 8.12px 0 #1c4e4201, 0 -4.35px 31.55px 0 #1c4e4202,
    0 -2.35px 54.83px 0 #1c4e4204, 0 27px 71px 0 #1c4e4208;
}
</style>
