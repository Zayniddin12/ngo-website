<template>
  <main v-if="showSection" class="bg-[#F1F1F2] py-8 md:py-16">
    <div
      class="container mx-auto w-full flex items-end justify-between md:py-10"
    >
      <CommonSectionHeaderTitle
        wrapper-class="w-full md:w-2/4"
        :title="$t('news.title')"
        title-class="text-black max-sm:text-2xl"
        :subtitle="$t('news.subtitle')"
      />
      <BaseButton
        class="hidden md:block !py-2 !px-6 !text-sm !font-bold !leading-none"
        variant="greenBorder"
        hover-classes="!px-6 !py-2"
        :text="$t('news.button')"
        @click="navigateTo('/news')"
      >
        <template #suffix>
          <i-arrow-right class="!mb-0 text-2xl" />
        </template>
      </BaseButton>
    </div>
    <div class="container">
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 space-y-4 gap-0 md:gap-6 md:space-y-0"
      >
        <CommonCardNews
          v-for="(card, idx) in news?.slice(0, 1)"
          :key="idx"
          class="lg:block hidden"
          :card="card"
          :loading="loading"
          card-category
          is-view
        />
        <CommonCardNewsMain
          v-for="(item, idx) in news?.slice(1, 2)"
          :key="idx"
          class="md:!col-span-2"
          :loading="loading"
          :data="item"
        />

        <CommonCardNews
          v-for="(cards, idx) in news?.slice(2, 3)"
          :key="idx"
          :card="cards"
          :loading="loading"
          is-view
          card-category
        />
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 md:mt-6 gap-4 lg:gap-6"
      >
        <div v-for="(mainNews, idx) in news?.slice(3, 7)" :key="idx">
          <CommonCardNewsMainCards
            is-small
            :loading="loading"
            :data="mainNews"
          />
        </div>
      </div>
      <BaseButton
        class="md:hidden !py-2 !px-6 !text-sm !font-bold !leading-none mt-6 w-full"
        variant="greenBorder"
        hover-classes="!px-6 !py-2"
        :text="$t('news.button')"
        @click="navigateTo('/news')"
      >
        <template #suffix>
          <i-arrow-right class="!mb-0 text-2xl" />
        </template>
      </BaseButton>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { useHomeStore } from '~/store/home'
import type { INewsData } from '~/types/'

const loading = ref(true)

const showSection = ref(true)
const homeStore = useHomeStore()
const news = ref<INewsData[]>([])

onMounted(() => {
  homeStore
    .fetchNews()
    .then((data: any) => {
      news.value = data
      showSection.value = data?.length > 0
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<!--commit -->
