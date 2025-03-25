<template>
  <LayoutWrapperWithSide
    class="pages"
    :menu="breadcrumbs"
    has-breadcrumbs
    has-right
  >
    <template #right>
      <div class="space-y-5">
        <CommonCardSocials
          :telegram="list?.telegram"
          :facebook="list?.facebook"
          :instagram="list?.instagram"
          :loading="loading"
        />
        <CommonCardSideCards has-youth has-volunteer />
      </div>
    </template>
    <div class="space-y-5">
      <Transition name="fade" mode="out-in">
        <CommonCardOrganizationSingleTop
          v-if="list && !loading"
          :item="list"
          is-resident
        />
        <CommonCardOrganizationSingleTopLoading v-else />
      </Transition>
      <div class="space-y-5">
        <p class="text-2xl text-brand-black font-bold leading-loose">
          {{ $t('about_the_agency') }}
        </p>
        <Transition name="fade" mode="out-in">
          <div v-if="loading" class="w-full">
            <p class="shimmer h-6 w-full rounded" />
            <p class="mb-4 shimmer w-[90%] h-3 rounded" />
            <p class="shimmer h-6 w-[80%] rounded" />
            <p class="mb-4 shimmer w-[60%] h-3 rounded" />
            <p class="mb-4 shimmer w-[90%] h-3 rounded" />
            <p class="shimmer h-6 w-[80%] rounded" />
          </div>
          <p v-else class="text-base font-medium leading-snug text-brand-black">
            {{ list?.description }}
          </p>
        </Transition>
      </div>
      <div class="space-y-9">
        <p class="text-4xl font-extrabold leading-130 text-brand-black">
          {{ $t('projects') }}
        </p>
        <Transition name="fade" mode="out-in">
          <div v-if="loading" class="w-full space-y-4">
            <ProjectsCardHorizantalTwoLoading v-for="item in 3" :key="item" />
          </div>
          <div v-else-if="projects?.length && !loading" class="space-y-4">
            <ProjectsCardHorizantalTwo
              v-for="(project, key) in projects"
              :key="key"
              :list="project"
            />
          </div>
          <div v-else>
            <CommonNoData :title="$t('no_projects')" />
          </div>
        </Transition>
      </div>
    </div>
  </LayoutWrapperWithSide>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { useOrganizationStore } from '~/store/organization'

const route = useRoute()
const { t } = useI18n()
const organizationStore = useOrganizationStore()

const {
  data: list,
  pending: loading,
  error,
} = useAsyncData('organization', () =>
  organizationStore.fetchOrganizationsSingle(Number(route.params.id))
)

const { data: projects } = useAsyncData('projects', () =>
  organizationStore.fetchOrganizationsSingleProjects(Number(route.params.id))
)

const breadcrumbs = computed(() => [
  {
    title: t('org.title'),
    link: '/organizations',
  },
  {
    title: list?.value?.name,
    link: '/',
  },
])

useSeoMeta({
  title: list?.value?.title,
  description: list?.value?.title,
  ogTitle: list?.value?.title,
  ogDescription: list?.value?.title,
  twitterTitle: list?.value?.title,
  twitterDescription: list?.value?.title,
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
