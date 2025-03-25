<script setup lang="ts">
interface Props {
  avatar?: string
  userLink?: string
  name?: string
  closeButton?: boolean
  showState?: boolean
  duration?: number
  story?: any
  trigger?: string
}

const props = defineProps<Props>()
const emit = defineEmits(['closeButtonClick', 'story', 'show-more'])
const onCloseButtonClick = (e) => {
  emit('closeButtonClick', e)
}

const handleShowMore = (el: any) => {
  if (el?.description?.length > 81 && !showMore.value) {
    showMore.value = !showMore.value
    emit('story', el)
    showMore.value = true
    emit('show-more', showMore)
  } else {
    emit('show-more', false)
    showMore.value = false
  }
}
const showMore = ref(false)

watch(
  () => props?.trigger,
  () => {
    showMore.value = false
  }
)
</script>
<template>
  <div class="swiper-slide" :data-duration="duration">
    <div class="stories-slider-user">
      <div v-if="avatar || $slots.avatar" class="stories-slider-user-avatar">
        {{ avatar || '' }}
        <slot name="avatar" />
      </div>
      <div v-if="name || $slots.name" class="stories-slider-user-name">
        <slot name="name" />
      </div>
    </div>
    <div
      v-if="closeButton"
      class="stories-slider-actions"
      @click="onCloseButtonClick"
    >
      <button aria-label="button" class="stories-slider-close-button" />
    </div>

    <div class="stories-slider-content relative">
      <div
        class="absolute z-[9999] bg-gradient-to-t from-dark to-transparent h-fit left-0 right-0 bottom-0 px-5 pb-6"
      >
        <div class="mb-5 space-y-2">
          <h3
            class="text-white/90 !text-sm font-medium leading-130 line-clamp-2"
          >
            {{ story?.description ?? '' }}
          </h3>
        </div>
        <BaseButton
          v-if="story?.url"
          :text="$t('more')"
          variant="secondary"
          class="!bg-white/40 w-full text-white"
          size="md"
          @click="navigateTo(`/${story?.url ?? ''}`)"
        />
      </div>
      <slot />
    </div>
  </div>
</template>
