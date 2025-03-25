<template>
  <div class="pb-10 md:pb-16 pages">
    <LayoutWrapperWithSide :menu="breadcrumbs" has-breadcrumbs has-right>
      <template #right>
        <CommonCardSideCards has-youth has-volunteer class="hidden md:block" />
      </template>
      <CommonCardLoadingNewsSingle v-if="loading" />
      <div>
        <h1
          class="text-brand-black font-extrabold leading-130 text-lg md:text-4xl"
        >
          {{ list?.title }}
        </h1>
        <span class="bg-gray-500 hidden md:block h-0.5 mt-4 mb-3" />
        <div class="flex justify-between items-center">
          <div
            class="flex-y-center text-sm leading-140 font-medium text-[#757D83]"
          >
            <i-calendar-event1 class="text-xl" />
            <p>
              {{
                dayjs(list?.date)
                  .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
                  .format('DD MMMM, YYYY HH:mm')
              }}
            </p>
          </div>

          <div
            v-if="list?.view_count"
            class="flex-y-center gap-2 text-[#757D83]"
          >
            <i-eye class="text-xl text-gray-600" />
            <p class="font-semibold leading-130 text-sm">
              {{ list?.view_count }}
            </p>
          </div>
        </div>
        <div>
          <div v-if="list?.image?.length > 0" class="my-6">
            <NuxtImg
              class="rounded-2xl h-[495px] w-full"
              :src="list?.image[0]?.image"
              alt="image"
            />
          </div>
          <div class="static-text">
            <div v-html="replaceSrcInDescription(list?.description)" />
            <!--            <NewsSwiper :photos="list?." />-->
          </div>
          <ClientOnly>
            <div
              v-if="list?.link"
              class="z-[1] w-full h-[210px] md:h-[495px] cursor-pointer my-0 md:mb-6"
            >
              <iframe
                width="100%"
                height="100%"
                :src="`https://www.youtube.com/embed/${convertToEmbed(
                  list?.link
                )}?autoplay=0&mute=1&controls=0`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                class="rounded-2xl"
              />
            </div>
          </ClientOnly>
          <CommonHashtag
            class="mb-10 mt-6 justify-center md:justify-start"
            :list="list?.tag"
          />
          <CommonPageActions />
        </div>
      </div>
    </LayoutWrapperWithSide>
    <div class="container">
      <div
        class="flex justify-between items-center mt-10 md:mt-16 mb-3 md:mb-4"
      >
        <h1
          class="text-brand-black text-2xl md:text-4xl font-extrabold leading-130 mb-3 md:mb-0"
        >
          {{ $t('news_the_topic') }}
        </h1>
        <BaseButton
          class="hidden md:block w-max !py-2 !px-6 !text-sm !font-bold !leading-none"
          variant="greenBorder"
          :text="$t('all_news')"
          size="sm"
          @click="navigateTo('/news')"
        >
          <template #suffix>
            <i-arrow-right class="!mb-0 text-2xl" />
          </template>
        </BaseButton>
      </div>
      <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
        <CommonCardNews
          v-for="(cards, idx) in listNews?.slice(0, 4)"
          :key="idx"
          :card="cards"
          :loading="loading"
        />
      </div>
      <BaseButton
        class="block md:hidden w-full mt-6 !py-2 !px-6 !text-sm !font-bold !leading-none"
        variant="greenBorder"
        :text="$t('all_news')"
        size="sm"
        @click="navigateTo('/news')"
      >
        <template #suffix>
          <i-arrow-right class="!mb-0 text-2xl" />
        </template>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useNewsStore } from '~/store/news'
import { convertToEmbed } from '~/utils'

const route = useRoute()
const { t } = useI18n()
const loading = ref(true)
const newsStore = useNewsStore()

const list = computed(() => newsStore.news)

const id = Number(route.params.slug)
const listNews = computed(() =>
  newsStore.singleNews?.filter((item) => item.id !== id)
)

if (id) {
  newsStore.fetchNewsSingle(id).then(() => {
    loading.value = false
  })
}

newsStore.fetchSingleNews().then(() => {
  loading.value = false
})

const breadcrumbs = computed(() => [
  { title: t('news.title'), link: '/news' },
  {
    title: list?.value?.title,
    link: '/',
  },
])

const replaceSrcInDescription = (description) => {
  if (!description) return ''
  return description.replaceAll('src="', 'src="https://nnt.ihma.uz/')
}

useSeoMeta({
  title: list?.value?.title,
  description: list?.value?.title,
  ogTitle: list?.value?.title,
  ogDescription: list?.value?.title,
  twitterTitle: list?.value?.title,
  twitterDescription: list?.value?.title,
  ogImage: list.value?.image?.splice(0, 1) || '/og.png',
  twitterImage: '/og.png',
})
</script>
