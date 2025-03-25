<template>
  <div>
    <div class="container text-center md:py-10 py-5">
      <div class="max-w-[1030px] mx-auto flex flex-col items-center">
        <i18n-t
          scope="global"
          keypath="mission_with"
          tag="p"
          class="text-primary text-2xl md:text-[32px] lg:text-[40px] font-extrabold leading-130 container"
        >
          <template #mission_with_title>
            <span class="text-brand-black">{{ $t('mission_with_title') }}</span>
          </template>
        </i18n-t>
        <p
          class="text-brand-black text-base font-medium leading-140 text-center mt-5"
        >
          {{ $t('mission_about') }}
        </p>
      </div>
      <StoriesMenuSlider class="mt-6 md:mt-10 mb-6" />
      <div class="max-w-[1030px] mx-auto">
        <CommonHashtag
          :is-loading="loading"
          class="my-4 md:my-5"
          :list-with-slug="
            missionTags.map((t) => ({ name: t.name, slug: t.slug! }))
          "
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home'

const homeStore = useHomeStore()

const loading = computed(() => homeStore.loading)
const missionTags = computed(() => homeStore.missionTags)

homeStore.fetchMissionTags()
</script>
