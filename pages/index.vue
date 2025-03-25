<template>
  <main class="body">
    <MainSectionHero />
    <CommonSearchFilter class="-mt-20 relative z-10" />
    <MainSectionSupportMission />

    <client-only>
      <LazyMainSectionSliderOurServices
        v-show="!serviceData"
        @loading="ourServiceLoading"
      />
    </client-only>
    <div v-if="serviceData">
      <MainSectionSliderLoadingOurService />
    </div>

    <LazyMainSectionProjectAnouncements /> <MainSectionProjectResults />
    <client-only> <LazyMainSectionEvents /> </client-only>
    <LazyMainSectionSliderGrands />
    <LazyMainSectionPlatform />
    <MainSectionSliderLoadingResidents v-if="residentData" />
    <MainSectionSliderResidents
      v-show="!residentData"
      @loading="residentLoading"
    />
    <LazyMainSectionInfoDetail class="" />
    <LazyMainSectionOrganization />
    <div ref="counterRef">
      <LazyMainSectionSupport v-bind="{ isVisible }" />
    </div>
    <LazyMainSectionNews />
    <LazyMainSectionStatistics />
    <LazyCommonSectionSendQuestion />
    <LazyMainSectionReviews id="sharh-reviews" />
    <MainSectionPartnerPartners />
  </main>
</template>

<script setup lang="ts">
const serviceData = ref(true)

function ourServiceLoading(value: boolean) {
  serviceData.value = value
}

const eventsData = ref(true)

function eventsLoading(value: boolean) {
  eventsData.value = value
}

const residentData = ref(true)

function residentLoading(value: boolean) {
  residentData.value = value
}

const isVisible = ref(false)
const counterRef = ref<HTMLElement | null>(null)

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  if (entries[0].isIntersecting) {
    isVisible.value = true
    if (observer) {
      observer.disconnect()
    }
  }
}

let observer: IntersectionObserver | null = null

onMounted(() => {
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
</script>
