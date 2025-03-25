<template>
  <div class="pb-10 md:pb-16 pages">
    <div class="container">
      <BaseBreadcrumb :breadcrumb="menu" />
      <div class="md:flex justify-between items-center mt-0 md:mt-3 md:mb-6">
        <h1
          class="text-brand-black text-2xl md:text-4xl font-extrabold leading-130 mb-3 md:mb-0"
        >
          {{ $t('news.title') }}
        </h1>
        <FormInputSearch
          v-model="searchQuery"
          input-class="!border !border-gray-500 !py-2.5 !px-3 h-max md:w-[379px]"
          icon-class="!mb-0"
          :placeholder="$t('enter_search')"
        />
      </div>
      <div
        v-if="list?.records?.length"
        class="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
      >
        <CommonCardNews
          v-for="(item, idx) in list?.records"
          :key="idx"
          :is-view="false"
          :card-category="false"
          :card="item"
        />
      </div>
      <div
        v-else-if="loading"
        class="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5"
      >
        <CommonCardLoadingNews v-for="idx in 8" :key="idx" />
      </div>

      <CommonNoData
        v-else
        image="/svg/noData/no_news.svg"
        :title="$t('no_news')"
        :subtitle="$t('no_news_subtitle')"
      />

      <div
        v-if="list.total_records > 10"
        class="flex-y-center justify-end mt-4 md:mt-8"
      >
        <CommonPagination
          pagination-buttons
          :limit="list.page_size"
          :total="list.total_records"
          :current-page="list.page"
          @input="pageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

import useQueryChange from '~/composables/useQueryChange'
import { useNewsStore } from '~/store/news'
import { debounce } from '~/utils'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const searchQuery = ref(route.query.search || '')
const loading = ref(true)
const menu = [
  {
    title: t('news.title'),
    link: '/news',
  },
]

const paginationData = reactive({
  limit: 10,
  currentPage: route.query.page ? +route.query.page : 1,
  total: 0,
})

function pageChange(page: number) {
  paginationData.currentPage = page
  useQueryChange('page', '' + page)
  fetchNews()
  if (process.client) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
}

const store = useNewsStore()

const fetchNews = () => {
  store.fetchNews(paginationData, searchQuery.value).then(() => {
    paginationData.total = store.news.total_records
    loading.value = false
  })
}

const list = computed(() => store.news)

fetchNews()

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
        fetchNews()
      },
      300
    )
  }
)
</script>
