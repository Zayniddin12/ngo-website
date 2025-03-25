<template>
  <div>
    <div class="shadow-slider relative">
      <div
        class="hidden md:flex justify-between items-center top-1/2 -translate-y-1/2 absolute w-full z-3 px-14"
      >
        <p
          ref="prevButtonRef"
          class="bg-white p-2 rounded-[30px] border border-gray-500 cursor-pointer"
          @click="slidePrev"
        >
          <i-chevron-right class="rotate-180 text-[32px] text-brand-black" />
        </p>
        <p
          ref="nextButtonRef"
          class="bg-white p-2 rounded-[30px] border border-gray-500 cursor-pointer"
          @click="slideNext"
        >
          <i-chevron-right class="text-[32px] text-brand-black" />
        </p>
      </div>
      <swiper slides-per-view="auto" centered-slides @swiper="setThumbsSwiper">
        <template v-if="!loading">
          <swiper-slide
            v-for="(story, key) in stories"
            :key
            class="rounded-[12px] md:rounded-3xl rounded-t-[8px] rounded-b-[8px] md:rounded-t-[20px] md:rounded-b-[20px] !w-[96px] !h-[120px] md:!h-[214px] md:!w-[177px] p-[3px] cursor-pointer mr-2 md:mr-5"
            :class="story?.is_read ? 'bg-gray-200' : 'bg-primary'"
            @click="() => openUserStories(key)"
          >
            <div
              class="p-0.5 relative w-full h-full bg-white rounded-[6px] md:rounded-[18px]"
            >
              <div
                class="rounded-[6px] md:rounded-[18px] flex items-center justify-center w-full overflow-hidden h-full"
              >
                <CommonImage
                  :src="story?.image ?? '/images/defaultImg-for-project.svg'"
                  class="!h-full !w-full overflow-hidden rounded-[6px] md:rounded-[18px] !object-cover !object-center"
                />
              </div>
              <div
                class="absolute text-white text-xs md:text-base leading-130 font-semibold left-2 bottom-2 z-1"
              >
                <div class="w-full h-full relative">
                  <p class="absolute bottom-2 left-2 select-none">
                    {{ story?.name }}
                  </p>
                </div>
              </div>
            </div>
          </swiper-slide>
        </template>
        <template v-if="loading">
          <swiper-slide
            v-for="key in 6"
            :key
            class="rounded-[12px] md:rounded-3xl] rounded-t-[8px] rounded-b-[8px] md:rounded-t-[20px] md:rounded-b-[20px] !w-[96px] shimmer border-4 border-primary !h-[120px] md:!h-[214px] md:!w-[177px] p-[3px] cursor-pointer mr-2 md:mr-5"
          >
            <div class="drop__shadow relative">
              <div class="absolute bottom-0">
                <div class="w-16 h-4 rounded-lg skeleton"></div>
                <div class="w-12 h-4 rounded-lg skeleton"></div>
              </div>
            </div>
          </swiper-slide>
        </template>
      </swiper>
    </div>
    <div v-if="loading">
      <div class="flex flex-nowrap overflow-x-auto"></div>
    </div>
    <!-- Stories Slider -->
    <div class="story-swipers bg-red-500">
      <StoriesSlider
        v-if="storiesData?.length && showStory"
        :swiper="sw"
        :effect-cube="EffectCube"
        :enabled="false"
        :autoplay-duration="5000"
        @slides-indexes-change="onSlidesIndexesChange"
        @stories-slider="onStoriesSlider"
      >
        <Stories
          v-for="(userStories, idx) in stories"
          :key="idx"
          class="relative"
        >
          <Story
            v-for="item of userStories?.items"
            :key="item"
            user-link="#"
            :name="item?.name"
            :story="item"
            close-button
            :trigger="subIndexValue"
            @close-button-click="onCloseButtonClick"
            @show-more="showMore($event)"
            @story="handleStory"
          >
            <template #name>
              <h3 class="text-white !text-32 font-bold mt-7">
                {{ item?.name ?? '' }}
              </h3>
            </template>
            <template v-if="item">
              <template v-if="isImage(item.image)">
                <video
                  v-if="item"
                  :src="item.video ?? '/images/defaultImg-for-project.svg'"
                  :srcset="`${item?.video ?? '#'} 2x`"
                  playsinline
                  preload="metadata"
                  loading="lazy"
                />
              </template>
              <template v-else>
                <img
                  v-if="item"
                  :src="item.image ?? '/images/defaultImg-for-project.svg'"
                  :srcset="`${item ?? '#'} 2x`"
                  class="w-full h-full object-fill"
                  alt="story image"
                  loading="lazy"
                />
              </template>
              <div class="swiper-lazy-preloader"></div>
            </template>
            <CommonImage
              v-else
              :src="item?.image ?? '/images/defaultImg-for-project.svg'"
              error-state="/svg/logo_white.svg"
              class="!object-contain !object-center"
            />
          </Story>
        </Stories>
      </StoriesSlider>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'swiper/css'
import './stories-slider.css'
import './style.css'

import sw from 'swiper'
import { EffectCube } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import { useAboutStore } from '~/store/about'

import { storiesCount, test } from './shared'
import { Stories, StoriesSlider, Story } from './stories-slider-vue'
interface Props {
  imageUrl?: string
}

defineProps<Props>()

// const store = useStoriesStore()
const stories = computed(() => aboutStore.stories)
const aboutStore = useAboutStore()

