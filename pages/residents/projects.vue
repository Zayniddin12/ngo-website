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
          :telegram="data?.telegram"
          :facebook="data?.facebook"
          :instagram="data?.instagram"
        />
        <CommonCardSideCards has-youth has-volunteer />
      </div>
    </template>
    <div class="space-y-5">
      <CommonCardOrgSingleTop is-resident :item="single" />
      <div class="space-y-5">
        <p class="text-2xl text-brand-black font-bold leading-loose">
          {{ single?.company_name }}
        </p>
        <p class="text-base font-medium leading-snug text-brand-black">
          {{ single?.projects_count }}
        </p>
      </div>
      <div>
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
      <div class="space-y-9">
        <p class="text-4xl font-extrabold leading-130 text-brand-black">
          {{ $t('project') }}
        </p>
        <div class="space-y-4">
          <ProjectsCardHorizantalTwo
            v-for="(project, key) in projectCards"
            :key
            v-bind="project"
          />
        </div>
        <BaseButton class="w-full" variant="green" :text="$t('show_more')" />
      </div>
    </div>
  </LayoutWrapperWithSide>
</template>
<script setup lang="ts">
import { platforms, projectCards, residentTabList } from '~/data'

const route = useRoute()
const { t } = useI18n()
const activeTab = ref('projects')
const single = computed(() =>
  platforms.find((item) => item.id === +route.params.id)
)

const data = ref({
  telegram: 'https://t.me/+998997581231',
  facebook: 'https://facebook.com/#',
  instagram: 'https://instagram.com/#',
})

const breadcrumbs = computed(() => [
  {
    title: t('page.resident.title'),
    link: '/residents',
  },
  {
    title: single.value?.company_name,
    link: '/residents/' + route.params.id,
  },
])

watch(activeTab, (value) => {
  if (value === 'about') {
    navigateTo('/residents/about')
  } else if (value === 'projects') {
    navigateTo('/residents/project')
  } else if (value === 'comment') {
    navigateTo('/residents/comment')
  } else if (value === 'contact') {
    navigateTo('/residents/contact')
  }
})
</script>
