<template>
  <div>
    <div
      class="bg-brand-black text-white h-10 py-px hidden min-[900px]:flex min-[900px]:flex-y-center"
    >
      <div class="flex items-center container mx-auto justify-between">
        <CommonLang />
        <ul
          class="flex cursor-pointer flex-row gap-4 text-white/60 text-xs font-medium leading-none"
        >
          <li class="transition-300 hover:text-primary cursor-pointer">
            <NuxtLink to="/contact-us">
              {{ $t('feedback') }}
            </NuxtLink>
          </li>
          <li
            class="transition-300 hover:text-primary cursor-pointer"
            @click="scrollToReviews('/#sharh-reviews')"
          >
            {{ $t('reviews.title') }}
          </li>
          <li
            class="transition-300 hover:text-primary cursor-pointer"
            @click="scrollToReviews('/#form-to-send-question')"
          >
            {{ $t('appeal_to_the_director') }}
          </li>
        </ul>

        <div>
          <ul v-if="contanctInfoData?.length" class="flex items-center gap-6">
            <li>
              <a
                :href="`tel:${contanctInfoData[0]?.phone}`"
                class="gap-2 flex items-center text-white text-xs font-medium leading-none transition-300 hover:text-primary cursor-pointer"
              >
                <i-phone class="!m-0 text-base text-primary" />
                {{ formatPhoneNumber(contanctInfoData[0]?.phone) }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${contanctInfoData[0]?.email}`"
                class="gap-2 flex items-center text-white text-xs font-medium leading-none transition-300 hover:text-primary cursor-pointer"
              >
                <i-mail class="!m-0 text-base text-primary" />
                {{ contanctInfoData[0]?.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bg-white flex items-center">
      <div class="container flex items-center justify-between">
        <div
          class="flex items-center md:gap-4 lg:gap-16 min-[1150px]:gap-32 max-[900px]:py-6"
        >
          <div>
            <NuxtLink to="/">
              <img
                v-if="$i18n.locale === 'ru'"
                :src="`/logos/logo-dark.svg`"
                alt="Logo"
                class="max-[1150px]:w-[150px]"
              />
              <img
                v-else
                :src="`/logos/logo-${$i18n.locale}-dark.svg`"
                alt="Logo"
                class="max-[1150px]:w-[150px]"
              />
            </NuxtLink>
          </div>
          <div class="max-[900px]:hidden">
            <div
              class="flex flex-row max-[1150px]:gap-2 gap-4 text-black text-xs font-medium leading-none py-6"
              @mouseleave="unHoverChild"
            >
              <nuxt-link
                v-for="(item, index) in menu"
                :key="index"
                class="flex items-base gap-1 py-2 px-3 rounded-lg transition-300 hover:bg-gray cursor-pointer group"
                :class="{
                  'bg-gray': activeLink == item?.title,
                }"
                :to="item?.link ?? '#'"
                @mouseenter="hoverChild(item?.children, item?.title)"
              >
                <p
                  class="text-sm font-medium leading-130 text-brand-black group-hover:text-primary transition-300"
                  :class="{
                    'text-primary': activeLink == item?.title,
                  }"
                >
                  {{ $t(item.title) }}
                </p>
                <i-chevron-right
                  v-if="item?.children?.length"
                  class="icon text-xl text-info-500 group-hover:text-primary relative rotate-90 group-hover:-rotate-90 transition-300"
                  :class="{
                    '!-rotate-90 text-primary': activeLink == item?.title,
                  }"
                />
              </nuxt-link>
              <CollapseTransition>
                <div
                  v-if="
                    showChildren &&
                    activeChild?.length &&
                    activeLink == 'residents'
                  "
                  class="bg-white w-full -translate-y-4 z-1 left-0 right-0 top-[100%] p-6 rounded-2xl max-w-[644px] mx-auto absolute border border-brand-black/10 shadow-headerModal"
                  @mouseenter="hoverChild(activeChild, activeLink)"
                >
                  <p
                    class="font-bold text-sm leading-130 overflow-ellipsis text-gray-700 mb-5"
                  >
                    {{ $t(activeLink) }}
                  </p>
                  <div class="grid grid-cols-2 gap-2">
                    <div
                      v-for="(item, index) in resident.records"
                      :key="index"
                      class="p-2 w-full flex items-center gap-2 transition-300 hover:bg-gray cursor-pointer rounded-lg active:scale-95"
                      @click="
                        navigateTo(
                          item?.slug ? `/${activeLink}/${item.slug}` : '#'
                        ),
                          unHoverChild()
                      "
                    >
                      <CommonImage
                        :src="item?.image"
                        class="rounded-full max-w-[50px] max-h-[50px]"
                      />
                      <div>
                        <div class="flex items-center gap-2">
                          <p
                            class="text-dark 2xl:text-base text-xs font-bold leading-130 transition-300 !cursor-pointer"
                          >
                            {{ item?.name }}
                          </p>
                          <div class="flex-center gap-1">
                            <i-star
                              class="text-warning leading-130 2xl:text-base text-xs"
                            />
                            <span
                              class="text-xs font-medium leading-130 text-gray-700"
                              >{{ item?.project_count }}</span
                            >
                          </div>
                        </div>
                        <p
                          class="text-xs font-medium leading-130 text-gray-700 mt-1"
                        >
                          {{ item?.date }}
                        </p>
                      </div>
                    </div>
                    <NuxtLink
                      to="/residents"
                      class="!text-brand-black p-2 w-full flex items-center gap-2 transition-300 hover:bg-gray cursor-pointer rounded-lg active:scale-95"
                      @click="showChildren = false"
                    >
                      <div
                        v-if="
                          resident?.total_records - resident.records.length > 0
                        "
                        class="w-[50px] h-[50px] rounded-full bg-gray flex-center"
                      >
                        <CommonImage
                          src="/logos/resident.svg"
                          class="rounded-full max-w-[50px] max-h-[50px]"
                        />
                      </div>
                      <i18n-t
                        scope="global"
                        keypath="more_resident_135"
                        tag="span"
                        class="!text-brand-black text-sm font-semibold leading-130"
                      >
                        <template #number>
                          <span
                            class="text-brand-black text-sm font-semibold leading-130"
                          >
                            {{
                              resident?.total_records - resident.records.length
                            }}
                          </span>
                        </template>
                      </i18n-t>
                    </NuxtLink>
                  </div>
                </div>
              </CollapseTransition>
              <CollapseTransition>
                <div
                  v-if="
                    showChildren &&
                    activeChild?.length &&
                    activeLink == 'projects'
                  "
                  :class="{ 'max-w-[860px]': activeCategories }"
                  class="bg-white overflow-hidden transition-300 flex -translate-y-4 z-1 left-0 right-0 top-[100%] rounded-2xl max-w-[380px] mx-auto absolute border border-brand-black/10 shadow-headerModal"
                  @mouseenter="hoverChild(activeChild, activeLink)"
                  @mouseleave="unHoverCategory"
                >
                  <div class="block p-6 !w-[380px]">
                    <div
                      v-for="(item, index) in projectTabList()"
                      :key="index"
                      class="flex justify-between gap-14 !w-[350px] items-center mb-3 p-2 group hover:bg-gray cursor-pointer rounded-lg transition-300"
                      :class="{
                        'bg-gray': currentCat == item?.id,
                      }"
                      @mouseenter="hoverCategory(item?.label, item?.value)"
                      @click="
                        navigateTo(item?.id ? `/${item?.value}` : '#'),
                          unHoverChild()
                      "
                    >
                      <div class="flex items-center gap-2">
                        <div
                          class="rounded-lg p-2 bg-gray group-hover:bg-primary transition-300"
                        >
                          <component
                            :is="`i-${item?.icon}`"
                            class="text-2xl text-primary group-hover:!text-white transition-300"
                          />
                        </div>

                        <div class="block">
                          <h3
                            class="text-brand-black text-sm font-bold line-clamp-1 leading-130 overflow-ellipsis transition-300 group-hover:text-primary mb-1"
                            :class="{
                              'text-primary': currentCat == item?.id,
                            }"
                          >
                            {{ $t(item?.value) }}
                          </h3>
                          <h2
                            class="overflow-ellipsis text-xs font-medium leading-130 text-gray-700"
                          >
                            {{
                              $t('project', {
                                count:
                                  item?.value == 'projects'
                                    ? projectData?.social_project?.total_count
                                    : item?.value == 'subsidies'
                                    ? projectData?.gov_subsidy_project
                                        ?.total_count
                                    : projectData?.gov_grant_project
                                        ?.total_count,
                              })
                            }}
                          </h2>
                        </div>
                      </div>
                      <div class="w-8 h-8">
                        <i-arrow-right
                          class="!text-2xl w-8 text-primary"
                        ></i-arrow-right>
                      </div>
                    </div>
                  </div>
                  <CollapseTransition>
                    <div
                      v-if="showCategory"
                      class="p-6 bg-gray w-full rounded-r-2xl overflow-hidden"
                    >
                      <p
                        class="text-sm font-bold overflow-ellipsis leading-130 text-gray-700 mb-3 whitespace-nowrap truncate"
                      >
                        {{ $t('category') }}
                      </p>
                      <div class="grid grid-cols-2 gap-6 mb-6 overflow-hidden">
                        <div
                          v-for="(item, index) in activeCategories"
                          :key="index"
                          class="p-2 rounded-10 transition-300 overflow-hidden duration-300 hover:bg-gray-500 cursor-pointer group"
                          @click="navigatePage(currentCat, item?.id)"
                        >
                          <h3
                            class="text-brand-black whitespace-nowrap truncate overflow-ellipsis text-sm font-samibold leading-130 transition-300 group-hover:text-primary mb-1"
                          >
                            {{ item?.name }}
                          </h3>
                          <p
                            class="text-xs whitespace-nowrap font-medium leading-140 text-gray-700"
                          >
                            {{
                              t('project', {
                                count: item?.count,
                              })
                            }}
                          </p>
                        </div>
                      </div>
                      <div class="flex justify-end">
                        <BaseButton
                          variant="green"
                          size="sm"
                          :text="$t('show_more')"
                          @click="showMore(currentCat)"
                        />
                      </div>
                    </div>
                  </CollapseTransition>
                </div>
              </CollapseTransition>
            </div>
          </div>
        </div>

        <a target="_blank" :href="linker?.one_id_url">
          <BaseButton
            class="max-[900px]:hidden !py-2"
            variant="success"
            :text="$t('login')"
          >
            <template #suffix>
              <i-login class="text-2xl !mb-0"></i-login>
            </template>
          </BaseButton>
        </a>

        <i-burger
          class="max-[900px]:block hidden text-2xl"
          @click="$emit('update:modelValue', true)"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { defineProps } from 'vue'

import { projectTabList } from '~/data'
import { useContactStore } from '~/store/contact'
import { useHomeStore } from '~/store/home'
import { useProjectStore } from '~/store/projects'

interface Props {
  menu?: any
  openMenu?: boolean
}

defineProps<Props>()

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const { t } = useI18n()

const showChildren = ref(false)
const activeChild = ref()
const activeLink = ref()
const activeCategories = ref<any>()
const currentCat = ref()
const showCategory = ref(false)
const hoverChild = (children?: any[], item?: any) => {
  activeLink.value = item
  activeChild.value = children
  showChildren.value = true
}
const hoverCategory = (
  categories?: string | undefined,
  currentCategory?: string
) => {
  if (currentCategory == 'projects') {
    activeCategories.value = projectData.value?.social_project?.categories
  } else if (currentCategory == 'subsidies') {
    activeCategories.value = projectData.value?.gov_subsidy_project?.categories
  } else {
    activeCategories.value = projectData.value.gov_grant_project?.categories
  }
  currentCat.value = currentCategory
  showCategory.value = true
}
const unHoverCategory = () => {
  activeCategories.value = null
  showCategory.value = false
  currentCat.value = null
}
const unHoverChild = () => {
  showChildren.value = false
  activeChild.value = null
  activeLink.value = null
}

const contanctInfoData = computed(() => useContact.contacts)
const projectData = computed(() => useProject.projects)
const useContact = useContactStore()
const useProject = useProjectStore()
useContact.fetchContacts()
const resident = computed(() => homeStore.headerResPlatform)
const homeStore = useHomeStore()
homeStore.fetchResidentPlatform(undefined, undefined, undefined, true, false)
useProject.fetchHeaderProjects()

function showMore(category: string) {
  navigateTo(`/${category}`)
  showChildren.value = false
}

const scrollToReviews = (value: string) => useRouter().push(value)

const { data: linker } = useAsyncData(async () => {
  const res = await homeStore.fetchOneId()
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})
function navigatePage(categ: string, id: string) {
  window.location.href = `/${categ}?category=${id}`
}
</script>
<style>
.router-link-active p {
  @apply !text-primary;
}

.router-link-active .icon {
  @apply !text-primary;
}
</style>
