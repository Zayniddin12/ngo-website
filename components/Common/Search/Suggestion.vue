<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    id="search-results"
    class="absolute top-12 p-4 transition-300 bg-white w-full h-fit max-h-96 rounded-2xl space-y-4 shadow-primary border border-gray-500 overflow-auto"
  >
    <template v-if="isLoading">
      <div v-for="i in 2" :key="i" class="flex gap-4">
        <span
          class="shimmer shrink-0 !bg-[#edeef1] w-16 h-[50px] rounded-xl mb-4"
        />
        <div class="w-full">
          <span
            class="shimmer shrink-0 !bg-[#edeef1] w-full h-[26px] rounded-sm mb-1"
          />
          <span
            class="shimmer shrink-0 !bg-[#edeef1] w-full h-[20px] rounded-sm mb-1"
          />
        </div>
      </div>
    </template>
    <template v-else-if="items?.length && items.length > 0">
      <div
        v-for="(item, key) in items"
        :key
        class="flex-y-center gap-4 relative"
        :class="{ 'cursor-pointer': !!link }"
        @click="
          handleRouteClick(
            item.type!,
            item.type === 'events' ? item?.slug! : item.id!
          )
        "
      >
        <img
          :src="item?.image ?? '/images/defaultImg-for-project.svg'"
          class="w-16 h-[50px] rounded-xl shrink-0 object-cover"
          alt="search result"
        />
        <div>
          <Highlighter
            highlight-class-name="bg-[#EDB716] rounded"
            class="text-xl font-extrabold leading-relaxed text-brand-black line-clamp-1"
            :search-words="[search ?? '']"
            :text-to-highlight="item?.title"
          />
          <p
            class="text-sm font-medium leading-tight text-gray-700 line-clamp-1"
            v-html="item?.description"
          />
        </div>
        <div class="absolute w-4/5 -bottom-2 right-0 h-px bg-gray-500"></div>
      </div>
    </template>
    <p v-else class="text-sm font-medium leading-tight text-gray-700">
      {{ $t('not_found_from_search') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import Highlighter from 'vue-highlight-words'

type SearchResult =
  | 'gov_grant_project'
  | 'gov_subsidy_project'
  | 'social_project'
  | 'events'

interface Props {
  search?: string
  items?: {
    id?: number
    title?: string
    description?: string
    image?: string
    type?: SearchResult
  }[]
  isLoading?: boolean
  link?: string
}

const props = defineProps<Props>()

const router = useRouter()

const handleRouteClick = (type: SearchResult, id: number | string) => {
  if (props.link) {
    let result
    switch (type) {
      case 'social_project':
        result = 'projects'
        break
      case 'gov_grant_project':
        result = 'grants'
        break
      case 'gov_subsidy_project':
        result = 'subsidies'
        break
      case 'events':
        result = 'social'
        break
      default:
        result = 'projects'
    }

    router.push(`/${result}/${id}`)
  }
}
</script>

<style scoped>
.shadow-primary {
  box-shadow: 0 3.46px 2.21px 0 #00000002, 0 8.31px 5.32px 0 #00000003,
    0 15.65px 10.02px 0 #00000004, 0 27.92px 17.87px 0 #00000005,
    0 52.22px 33.42px 0 #00000005, 0 125px 80px 0 #00000008;
}

#search-results::-webkit-scrollbar {
  display: none;
}

#search-results {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
