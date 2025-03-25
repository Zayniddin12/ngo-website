<template>
  <main v-if="showSection" class="py-10 md:pt-16 md:pb-24">
    <div class="container">
      <div class="lg:flex items-end justify-between gap-16 pb-9">
        <h2
          class="text-brand-black text-2xl md:text-4xl mb-2 md:mb-0 font-extrabold leading-130"
        >
          {{ $t('platform_title') }}
        </h2>
        <div class="flex gap-5 md:gap-10 items-end max-lg:mt-3">
          <p
            class="text-gray-700 text-sm md:text-base font-medium leading-tight"
          >
            {{ $t('platform_description') }}
          </p>
          <BaseButton
            class="hidden md:block !py-2 !px-6 !text-sm !font-bold !leading-none"
            variant="greenBorder"
            :text="$t('projects')"
            @click="navigateTo('/residents')"
          >
            <template #suffix>
              <i-arrow-right class="!mb-0 text-2xl" />
            </template>
          </BaseButton>
        </div>
      </div>
      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <CommonCardPlatformCards v-if="!loading" :list="resident" />
          <div v-if="loading" class="container">
            <MainSectionPlatformLoading />
          </div>
        </div>
      </Transition>
      <BaseButton
        class="block md:hidden w-full mt-6 !py-2 !px-6 !text-sm !font-bold !leading-none"
        variant="greenBorder"
        :text="$t('projects')"
        size="sm"
        @click="navigateTo('/residents')"
      >
        <template #suffix>
          <i-arrow-right class="!mb-0 text-2xl" />
        </template>
      </BaseButton>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home'
import { IResidentPlatform } from '~/types'

const resident = ref<IResidentPlatform[]>()
const showSection = ref(true)
const homeStore = useHomeStore()

const loading = ref(true)
onMounted(() => {
  homeStore
    .fetchResidentPlatform(undefined, undefined, undefined, false, false, 12)
    .then((data: any) => {
      resident.value = data.records
      showSection.value = data.records.length > 0
    })
    .finally(() => {
      loading.value = false
    })
})
</script>
