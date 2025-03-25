<template>
  <LayoutWrapperWithSide
    has-breadcrumbs
    :menu="breadcrumbs"
    has-left
    left-side-style="!basis-[0%] lg:!basis-1/4"
    main-style="!basis-[100%] lg:!basis-3/4"
    right-side-style="!basis-[0%] lg:!basis-1/4"
    class="pb-16 pages"
  >
    <template #title>
      <div>
        <h1 class="text-4xl font-extrabold leading-130 text-brand-black mb-6">
          {{ $t('events.title') }}
        </h1>
      </div>
    </template>
    <div class="flex gap-3 items-start">
      <FormInputSearch
        v-model="searchQuery"
        :placeholder="$t('enter_search')"
        class="mb-4 w-full"
      />
      <div
        class="p-2.5 rounded-[10px] bg-gray-500 block lg:hidden cursor-pointer"
        @click="show = true"
      >
        <i-filter
          class="text-xl text-gray-500 group-hover:text-primary transition-300"
        />
      </div>
    </div>
    <template #left>
      <MainSocialSidebar
        class="max-lg:hidden"
        :form="form"
        @clear="clearForm"
      />
    </template>
    <div
      v-if="socialList?.total_records > 0"
      class="flex-y-center justify-between my-5"
    >
      <div class="text-sm font-medium leading-130 text-gray-700">
        {{ socialList?.total_records }} {{ $t('events.short_btn') }}
      </div>
      <div class="flex-y-center gap-1 cursor-pointer group">
        <p
          class="text-sm font-semibold leading-130 text-brand-black group-hover:text-primary transition-300"
          @click="orderChange"
        >
          {{ $t('sort') }}
        </p>
        <i-arrows-sort
          class="text-sm font-semibold leading-130 text-gray-700 !mb-0 group-hover:text-primary transition-300"
        />
      </div>
    </div>
    <section v-if="!loading && socialList?.records">
      <div v-if="socialList?.total_records > 0" class="space-y-6">
        <MainSocialCard
          v-for="(item, index) in socialList?.records"
          :key="index"
          v-bind="{ item }"
        />
      </div>
      <CommonNoData
        v-else
        :title="$t('no_projects')"
        :subtitle="$t('no_interested_projects')"
      />
    </section>
    <div v-else>
      <MainSocialCardLoading v-for="i in 3" :key="i" />
    </div>
    <div
      v-if="socialList?.total_records > 3"
      class="flex-y-center justify-end mt-4"
    >
      <CommonPagination
        pagination-buttons
        :limit="socialList?.page_size"
        :total="socialList?.total_records"
        :current-page="socialList?.page"
        @input="pageChange"
      />
    </div>
    <CommonModal :title="$t('filter')" :show="show" @close="closeModal">
      <div class="pt-0">
        <MainSocialSidebar :form="form" @clear="clearForm" />
      </div>
    </CommonModal>
  </LayoutWrapperWithSide>
</template>

<script setup lang="ts">
import useQueryChange from '~/composables/useQueryChange'
import { useProjectStore } from '~/store/projects'
import { debounce } from '~/utils'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const form = useForm(
  {
    from: route.query?.from || null,
    to: route.query?.to || null,
    region: route.query?.region || '',
    city: route.query?.city || '',
  },
  {}
)

function clearForm() {
  form.values.from = null
  form.values.to = null
  form.values.region = ''
  form.values.city = ''
}

const searchQuery = ref(route.query.search || '')
const order = ref(false)
const loading = computed(() => useProjectStore().loading)

const paginationData = reactive({
  limit: 3,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

function pageChange(page: number) {
  paginationData.currentPage = page
  useQueryChange('page', '' + page)
  socialStore.fetchSocialEvents(
    paginationData,
    searchQuery.value,
    form?.values,
    order.value
  )
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

const socialList = computed(() => socialStore.socialEvents)
const socialStore = useProjectStore()
socialStore.fetchSocialEvents(
  paginationData,
  searchQuery.value,
  form?.values,

  order.value
)
const show = ref(false)
const closeModal = () => {
  show.value = false
}

function orderChange() {
  order.value = !order.value
  socialStore.fetchSocialEvents(
    paginationData,
    searchQuery.value,
    form?.values,
    order.value
  )
}

watch(
  () => searchQuery.value,
  () => {
    debounce(
      'search',
      () => {
        router.replace({
          query: { ...route.query, search: searchQuery.value || undefined },
        })
        socialStore
          .fetchSocialEvents(
            paginationData,
            searchQuery.value,
            form?.values,
            order.value
          )
          .finally(() => {})
      },
      300
    )
  }
)
watch(
  form.values,
  () => {
    debounce(
      'form',
      () => {
        router.replace({
          query: {
            ...route.query,
            from: form?.values.from || undefined,
            to: form?.values.to || undefined,
            region: form?.values.region || undefined,
            city: form?.values.city || undefined,
          },
        })
        socialStore.fetchSocialEvents(
          paginationData,
          searchQuery.value,
          form?.values,
          order.value
        )
      },
      300
    )
  },
  { deep: true }
)
useSeoMeta({
  title: t('social_projects'),
  description: 'social title',
  ogTitle: 'social',
  ogDescription: 'social title',
  twitterTitle: 'social',
  twitterDescription: 'social title',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})

const breadcrumbs = [
  {
    title: t('events.title'),
    link: '',
  },
]
</script>
