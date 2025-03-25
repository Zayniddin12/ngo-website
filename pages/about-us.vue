<template>
  <div class="about-us">
    <MainSectionMainAbout />
    <MainSectionDevelopment />

    <MainSectionOurServicesGrid />
    <div class="bg-white md:py-16 py-8">
      <LayoutWrapperFull>
        <template #title>
          <CommonSectionHeaderTitle
            :title="$t('our_activities_title')"
            title-class="max-[500px]:text-2xl"
            :subtitle="$t('our_activities_subtitle')"
          />
        </template>
        <template #headerContent>
          <BaseButton
            v-if="false"
            variant="greenBorder"
            text="Полная статистика"
            class="md:block hidden"
          ></BaseButton>
        </template>
        <div>
          <div ref="counterRef">
            <MainSectionNumberOfProjects
              v-if="!loadingNumber"
              v-bind="{ isVisible }"
              :projects="projects"
              section-style="divide-x"
              quality-style="!text-brand-black"
              text-style="!text-gray-700"
              class="border border-solid border-gray-500 rounded-20 bg-white max-md:hidden"
            />
            <MainSectionNumberOfProjectsMobile
              v-if="!loadingNumber"
              :projects="projects"
              class="md:hidden my-16"
              v-bind="{ isVisible }"
              quality-style="!text-brand-black"
              text-style="!text-gray-700"
              card-style="w-px h-20 bg-gradient-to-b from-transparent via-brand-black/20 to-transparent"
            />
          </div>
        </div>
        <BaseButton
          v-if="false"
          variant="greenBorder"
          text="Полная статистика"
          class="block md:hidden"
        ></BaseButton>
      </LayoutWrapperFull>
    </div>
    <div>
      <common-section-header-title
        :title="$t('our_team_title')"
        :subtitle="$t('our_team_subtitle')"
        class="text-center md:mb-10 md:mt-16 my-7"
      />

      <MainSectionOurTeam :team="ourTeam" class="md:mb-16 mb-8" />
    </div>

    <CommonSectionSendQuestion social-data />
    <MainSectionPartnerPartners />
  </div>
</template>
<script setup lang="ts">
import { useAboutStore } from '~/store/about'
import { useHomeStore } from '~/store/home'
import { IProjectNumbers } from '~/types'

const { t } = useI18n()
const isVisible = ref(false)
const counterRef = ref<HTMLElement | null>(null)
const homeStore = useHomeStore()
const loadingNumber = ref(true)
const projects = ref<IProjectNumbers[] | undefined>([])
const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true
    if (observer) {
      observer.disconnect()
    }
  }
}

let observer: IntersectionObserver | null = null
const ourTeam = computed(() => aboutStore.ourTeam)
const aboutStore = useAboutStore()
aboutStore.fetchOurTeam()
onMounted(() => {
  homeStore
    .fetchSupportStatisticNumbers()
    .then((data) => {
      projects.value = data?.map((item) => {
        return {
          title: item.name,
          quantity: item.count,
        }
      })
    })
    .finally(() => {
      loadingNumber.value = false
    })
  observer = new IntersectionObserver(handleIntersect)
  if (counterRef.value) {
    observer.observe(counterRef.value)
  }
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

useSeoMeta({
  title: t('about_us'),
  description: 'about us title',
  ogTitle: 'about us',
  ogDescription: 'about us title',
  twitterTitle: 'about us',
  twitterDescription: 'about us title',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
<style scoped>
@media screen and (min-width: 1024px) {
  .about-us {
    margin-top: -30px !important;
  }
}
@media screen and (max-width: 900px) {
  .about-us {
    margin-top: -30px !important;
  }
}
</style>
