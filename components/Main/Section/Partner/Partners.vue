<template>
  <div v-if="showSection" class="overflow-x-hidden">
    <div class="container text-center md:py-16 py-8">
      <CommonSectionHeaderTitle
        wrapper-class="!space-y-2 md:!space-y-3 "
        :title="$t('partners_title')"
        title-class="text-[32px] max-sm:text-2xl font-extrabold leading-130"
        subtitle-class="text-base font-medium leading-tight"
        :subtitle="$t('partners_subtitle')"
      />

      <Transition name="fade" mode="out-in">
        <div :key="loading">
          <MainSectionPartnerLoading v-if="loading" />

          <div
            v-if="width > 900 && !loading"
            class="grid grid-cols-4 lg:grid-cols-5 gap-6 mt-10 mb-6"
          >
            <a
              v-for="(item, index) of partners"
              :key="index"
              target="_blank"
              :href="item.link"
              class="group transition-300 h-[100px] w-[170px] cursor-pointer flex justify-center px-2 items-center rounded-2xl border border-transparent hover:shadow-some hover:border-gray hover:bg-white"
            >
              <CommonImage
                :src="item?.image"
                alt="logo"
                class="grayscale max-[530px]:!w-20 max-[530px]:!h-8 transition-300 group-hover:grayscale-0"
                image-class="!min-w-7 max-w-22 !max-h-20"
              />
            </a>
          </div>
        </div>
      </Transition>

      <div v-if="width < 900 && !loading">
        <client-only>
          <CommonMarquee
            img-style="min-h-9 w-full !max-w-[177px] !h-auto !object-contain max-w-[100px]"
            class="mt-6 mb-8 md:my-10 !w-screen"
            :items="partners.map((p) => ({ image_url: p.image }))"
          />
          <CommonMarquee
            direction="right"
            class="!w-screen"
            img-style="min-h-9 !w-full !h-auto !object-contain max-w-[100px]"
            :items="partners.map((p) => ({ image_url: p.image }))"
          />
        </client-only>
      </div>
      <BaseButton
        v-if="partners.length > 10"
        variant="green"
        :text="$t('show_more')"
        class="w-full"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useWindowSize } from '@vueuse/core'

import { useAboutStore } from '~/store/about'
import type { IPartners } from '~/types'

const loading = ref(true)
const partners = ref<IPartners<any>[]>([])
const showSection = ref(true)
const aboutStore = useAboutStore()

onMounted(() => {
  aboutStore
    .fetchPartners()
    .then((res) => {
      partners.value = res
      showSection.value = partners.value.length > 0
    })
    .finally(() => {
      loading.value = false
    })
})

const { width } = useWindowSize()
</script>
<style scoped></style>

<!--commit-->
