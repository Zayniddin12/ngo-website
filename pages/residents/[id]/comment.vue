<template>
  <div class="space-y-4 w-full pages">
    <h3 class="text-2xl text-brand-black font-bold leading-130">
      {{ $t('sharh_comment') }}
    </h3>
    <div v-if="!loading && commentsData?.length" class="space-y-4">
      <CommonCardResidentSharh
        v-for="(comment, key) in commentsData"
        :key
        :item="comment"
      />
      <BaseButton
        v-if="
          comments.total_records > 10 &&
          page < Math.ceil(comments.total_records / 10)
        "
        class="w-full"
        variant="green"
        :text="$t('show_more')"
        @click="page++"
      />
      <BaseButton
        v-else-if="
          comments.total_records > 10 &&
          page > Math.ceil(comments.total_records / 10)
        "
        class="w-full"
        variant="green"
        :text="$t('show_less')"
        @click="loadLess"
      />
    </div>
    <div v-else-if="loading" class="space-y-3 w-full">
      <div
        v-for="key in 4"
        :key
        class="h-full w-full flex-y-center justify-center"
      >
        <CommonCardResidentSharhLoading />
      </div>
    </div>
    <CommonSectionNoData
      v-else
      image="/svg/noData/no_comments.svg"
      :title="$t('no_comment_yet')"
      :subtitle="$t('no_comment_yet_appear')"
    />
  </div>
</template>

<script setup lang="ts">
import { useResidentsStore } from '@/store/residents'
import type { IComment, IComments } from '~/types'

const residentsStore = useResidentsStore()

const comments = ref<IComments>()
const commentsData = ref<IComment[]>([])
const loading = computed(() => residentsStore.loading)
const page = ref(1)

onMounted(async () => {
  fetchComments(page.value)
})

watch(
  () => page.value,
  async () => {
    await fetchComments(page.value)
    await nextTick()
    scrollTo({
      top: commentsData.value?.length * 120,
      left: 0,
      behavior: 'smooth',
    })
  }
)

async function fetchComments(page) {
  const { data } = await useAsyncData('resident-single-comments', () =>
    residentsStore.fetchResidentComments(useRoute().params.id, page)
  )

  comments.value = data.value
  commentsData.value.push(...data.value.records)
}

async function loadLess() {
  page.value = 1
  await fetchComments(page.value)
  commentsData.value = comments.value.records
}
</script>
