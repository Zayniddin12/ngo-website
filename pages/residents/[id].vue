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
          v-if="single?.telegram || single?.facebook || single?.instagram"
          :telegram="single?.telegram"
          :facebook="single?.facebook"
          :instagram="single?.instagram"
        />
        <CommonCardSideCards
          class="hidden md:block"
          has-youth
          has-volunteer
          :item="single"
        />
      </div>
    </template>
    <div class="space-y-5">
      <CommonCardOrganizationSingleTop is-resident :item="single" />
      <div class="overflow-x-scroll scroll_none">
        <BaseTabFull
          v-model="activeTab"
          :list="residentTabList()"
          class="mb-6"
          show-divider
          wrapper-class="!p-0.5 !rounded-xl"
          active-class="!rounded-10"
          active-items-class="!rounded-10 !text-brand-black"
        />
      </div>
      <NuxtPage :keepalive="{}" :loading="loading" :single="single" />
    </div>
  </LayoutWrapperWithSide>
</template>
<script setup lang="ts">
import { residentTabList } from '~/data'
import { useResidentsStore } from '~/store/residents'
import { IBreadcrumb } from '~/types'

const route = useRoute()
const { t } = useI18n()
const activeTab = ref(route.path.split('/').at(-1) || 'about')

const residentsStore = useResidentsStore()

const { data: single, pending: loading } = useAsyncData('resident', () =>
  residentsStore.fetchResidentBySlug(route.params.id as string)
)

watch(activeTab, (value) => {
  const routeId = route.params.id
  if (value === 'about' && routeId) {
    navigateTo(`/residents/${routeId}`)
  } else if (value === 'projects') {
    navigateTo(`/residents/${routeId}/projects`)
  } else if (value === 'comment') {
    navigateTo(`/residents/${routeId}/comment`)
  } else if (value === 'contact') {
    navigateTo(`/residents/${routeId}/contact`)
  }
})
const breadcrumbs = reactive<IBreadcrumb[]>([
  {
    title: t('page.resident.title'),
    link: '/residents',
  },
  {
    title:
      (route.params.id as string).charAt(0).toUpperCase() +
      (route.params.id as string).slice(1),
    link: '/residents/' + route.params.id,
  },
])

useSeoMeta({
  title: single?.value?.title,
  description: single?.value?.title,
  ogTitle: single?.value?.title,
  ogDescription: single?.value?.title,
  twitterTitle: single?.value?.title,
  twitterDescription: single?.value?.title,
  ogImage: single?.value?.image[0]?.image || '/og.png',
  twitterImage: '/og.png',
})
</script>

<style scoped>
.scroll_none::-webkit-scrollbar {
  display: none !important;
}
</style>
