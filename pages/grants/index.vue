<template>
  <LayoutWrapperWithSide
    class="pages"
    left-side-style="!basis-[0%] lg:!basis-1/4"
    main-style="!basis-[100%] lg:!basis-3/4"
    right-side-style="!basis-[0%] lg:!basis-1/4"
    has-left
    :menu="breadcrumbsForProjects($t('project_announce_title'), '/grants')"
  >
    <template #title>
      <div>
        <h1
          class="text-2xl md:text-4xl font-extrabold leading-130 mb-3 md:mb-6"
        >
          {{ $t('project_announce_title') }}
        </h1>
        <BaseTabFull
          v-model="activeTab"
          :list="projectTabList()"
          class="mb-0 md:mb-6"
          show-divider
          wrapper-class="!p-0.5 !rounded-xl"
          active-class="!rounded-10"
          active-items-class="!rounded-10 !text-brand-black"
        />
      </div>
    </template>
    <template #left>
      <div class="space-y-6 max-lg:hidden">
        <ClientOnly>
          <ProjectsFilter :form="form" @clear="clearForm"
        /></ClientOnly>

        <CommonCardSideCards has-volunteer />
      </div>
    </template>
    <div>
      <div class="flex gap-3 items-start">
        <FormInputSearch
          v-model="searchQuery"
          input-class="!border !border-gray-500 !py-2.5 !px-3"
          icon-class="!mb-0 "
          class="mb-0 md:mb-6 w-full"
          :placeholder="$t('enter_search')"
        />
        <div
          class="lg:hidden p-2.5 rounded-10 bg-gray-500"
          @click="show = true"
        >
          <i-filter class="text-2xl text-white" />
        </div>
      </div>
      <div
        v-if="projectCards?.total_records > 1"
        class="items-center justify-between mb-5 hidden md:flex"
      >
        <p class="text-sm font-medium leading-130 text-gray-700">
          {{ projectCards?.total_records }} {{ t('projects_count') }}
        </p>
        <div
          class="flex-y-center gap-1 cursor-pointer group"
          @click="orderChange"
        >
          <p
            class="text-sm font-semibold leading-130 text-brand-black group-hover:text-primary transition-300"
          >
            {{ $t('sort') }}
          </p>
          <i-arrows-sort
            class="text-sm font-semibold leading-130 text-gray-700 !mb-0 group-hover:text-primary transition-300"
          />
        </div>
      </div>
      <section v-if="!loading && projectCards?.records" class="space-y-6">
        <div v-if="projectCards?.total_records > 0" class="space-y-6">
          <ProjectsCardGrants
            v-for="(project, key) in projectCards?.records"
            :key
            class="hidden md:block"
            :project="project"
            @click="navigateTo(`/grants/${project?.id}`)"
          />
          <ProjectsCardGrantsMobile
            v-for="(project, key) in projectCards?.records"
            :key
            class="block md:hidden"
            :project="project"
          />
        </div>
        <CommonNoData
          v-else
          :title="$t('no_projects')"
          :subtitle="$t('no_interested_projects')"
        />
      </section>
      <section v-else class="space-y-6">
        <ProjectsCardHorizantalLoading v-for="key in 5" :key />
      </section>
      <div
        v-if="projectCards?.total_records > 4"
        class="flex-y-center justify-end mt-6 pb-16"
      >
        <CommonPagination
          pagination-buttons
          :limit="projectCards?.page_size"
          :total="projectCards?.total_records"
          :current-page="projectCards?.page"
          @input="pageChange"
        />
      </div>
    </div>
    <CommonModal :title="$t('filter')" :show="show" @close="closeModal">
      <div class="pt-0">
        <ProjectsFilter :form="form" />
      </div>
    </CommonModal>
  </LayoutWrapperWithSide>
</template>

<script setup lang="ts">
import useQueryChange from '~/composables/useQueryChange'
import { breadcrumbsForProjects, projectTabList } from '~/data'
import { useProjectStore } from '~/store/projects'
import { debounce } from '~/utils'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const activeTab = ref('grants')
const loading = computed(() => useProjectStore().loading)
const searchQuery = ref(route.query.search || '')
const order = ref(false)

const show = ref(false)
const closeModal = () => {
  show.value = false
}

function orderChange() {
  order.value = !order.value
  grantsStore.fetchProjects(
    paginationData,
    searchQuery.value,
    form?.values,
    order.value
  )
}

const form = useForm(
  {
    price_from: route.query?.price_from || 0,
    price_to: route.query?.price_to || 1000000000,
    from: route?.query.from || '',
    to: route?.query.to || '',
    category: route.query?.category || '',
    status: route.query?.status || '',
    region: route.query?.region || '',
    city: route.query?.city || '',
    type: 'gov_grant_project',
  },
  {}
)

const paginationData = reactive({
  limit: 3,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

function pageChange(page: number) {
  paginationData.currentPage = page
  useQueryChange('page', '' + page)
  grantsStore.fetchProjects(
    paginationData,
    searchQuery.value,
    form?.values,
    false,
    order.value
  )
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

const projectCards = computed(() => grantsStore.grants)
const grantsStore = useProjectStore()
grantsStore.fetchProjects(
  paginationData,
  searchQuery.value,
  form?.values,
  order.value
)

function clearForm() {
  form.values.price_from = ''
  form.values.price_to = ''
  form.values.from = ''
  form.values.to = ''
  form.values.category = ''
  form.values.status = ''
  form.values.region = ''
  form.values.city = ''
}

watch(activeTab, (value) => {
  if (value === 'projects') {
    navigateTo('/projects')
  } else if (value === 'grants') {
    navigateTo('/grants')
  } else if (value === 'subsidies') {
    navigateTo('/subsidies')
  }
})
watch(
  () => searchQuery.value,
  () => {
    loading.value = true
    debounce(
      'search',
      () => {
        router.replace({
          query: { ...route.query, search: searchQuery.value || undefined },
        })
        grantsStore
          .fetchProjects(
            paginationData,
            searchQuery.value,
            form?.values,
            order.value
          )
          .finally(() => {
            loading.value = false
          })
      },
      300
    )
  }
)
watch(
  form.values,
  () => {
    loading.value = true
    debounce(
      'form',
      () => {
        router.replace({
          query: {
            ...route.query,
            price_from: form?.values.region || undefined,
            price_to: form?.values.price_to || undefined,
            from: form?.values.from || undefined,
            to: form?.values.to || undefined,
            category: form?.values.category || undefined,
            status: form?.values.status || undefined,
            region: form?.values.region || undefined,
            city: form?.values.city || undefined,
            type: form?.values.type || undefined,
          },
        })
        grantsStore
          .fetchProjects(
            paginationData,
            searchQuery.value,
            form?.values,
            order.value
          )
          .finally(() => {
            loading.value = false
          })
      },
      300
    )
  },
  { deep: true }
)
useSeoMeta({
  title: t('project_announce_title'),
  description: 'grants title',
  ogTitle: 'grants',
  ogDescription: 'grants title',
  twitterTitle: 'grants',
  twitterDescription: 'grants title',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>

<style>
@media screen and (min-width: 900px) and (max-width: 1024px) {
  .pages {
    margin-top: 140px !important;
  }
}
</style>
