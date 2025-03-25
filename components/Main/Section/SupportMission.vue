<template>
  <section class="container mx-auto py-10 md:my-0">
    <div
      class="flex flex-col-reverse md:flex-row justify-between gap-5 items-center"
    >
      <div class="md:w-[504px]">
        <i18n-t
          scope="global"
          keypath="mission_with"
          tag="p"
          class="text-primary text-2xl gl:text-[32px] font-extrabold leading-130"
        >
          <template #mission_with_title>
            <span class="text-brand-black">{{ $t('mission_with_title') }}</span>
          </template>
        </i18n-t>

        <CommonHashtag
          :is-loading="loading"
          class="my-4 md:my-5"
          :list-with-slug="
            missionTags.map((t) => ({ name: t.name, slug: t.link! }))
          "
        />
        <p
          class="text-brand-black text-sm md:text-base leading-140 font-medium"
        >
          {{ $t('support_text') }}
        </p>
        <div class="flex gap-4 mt-8 md:mt-9">
          <NuxtLink to="/projects" class="">
            <BaseButton
              class="!py-2 !px-6 !text-sm !font-bold !leading-none"
              variant="green"
              :text="$t('projects')"
            >
              <template #suffix>
                <i-rocket class="text-2xl !mb-0" />
              </template>
            </BaseButton>
          </NuxtLink>
          <BaseButton
            class="!py-2 !px-6 !text-sm !font-bold !leading-none"
            variant="greenBorder"
            :text="$t('about_us_btn')"
            @click="navigateTo('/about-us')"
          >
            <template #suffix>
              <i-arrow-right class="text-2xl" />
            </template>
          </BaseButton>
        </div>
      </div>
      <div>
        <CommonImage
          alt="image"
          src="/vidoes/Flag.gif"
          class="lg:h-[503px] lg:w-[479px] w-[280px] h-[280px]"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useHomeStore } from '~/store/home'

const homeStore = useHomeStore()

const loading = computed(() => homeStore.loading)
const missionTags = computed(() => homeStore.missionTags)

homeStore.fetchMissionTags()
</script>
