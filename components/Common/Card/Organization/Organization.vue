<template>
  <NuxtLink
    :to="`/organizations/${data?.id}`"
    class="bg-white hover:border-primary transition-300 md:justify-between md:h-28 p-5 gap-8 rounded-2xl border border-gray-500 md:grid-cols-12 grid grid-cols-1 items-center"
    :class="{ 'shadow-primary-hover': isHover }"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="flex-y-center space-x-2.5 lg:col-span-4 col-span-6">
      <CommonImage
        :src="data?.image ?? '#'"
        class="w-[50px] h-[50px] shrink-0 md:h-[72px] md:w-[72px] p-1.5 bg-white shadow-primary rounded-full"
        image-class="rounded-full"
      />
      <div class="space-y-1">
        <h1 class="text-base font-bold text-brand-black line-clamp-2">
          {{ data?.name }}
        </h1>
        <div class="lg:hidden">
          <p class="text-sm font-medium text-gray-700">
            {{ formatPhoneNumber(data?.phone) }}
          </p>
        </div>
      </div>
    </div>
    <div class="hidden lg:block lg:col-span-3 text-center">
      <p class="text-sm font-semibold text-brand-black">
        {{ formatPhoneNumber(data?.phone) }}
      </p>
    </div>
    <div class="hidden md:block col-span-3">
      <p class="text-sm font-semibold text-brand-black line-clamp-2">
        {{ data?.location }}
      </p>
    </div>
    <div class="flex md:justify-end lg:col-span-2 col-span-3">
      <BaseButton
        :text="`${data?.project_count} ${$t('projects')}`"
        class="!text-base !font-semibold min-w-32 !py-2 !px-4"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { IOrganization } from '~/types'

interface Props {
  data: IOrganization
}

defineProps<Props>()

const isHover = ref(false)
</script>

<style scoped>
.shadow-primary {
  box-shadow: 0 14.4px 34.56px 11.52px #1316120a;
}
.shadow-primary-hover {
  box-shadow: 0 3.46px 2.21px 0 #00000002, 0 8.31px 5.32px 0 #00000003,
    0 15.65px 10.02px 0 #00000004, 0 27.92px 17.87px 0 #00000005,
    0 52.22px 33.42px 0 #00000005, 0 125px 80px 0 #00000008;
}
</style>
