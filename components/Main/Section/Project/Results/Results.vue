<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="showSection" ref="resultSection" class="overflow-hidden">
    <CommonModal
      :title="$t('share_title')"
      :show="showModal"
      icon-wrapper-class="!bg-transparent cursor-pointer"
      header-style="py-4 px-5"
      custom-class="max-w-[378px]"
      header-wrapper-class="border-b border-[#ECECEC]"
      @close="closeModal"
    >
      <div class="py-5 px-5">
        <div class="flex items-center justify-between gap-5">
          <div class="social-icon-wrapper" @click="shareSocial('telegram')">
            <span>
              <i-telegram />
            </span>
          </div>
          <div class="social-icon-wrapper" @click="shareSocial('facebook')">
            <span>
              <i-facebook />
            </span>
          </div>
          <div class="social-icon-wrapper relative group" @click="copyURL()">
            <span>
              <i-copy />
            </span>
            <BaseTooltip
              class="!text-black !bg-white group-hover:opacity-100 group-hover:visible"
            >
              {{ isCopied ? $t('copied') : $t('copy') }}
            </BaseTooltip>
          </div>
        </div>
      </div>
    </CommonModal>
    <LayoutWrapperFull class="container py-8 lg:py-16">
      <template #title>
        <CommonSectionHeaderTitle
          :title="$t('result_of_project_title')"
          :subtitle="$t('result_of_project_subtitle')"
          subtitle-class="w-4/5"
          title-class="max-sm:text-2xl"
        />
      </template>
      <template #headerContent>
        <BaseButton
          :text="$t('all_project')"
          variant="greenBorder"
          class="max-[900px]:hidden !py-2 !px-6 !text-sm !font-bold !leading-none"
          @click="navigateTo('/projects')"
        >
          <template #suffix
            ><i-arrow-right class="text-xl text-brand-black" />
          </template>
        </BaseButton>
      </template>
      <div
        v-if="!responsiveSlider && !loading"
        class="grid grid-cols-3 min-[1090px]:grid-cols-4 gap-6"
      >
        <div
          v-for="(item, index) in completedProjects"
          :key="index"
          class="rounded-20 group relative mt-3 transition-300 cursor-pointer hover:shadow-platformHover hover:-translate-y-2 border border-gray-500"
          @click="navigateTo(getHrefUrl(item?.type, item?.id))"
        >
          <BaseButton
            v-if="item?.main_tag?.name"
            :text="`#${item?.main_tag?.name}`"
            variant="green"
            size="sm"
            class="!px-3 !absolute left-5 top-0 -translate-y-1/2 z-10"
          />
          <div
            class="absolute right-4 top-4 p-2 rounded-md bg-white opacity-0 transition-300 group-hover:opacity-100"
            @click.stop="openModal(item.id, item.type, item.name)"
          >
            <i-share class="text-primary text-lg" />
          </div>
          <CommonImage
            :src="item?.image"
            alt="img"
            class="rounded-t-20 w-full h-[206px] object-cover"
          />
          <div class="p-4 bg-white rounded-b-20">
            <h3
              class="text-brand-black text-lg font-extrabold leading-130 overflow-ellipsis transition-300 group-hover:text-primary mb-2 line-clamp-2"
            >
              {{ item?.name }}
            </h3>
            <p
              class="text-sm font-medium leading-140 text-ellipsis line-clamp-2 text-gray-700 transition-300 group-hover:text-brand-black mb-5"
              v-html="item?.description"
            />
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-2">
                <div
                  class="p-[6px] rounded-md bg-gray transition-300 group-hover:bg-primary-500"
                >
                  <i-money-peper
                    class="text-lg text-gray-600 transition-300 group-hover:text-primary"
                  />
                </div>
                <div>
                  <p
                    class="text-sm font-bold truncate text-brand-black leading-140"
                  >
                    {{ formatNumberSpace(item?.price) }}
                  </p>
                  <p
                    class="text-xs font-normal text-gray-700 leading-140 uppercase"
                  >
                    uzs
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="p-[6px] rounded-md bg-gray transition-300 group-hover:bg-primary-500"
                >
                  <i-briefcase
                    class="text-lg text-gray-600 transition-300 group-hover:text-primary"
                  />
                </div>

                <div>
                  <p
                    class="text-sm font-bold truncate text-brand-black leading-140"
                  >
                    {{ item?.organization || '0' }}
                  </p>
                  <p class="text-xs font-normal text-gray-700 leading-140">
                    {{ $t('results_project.organizations') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="responsiveSlider && !loading">
        <Swiper
          space-between="20"
          :slides-per-view="'auto'"
          class="!overflow-visible"
        >
          <SwiperSlide
            v-for="(item, index) in completedProjects"
            :key="index"
            class="min-[580px]:max-w-[380px] min-[480px]:max-w-[380px] max-w-[320px] h-full"
          >
            <div
              class="rounded-20 group relative mt-3 transition-300 cursor-pointer hover:shadow-platformHover border border-gray-500 block"
              @click="navigateTo(getHrefUrl(item?.type, item?.id))"
            >
              <BaseButton
                v-if="item?.main_tag?.name"
                :text="`#${item?.main_tag?.name}`"
                variant="green"
                size="sm"
                class="!px-3 !absolute left-5 top-0 -translate-y-1/2"
              />
              <div
                class="absolute right-6 top-6 p-2 rounded-md bg-white opacity-0 transition-300 group-hover:opacity-100"
                @click.stop="openModal(item.id, item.type, item.name)"
              >
                <i-share class="text-primary text-lg" />
              </div>
              <img
                :src="item?.image"
                alt="img"
                class="rounded-t-20 w-full h-[206px] object-cover"
              />
              <div class="p-4 bg-white rounded-b-20">
                <h3
                  class="text-brand-black text-lg font-extrabold leading-130 overflow-ellipsis transition-300 group-hover:text-primary mb-2 line-clamp-2"
                >
                  {{ item?.name }}
                </h3>
                <p
                  class="text-sm !font-medium leading-140 text-ellipsis line-clamp-2 text-gray-700 transition-300 group-hover:text-brand-black mb-5"
                  v-html="item?.description"
                />
                <div class="flex justify-between items-center">
                  <div class="flex items-center gap-2">
                    <div
                      class="p-[6px] rounded-md bg-gray transition-300 group-hover:bg-primary-500"
                    >
                      <i-money-peper
                        class="text-lg text-gray-600 transition-300 group-hover:text-primary"
                      />
                    </div>
                    <div>
                      <p
                        class="text-sm font-bold truncate text-brand-black leading-140"
                      >
                        {{ formatNumberSpace(item?.price) }}
                      </p>
                      <p
                        class="text-xs font-normal text-gray-700 leading-140 uppercase"
                      >
                        uzs
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <div
                      class="p-[6px] rounded-md bg-gray transition-300 group-hover:bg-primary-500"
                    >
                      <i-briefcase
                        class="text-lg text-gray-600 transition-300 group-hover:text-primary"
                      />
                    </div>

                    <div>
                      <p
                        class="text-sm font-bold truncate text-brand-black leading-140"
                      >
                        {{ item?.organization || '0' }}
                      </p>
                      <p class="text-xs font-normal text-gray-700 leading-140">
                        организаций
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
        <BaseButton
          :text="$t('all_project')"
          variant="outline-primary"
          class="mt-6 w-full"
          @click="navigateTo('/projects/results')"
        >
          <template #suffix><i-arrow-right /> </template>
        </BaseButton>
      </div>
    </LayoutWrapperFull>
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div v-if="loading" class="container">
          <MainSectionProjectResultsLoading />
        </div>
      </div>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import 'swiper/css'

import { useIntersectionObserver, useWindowSize } from '@vueuse/core'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useHomeStore } from '~/store/home'
import type { IComplectedProject, TProjectType } from '~/types'
import { share } from '~/utils'

const resultSection = ref(null)
const sectionVisible = ref(false)
const homeStore = useHomeStore()
const completedProjects = ref<IComplectedProject[]>([])
const showSection = ref(true)
const { width } = useWindowSize()
const projectLink = ref('')
const shareTitle = ref('')
const responsiveSlider = ref(false)
const loading = ref(true)
useIntersectionObserver(resultSection, ([{ isIntersecting }]) => {
  sectionVisible.value = isIntersecting
})
const showModal = ref(false)
const isCopied = ref(false)

const closeModal = () => {
  showModal.value = false
  projectLink.value = ''
  shareTitle.value = ''
}

const openModal = (id: string | number, type: TProjectType, name: string) => {
  showModal.value = true
  shareTitle.value = name
  let result
  switch (type) {
    case 'gov_subsidy_project':
      result = `subsidies/${id}`
      break
    case 'gov_grant_project':
      result = `grants/${id}`
      break
    case 'social_project':
      result = `projects/${id}`
      break
    default:
      result = `projects/${id}`
  }
  projectLink.value = result
}

const getHrefUrl = (type?: TProjectType, id?: number) => {
  let result
  switch (type) {
    case 'gov_subsidy_project':
      result = `/subsidies/${id}/results`
      break
    case 'gov_grant_project':
      result = `/grants/${id}/results`
      break
    case 'social_project':
      result = `/projects/${id}/results`
      break
    default:
      result = `/projects/${id}/results`
  }
  return result
}

const shareSocial = (social: 'telegram' | 'instagram' | 'facebook') => {
  if (projectLink.value) {
    if (social === 'instagram') {
      share(social, '')
    } else {
      share(social, shareTitle.value, projectLink.value)
    }
  }
}

const copyURL = async () => {
  try {
    await navigator.clipboard.writeText(
      window.location.href + projectLink.value
    )
    isCopied.value = true
  } catch (er) {
    console.error(er)
  } finally {
    setTimeout(() => {
      isCopied.value = false
    }, 3000)
  }
}

watch(
  sectionVisible,
  (newValue) => {
    if (newValue) {
      homeStore
        .fetchCompletedProjects()
        .then((data) => {
          completedProjects.value = data
          showSection.value = data.length > 0
        })
        .finally(() => {
          loading.value = false
        })
    }
  },
  { once: true }
)

onMounted(() => {
  if (width.value < 900) {
    responsiveSlider.value = true
  }
})
</script>

<style scoped>
.social-icon-wrapper {
  cursor: pointer;
  width: 54px;
  height: 54px;
  border: 1px solid #f5f7f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.social-icon-wrapper svg {
  font-size: 24px;
}

.social-icon-wrapper span {
  width: 36px;
  height: 36px;
  background: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
