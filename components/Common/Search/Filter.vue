<template>
  <div class="container">
    <ClientOnly>
      <BaseTabFull
        v-model="activeTab"
        :list="tabs"
        class="!rounded-b-none mx-8 !rounded-10 max-sm:!w-[93%] max-md:!w-[90%] max-md:mx-auto !border-b-[3px]"
        active-items-class="!rounded-10 !text-brand-black !rounded-b-none !border-primary"
        active-class="!rounded-10 !rounded-b-none border-b-2 border-primary-500 !h-full !border-b-[3px] !border-primary"
        wrapper-class="!p-0 bg-white/30 overflow-hidden max-sm:!w-[95%]"
        item-class="text-white/60 max-md:w-full !text-[10px] sm:!text-sm !font-bold !leading-130"
        divider-class="!bg-white/10 !mx-0"
        show-divider
      />
    </ClientOnly>
    <div
      class="sm:py-6 py-2 sm:px-8 px-3 gap-3 grid grid-cols-12 bg-gray-500 sm:rounded-20 rounded-10"
    >
      <div
        ref="searchResults"
        class="basis-3/5 relative transition-300 sm:col-span-7 col-span-9"
      >
        <FormInputSearch
          v-model="search"
          placeholder="Поиск"
          class="!bg-white w-full !border border-gray-200"
        />
        <Transition name="fade" mode="in-out">
          <CommonSearchSuggestion
            v-if="search"
            class="transition-100"
            :search="search"
            :items="searchResultValues"
            :is-loading="isLoading"
            :link="activeTabLink"
          />
        </Transition>
      </div>
      <div class="w-full sm:col-span-5 col-span-3 h-full">
        <FormSelect
          v-model="selectedCategory"
          class="!bg-white w-full basis-2/5 rounded-xl h-full !border border-gray-200 focus:!border-primary"
          selected-option-styles="!py-1.5 !px-3 max-md:!gap-0"
          :options="[
            { name: $t('default_select'), id: 0 },
            ...projectCategories,
          ]"
          display-value-label-class="max-sm:hidden"
          options-class="max-sm:min-w-[300px] max-sm:!-right-0 max-sm:!-translate-x-0 max-sm:!translate-y-1"
          label-key="name"
          value-key="id"
        >
          <template #prefix>
            <i-layout-grid-add />
          </template>
          <template #suffix>
            <i-layout-grid-add />
          </template>
        </FormSelect>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IDefaultResponse } from '~/types'

interface ISearchResults {
  id?: number
  title?: string
  description?: string
  image?: string
}

interface ICategory {
  id?: number
  name?: string
}

const { t } = useI18n()

const tabs = ref([
  {
    label: t('socials'),
    value: 'social_projects',
  },
  {
    label: t('grand_and_subsidies'),
    value: 'grand_and_subsidies',
  },
  {
    label: t('events.short_btn'),
    value: 'events',
  },
])

const search = ref<string>('')
const debouncedSearchTerm = useDebounce(search, 1000)
const isOpenSuggestion = ref(false)
const activeTab = ref('social_projects')
const selectedCategory = ref<number>(0)
const searchResults = ref()
const searchResultValues = ref<ISearchResults[]>([])
const isLoading = ref(false)

interface IFetchFn {
  query: string
  model: string
  fields: string
  filter: any
  type?: string
  categoryId?: number
}

const activeTabLink = computed(() =>
  activeTab.value === 'events' ? 'social' : 'projects'
)

const projectCategories = ref<ICategory[]>([])
const isLoadingCategories = ref(false)

const fetchProjectCategories = async () => {
  isLoadingCategories.value = true

  try {
    const res = await useApi().$get<IDefaultResponse<ICategory>>(
      'send_request',
      {
        params: {
          model: 'resident.project.category',
          fields: 'id,name',
        },
      }
    )

    projectCategories.value = res.records
  } catch (error) {
    return error
  } finally {
    isLoadingCategories.value = false
  }
}

const fetchSearchResults = async ({
  query,
  model,
  filter,
  fields,
  categoryId,
}: IFetchFn) => {
  if (query.trim() === '') {
    searchResultValues.value = []
    return
  }

  if (categoryId && categoryId !== 0) {
    if (model === 'resident.event') {
      filter.push(['project.category', '=', categoryId])
    } else {
      filter.push(['category', '=', categoryId])
    }
  }

  isLoading.value = true
  const res = await useApi().$get<IDefaultResponse<any>>('send_request', {
    params: {
      model,
      fields,
      filter: JSON.stringify(filter),
    },
  })

  searchResultValues.value = res.records.map((item) => ({
    id: item.id,
    title: item.name || item.title,
    description: item.description,
    image: Array.isArray(item.image_url) ? item.image_url[0] : item.image,
    slug: item.slug,
    type: item.type ?? 'events',
  }))
  isLoading.value = false
}

const fetchEvents = (query: string) => {
  fetchSearchResults({
    query,
    model: 'resident.event',
    fields: 'title,description,image,slug',
    filter: [['title', 'ilike', query]],
    categoryId: selectedCategory.value,
  })
}

const fetchGrantAndSubsidyProject = (query: string) => {
  fetchSearchResults({
    query,
    model: 'resident.project',
    fields: 'name,description,image,type',
    filter: [
      ['type', 'in', ['gov_grant_project', 'gov_subsidy_project']],
      ['name', 'ilike', query],
    ],
    categoryId: selectedCategory.value,
  })
}

const fetchSocialProject = (query: string) => {
  fetchSearchResults({
    query,
    model: 'resident.project',
    fields: 'name,description,image,type',
    filter: [
      ['type', '=', 'social_project'],
      ['name', 'ilike', query],
    ],
    categoryId: selectedCategory.value,
  })
}

onClickOutside(searchResults, () => {
  search.value = ''
})

watch(search, (newSearchTerm) => {
  isLoading.value = !!newSearchTerm
})

watch(debouncedSearchTerm, (newSearchTerm) => {
  if (newSearchTerm) isOpenSuggestion.value = true

  switch (activeTab.value) {
    case 'events':
      fetchEvents(newSearchTerm)
      break
    case 'grand_and_subsidies':
      fetchGrantAndSubsidyProject(newSearchTerm)
      break
    case 'social_projects':
      fetchSocialProject(newSearchTerm)
      break
  }
})

watch(activeTab, () => {
  searchResultValues.value = []
  isOpenSuggestion.value = false
})

onMounted(async () => {
  await fetchProjectCategories()
})
</script>

<style scoped></style>
