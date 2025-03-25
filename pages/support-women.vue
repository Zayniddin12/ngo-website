<template>
  <LayoutWrapperFull
    :menu="breadcrumbsForSupportWomen"
    class="min-[900px]:pt-2"
  >
    <main class="space-y-16">
      <SupportWomenSectionHero />
      <Transition name="fade" mode="out-in">
        <section
          v-if="supportStore.isLoading"
          class="grid grid-cols-1 relative z-10 md:grid-cols-3 gap-6"
        >
          <CommonCardSupport
            v-for="key in 5"
            :key
            :loading="supportStore.isLoading"
            white-mode
          />
        </section>
        <section
          v-else
          class="grid grid-cols-1 relative z-10 md:grid-cols-3 gap-6"
        >
          <CommonCardSupport
            v-for="(item, key) in supports"
            :key
            v-bind="item"
            :loading="supportStore.isLoading"
            white-mode
          />
        </section>
      </Transition>
      <section class="space-y-4">
        <p class="text-2xl font-bold leading-130">
          {{ $t('page.support_women.statistics') }}
        </p>
        <Transition name="fade" mode="out-in">
          <div
            v-if="supportStore.isLoading"
            class="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <div
              v-for="(item, idx) in 8"
              :key="idx"
              class="w-[290px] h-[118px] p-5 space-y-3 rounded-2xl border border-brand-black/10"
            >
              <div class="shimmer rounded-xl !bg-gray-500 w-full h-10"></div>
              <div class="shimmer rounded-xl !bg-gray-500 w-[75%] h-5"></div>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            <CommonCardStatistics
              v-for="(item, idx) in statistics"
              v-bind="item"
              :key="idx"
            />
          </div>
        </Transition>
      </section>
      <section class="space-y-4">
        <p class="text-2xl font-bold leading-130">
          {{ $t('page.support_women.organizations') }}
        </p>
        <Transition name="fade" mode="out-in">
          <CommonCardPlatformLoading v-if="supportStore.isLoading" />
          <CommonCardPlatformCards v-else :list="data" />
        </Transition>

        <NuxtLink
          v-if="!supportStore.isLoading && data?.length > 4"
          class="flex-x-center"
          :to="{ name: 'residents' }"
        >
          <BaseButton
            variant="green"
            :text="$t('statistics.service.all_residents')"
          >
            <template #suffix>
              <i-arrow-right class="text-2xl !mb-0" />
            </template>
          </BaseButton>
        </NuxtLink>
      </section>
      <section class="pt-9 pb-32">
        <CommonCardNeedHelp type="green" :loading="supportStore.isLoading" />
      </section>
    </main>
  </LayoutWrapperFull>
</template>

<script setup lang="ts">
import { breadcrumbsForSupportWomen } from '~/data'
import { useSupportStore } from '~/store/support'

const supportStore = useSupportStore()
supportStore.getSupports()
supportStore.getStatistics()

const supports = computed(() => supportStore.supports)
const statistics = computed(() => supportStore.statistics)

const { data } = await useAsyncData('get-residents-support-women', () =>
  supportStore.fetchWomenSupportResidents()
)
</script>