aboutStore.fetchStories()

const loading = computed(() => aboutStore.loading)
const showStory = ref(false)

const imageFormats = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']

function isImage(url: string) {
  for (const format of imageFormats) {
    if (url.toLowerCase().endsWith(format)) {
      return true
    }
  }
  return false
}

// store.fetchStories()

const storiesSlider = ref<any>()

const activeStory = ref()
const prevButtonRef = ref(null)
const nextButtonRef = ref(null)
const userIdx = ref(0)
const mainIdx = ref(0)

const openUserStories = (userIndex: number) => {
  userIdx.value = userIndex
  showStory.value = true
  document.body.style.overflow = 'hidden'
  const videos = document?.querySelectorAll('video')

  Array.prototype.forEach.call(videos, function (video) {
    video.muted = false
  })
  setTimeout(() => {
    // add "in" class (used in demo for animated appearance)
    storiesSlider.value?.el?.classList.add('stories-slider-in')
    // enable slider (as we passed enabled: false initially)
    storiesSlider.value?.slideTo(userIndex, 0)
    storiesSlider.value?.enable()
    // slide to specific user's stories
  }, 300)
}

const onCloseButtonClick = () => {
  document.body.style.overflow = 'auto'
  storiesSlider.value?.disable()
  // add "out" class (used in demo for animated disappearance)
  storiesSlider.value?.el?.classList.add('stories-slider-out')
  showStory.value = false
  const videos = document?.querySelectorAll('video')

  Array.prototype.forEach.call(videos, function (video) {
    video.muted = true
  })
  // store.fetchStories()
  test.value = 1
}
const handleStory = (story: any) => {
  activeStory.value = story
}

// LAST STORY CLICKED next close story
watch(
  () => test.value,
  (val) => {
    if (val === 0) {
      onCloseButtonClick()
    }
  }
)

onMounted(() => {
  if (storiesSlider.value) {
    // when slider became hidden we need to remove "in" and "out" class to return it initial state
    storiesSlider.value?.el?.addEventListener('animationend', () => {
      if (storiesSlider.value?.el?.classList.contains('stories-slider-out')) {
        storiesSlider.value?.el?.classList.remove('stories-slider-in')
        storiesSlider.value?.el?.classList.remove('stories-slider-out')
      }
    })
  }
})

// stories data
const storiesData = computed(() => {
  return stories.value?.map((story: any) => {
    return {
      user: {
        avatar: '',
        name: '',
      },
      stories: story?.items?.map((item: any) => {
        return {
          ...item,
          video: item?.image,
        }
      }),
    }
  })
})

const onStoriesSlider = (instance: any) => {
  storiesSlider.value = instance
}

// const authStore = useAuthStore()

const user = computed(() => {
  name: 'bla'
})
const subIndexValue = ref(0)
const showState = ref(false)

const onSlidesIndexesChange = (mainIndex: number, subIndex: number) => {
  subIndexValue.value = subIndex
  mainIdx.value = mainIndex
  showState.value = false
  const currentVideo = stories.value?.at(mainIndex)?.items?.at(subIndex)
  if (currentVideo?.id && !currentVideo?.is_read && user.value) {
    store.readStory(currentVideo?.id)
  }
}

const thumbsSwiper = ref<Swiper | null>(null)
const setThumbsSwiper = (swiper: Swiper) => {
  thumbsSwiper.value = swiper
}

const slideNext = () => {
  if (thumbsSwiper.value) {
    thumbsSwiper.value.slideNext()
  }
}

const slidePrev = () => {
  if (thumbsSwiper.value) {
    thumbsSwiper.value.slidePrev()
  }
}

function showMore(value?: boolean) {
  if (value) {
    storiesSlider.value.disable()
    showState.value = true
  } else {
    storiesSlider.value.enable(true)
    showState.value = false
  }
}

watch(
  () => stories.value,
  (val) => {
    if (val) {
      storiesCount.value = stories.value?.length - 1
    }
  }
)
</script>
<style>
.swiper-slide,
.swiper,
.stories-slider,
.story-swipers {
  touch-action: pan-y !important;
}
.swiper-horizontal {
  touch-action: pan-y !important;
}
.inner-scroll-container {
  touch-action: pan-y;
}
.shadow-slider:before {
  content: '';
  position: absolute;
  left: 0;
  z-index: 2;
  background: linear-gradient(
    90deg,
    #f5f7f5 0%,
    rgba(245, 247, 245, 0.8) 25%,
    rgba(245, 247, 245, 0) 100%
  );
  width: 200px;
  height: 100%;
}
.shadow-slider:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2;
  background: linear-gradient(
    -90deg,
    #f5f7f5 0%,
    rgba(245, 247, 245, 0.8) 25%,
    rgba(245, 247, 245, 0) 100%
  );
  width: 200px;
  height: 100%;
}

@media screen and (max-width: 768px) {
  .shadow-slider:after,
  .shadow-slider:before {
    display: none;
  }
}
</style>

<style scoped>
.stories-menu-slider {
  overflow: visible;
}
.stories-menu-slider__item {
  padding: 0.5rem;
  width: 80px;
  height: 96px;
  border-radius: 0.75rem;
  cursor: pointer;
  margin-right: 12px;
}
.stories-menu-slider__item-img {
  flex: 1;
}
.stories-menu-slider__item-title {
  font-size: 16px;
}

.drop__shadow {
  width: 100%;
  height: 100%;
}
</style>

<!--commit -->
