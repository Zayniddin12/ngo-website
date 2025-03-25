<template>
  <section v-if="showSection" class="mt-10 md:mt-16">
    <div class="container flex-y-center justify-between">
      <CommonSectionHeaderTitle
        :title="$t('reviews.title')"
        :subtitle="$t('reviews.subtitle')"
      />
      <MainCardSharh class="hidden md:block" />
    </div>
    <div class="bg-gradient-to-t from-[#EFF1EF] to-transparent mt-6">
      <div class="space-y-7 overflow-hidden">
        <div class="container">
          <template v-if="isLoading">
            <span
              class="shimmer !bg-[#edeef1] w-full h-[38px] rounded-10 mb-[10px]"
            />
          </template>

          <BaseTabFull
            v-else
            v-model="activeTab"
            :list="
              feedbackTags.map((item) => ({
                label: item.name,
                value: item.id,
              }))
            "
            class="mb:0 md:mb-6"
            wrapper-class="!p-0.5 !rounded-xl !border-2 !border-white bg-white/10 overflow-auto"
            active-class="!rounded-10 !border-2 !border-white/30 !bg-primary"
            active-items-class="!rounded-10 !text-white"
          />
        </div>
        <div class="space-y-0 md:space-y-9 pb-10 md:pb-14">
          <NuxtMarquee auto-fill pause-on-hover :speed="60" class="py-2">
            <div class="flex-y-center justify-center space-x-4 gap-4 mr-8">
              <CommonCardSharhLoading v-if="isLoading || filterLoading" />
              <div
                v-for="(item, key) in feedbacks"
                v-else
                :key
                class="space-x-1 !w-fit h-full"
              >
                <CommonCardSharh :item />
              </div>
            </div>
          </NuxtMarquee>

          <NuxtMarquee
            direction="right"
            auto-fill
            pause-on-hover
            :speed="60"
            class="py-2"
          >
            <div class="flex-y-center justify-center space-x-4 gap-4 mr-8">
              <CommonCardSharhLoading v-if="isLoading || filterLoading" />
              <div
                v-for="(item, key) in feedbacks"
                v-else
                :key
                class="space-x-1 !w-fit h-full"
              >
                <CommonCardSharh :item />
              </div>
            </div>
          </NuxtMarquee>
          <div class="md:hidden flex-x-center px-4 !mt-4">
            <MainCardSharh />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHomeStore } from '~/store/home'
import type { IFeedback, IFeedbackTag } from '~/types'

const homeStore = useHomeStore()
const feedbackTags = ref<IFeedbackTag[]>([])
const feedbacks = ref<IFeedback[]>([])
const isLoading = ref(true)
const showSection = ref(true)
const filterLoading = ref(false)
const activeTab = ref()

watch(activeTab, (newValue) => {
  filterLoading.value = true
  homeStore
    .fetchFeedbacks({ filterByCategoryId: newValue })
    .then((data) => {
      feedbacks.value = data
      showSection.value = data?.length > 0
    })
    .finally(() => {
      filterLoading.value = false
      isLoading.value = false
    })
})

onMounted(() => {
  homeStore.fetchFeedbackTags().then((tags) => {
    feedbackTags.value = tags
    activeTab.value = tags[0]?.id ?? 1
  })
})
</script>
