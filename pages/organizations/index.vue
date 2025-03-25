<template>
  <LayoutWrapperWithSide
    class="pages"
    :menu="breadcrumbs"
    has-breadcrumbs
    has-right
  >
    <template #title>
      <h1
        class="text-brand-black font-extrabold leading-130 text-2xl md:text-4xl mb-6"
      >
        {{ $t('org.title') }}
      </h1>
    </template>

    <template #right>
      <CommonCardSideCards has-youth has-volunteer />
    </template>
    <div class="pb-8 md:pb-16">
      <FormInputSearch
        v-model="searchQuery"
        input-class="!border !border-gray-500 !py-2.5 !px-3"
        icon-class="!mb-0"
        :placeholder="$t('enter_search')"
      />

      <div class="flex-y-center justify-between my-6">
        <p class="text-sm font-medium leading-130 text-gray-700">
          {{ t('resident_count', { count: paginationData.total }) }}
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

      <div v-if="loading" class="space-y-4 mt-10">
        <div v-for="(org, key) in 5" :key>
          <CommonCardOrganizationLoading :data="org" />
        </div>
      </div>
      <div
        v-else-if="!loading && organization?.records.length > 0"
        class="space-y-4 mt-10"
      >
        <template v-for="(org, key) in organization?.records" :key>
          <CommonCardOrganization :data="org" />
        </template>
        <div
          v-if="organization?.total_records > 7"
          class="flex-y-center justify-end"
        >
          <CommonPagination
            pagination-buttons
            :limit="organization?.page_size"
            :total="organization?.total_records"
            :current-page="organization?.page"
            @input="pageChange"
          />
        </div>
      </div>
      <div v-else class="space-y-4 mt-10 text-center">
        <CommonNoData
          image="/svg/noData/no_resident.svg"
          :title="$t('no_organizations')"
          :subtitle="$t('no_organizations_subtitle')"
        />
      </div>
    </div>
  </LayoutWrapperWithSide>
</template>
<script setup lang="ts">
import useQueryChange from '~/composables/useQueryChange'
import { useOrganizationStore } from '~/store/organization'
import { debounce } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const searchQuery = ref(route.query.search || '')
const loading = ref(true)
const breadcrumbs = [
  {
    title: t('org.title'),
    link: '/organizations',
  },
]

const organizationStore = useOrganizationStore()

const paginationData = reactive({
  limit: 10,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

function pageChange(page: number) {
  paginationData.currentPage = page
  useQueryChange('page', '' + page)
  fetchOrganizations()
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

const fetchOrganizations = () => {
  organizationStore
    .fetchOrganizations(paginationData, searchQuery.value)
    .then(() => {
      paginationData.total = organizationStore.organizations.total_records
      loading.value = false
    })
}

const organization = computed(() => organizationStore.organizations)

fetchOrganizations()

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
        fetchOrganizations()
      },
      300
    )
  }
)

const order = ref(false)
function orderChange() {
  order.value = !order.value
  organizationStore
    .fetchOrganizations(paginationData, searchQuery.value)
    .then(() => {
      paginationData.total = organizationStore.organizations.total_records
      loading.value = false
    })
}
useSeoMeta({
  title: t('org.title'),
  description: 'subsidies title',
  ogTitle: 'subsidies',
  ogDescription: 'subsidies title',
  twitterTitle: 'subsidies',
  twitterDescription: 'subsidies title',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
