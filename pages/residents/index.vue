<template>
  <LayoutWrapperWithSide
    left-side-style="!basis-[0%] lg:!basis-1/4"
    main-style="!basis-[100%] lg:!basis-3/4"
    right-side-style="!basis-[0%] lg:!basis-1/4"
    :menu="breadcrumbs"
    has-breadcrumbs
    has-left
    :make-reverse="isMobile"
    class="pb-16 pages"
  >
    <template #title>
      <h1
        class="text-brand-black font-extrabold leading-130 text-2xl md:text-4xl mb-3 lg:mb-6"
      >
        {{ $t('page.resident.title') }}
      </h1>
    </template>
    <template #left>
      <div class="space-y-4 hidden lg:block">
        <ResidentsFilter :form="form" @clear="clearForm" />
        <CommonCardSideCards has-youth has-volunteer class="" />
      </div>
    </template>
    <div>
      <div class="flex-y-center gap-3">
        <FormInputSearch
          v-model="searchQuery"
          class="w-full"
          input-class="!border !border-gray-500 !py-2.5 !px-3"
          icon-class="!mb-0"
          :placeholder="$t('enter_search')"
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
      <div
        v-if="resident?.records?.length > 3"
        class="flex-y-center justify-between my-5"
      >
        <p class="text-sm font-medium leading-130 text-gray-700">
<!--          <span> {{ $t('find') }}:</span>-->
          {{ t('resident_count', { count: resident?.total_records }) }}
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
            class="text-xl text-gray-700 !mb-0 group-hover:text-primary transition-300"
          />
        </div>
      </div>
      <div class="space-y-4">
        <div v-if="!loading && resident?.records">
          <CommonCardPlatformCards
            v-if="resident?.records?.length"
            :horizontal="!isMobile"
            :list="resident?.records"
          />
          <CommonNoData
            v-else
            :title="$t('no_residents')"
            :subtitle="$t('no_inetersted_resident')"
          />
        </div>
        <CommonCardPlatformLoading
          v-else
          :horizontal="!isMobile"
          class="mt-10"
        />
        <div
          v-if="resident?.total_records >= 10"
          class="flex-y-center justify-end"
        >
          <CommonPagination
            pagination-buttons
            :limit="resident?.page_size"
            :total="resident?.total_records"
            :current-page="resident?.page"
            @input="pageChange"
          />
        </div>
      </div>
    </div>
    <CommonModal :title="$t('filter')" :show="show" @close="closeModal">
      <div class="pt-0">
        <ResidentsFilter :form="form" @clear="clearForm" />
      </div>
    </CommonModal>
  </LayoutWrapperWithSide>
</template>
<script setup lang="ts">
import {
  breakpointsTailwind,
  useBreakpoints,
  useWindowSize,
} from '@vueuse/core'

import useQueryChange from '~/composables/useQueryChange'
import { useHomeStore } from '~/store/home'
import { debounce } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const searchQuery = ref(route.query.search || '')
const loading = computed(() => useHomeStore().loading)
const order = ref(false)
function orderChange() {
  order.value = !order.value
  homeStore.fetchResidentPlatform(
    paginationData,
    searchQuery.value,
    form?.values,
    false,
    order.value
  )
}
const breadcrumbs = [
  {
    title: t('page.resident.title'),
    link: '/residents',
  },
]

const form = useForm(
  {
    region: route.query.region || '',
    birthDate: route.query.date || '',
  },
  {}
)
function clearForm() {
  form.values.region = ''
  form.values.birthDate = ''
}

const { width } = useWindowSize()

const isMobile = ref(false)

const paginationData = reactive({
  limit: 3,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

function pageChange(page: number) {
  paginationData.currentPage = page
  useQueryChange('page', '' + page)
  homeStore.fetchResidentPlatform(
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
watch(width, () => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})

const resident = computed(() => homeStore.residentPlatform)
const homeStore = useHomeStore()
homeStore.fetchResidentPlatform(
  paginationData,
  searchQuery.value,
  form?.values,
  false,
  order.value
)
const show = ref(false)
const closeModal = () => {
  show.value = false
}

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
        homeStore
          .fetchResidentPlatform(
            paginationData,
            searchQuery.value,
            form?.values,
            false,
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
            region: form?.values.region || undefined,
            date: form?.values.birthDate || undefined,
          },
        })
        homeStore
          .fetchResidentPlatform(
            paginationData,
            searchQuery.value,
            form?.values,
            false,
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
onMounted(() => {
  isMobile.value = useBreakpoints(breakpointsTailwind).smaller('md').value
})
useSeoMeta({
  title: t('page.resident.title'),
  description: 'residents title',
  ogTitle: 'residents',
  ogDescription: 'residents title',
  twitterTitle: 'residents',
  twitterDescription: 'residents title',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
