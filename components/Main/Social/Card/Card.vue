<template>
  <Transition mode="out-in" name="fade">
    <div :key="loading" class="bg-white rounded-20">
      <NuxtLink
        v-show="!loading"
        :to="`/social/${item?.slug}`"
        class="!bg-white rounded-20 md:flex mb-4 hover:drop-shadow-xl transition-300"
      >
        <img
          :src="imageSrc"
          alt="img"
          class="md:rounded-l-20 max-md:rounded-t-20 md:w-[260px] max-md:h-[200px] w-full object-cover"
        />
        <div class="p-4">
          <h3
            class="text-brand-black text-lg font-extrabold leading-130 mb-1.5"
          >
            {{ item?.title }}
          </h3>
          <p
            class="text-gray-700 text-sm font-medium line-clamp-3 leading-140 mb-3"
            v-html="item?.description"
          />
          <div class="flex gap-8 items-center">
            <div class="flex items-center gap-4">
              <span
                class="bg-primary h-7 w-1 rounded-lg"
                style="box-shadow: 0px 4px 40px 0px rgba(98, 173, 90, 0.5)"
              />
              <div>
                <p class="text-xs font-normal leading-130 text-gray-700 mb-1">
                  {{ $t('event.info.date') }}
                </p>
                <h4 class="text-base text-brand-black leading-125 font-bold">
                  {{ item?.date }}
                </h4>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span
                class="bg-primary h-7 w-1 rounded-lg"
                style="box-shadow: 0px 4px 40px 0px rgba(98, 173, 90, 0.5)"
              />
              <div>
                <p
                  class="text-xs font-normal leading-130 text-gray-700 truncate max-md:w-[150px]"
                >
                  {{ $t('event.info.address') }}
                </p>
                <h4
                  class="text-base text-brand-black leading-125 font-bold truncate max-md:w-[150px]"
                >
                  {{ item?.location }}
                </h4>
              </div>
            </div>
          </div>
          <CommonCardUsers :users="users" class="my-6" />
        </div>
      </NuxtLink>
    </div>
  </Transition>
</template>
<script lang="ts" setup>
import type { ISocialEvent } from '@/types'

interface Props {
  item: ISocialEvent
  loading: boolean
}

const props = defineProps<Props>()

const { isValidImageUrl } = useValidImage()

const imageSrc = ref('/images/defaultImg-for-events.svg')

const users = computed(() =>
  props.item?.partners.map((part) => ({
    user: {
      id: part.id,
      full_name: part.name,
      avatar: part.image,
      link: `/residents/${part.slug}`,
    },
  }))
)

onMounted(async () => {
  imageSrc.value = await isValidImageUrl(
    props.item?.image,
    '/images/defaultImg-for-events.svg'
  )
})
</script>
