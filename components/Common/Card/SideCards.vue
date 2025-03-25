<template>
  <div>
    <template v-if="loading">
      <span
        class="shimmer shrink-0 !bg-[#edeef1] w-full h-[157px] rounded-2xl mb-5 p-4"
      />
      <span
        class="shimmer shrink-0 !bg-[#edeef1] w-full h-[355px] rounded-2xl mb-5 p-4"
      />
    </template>
    <template v-else>
      <slot name="suffix" />
      <div
        v-if="hasVolunteer"
        class="w-full h-[157px] bg-side-card rounded-2xl relative z-10 p-4 overflow-hidden flex flex-col justify-between mb-5"
      >
        <div>
          <p class="text-primary text-sm font-medium mb-1">
            {{ data?.[1]?.name }}
          </p>
          <p class="text-sm font-extrabold uppercase text-white">
            {{ $t('become_part_volunteer') }}
          </p>
        </div>
        <a :href="data?.[1]?.link" target="_blank">
          <BaseButton
            text-class="!font-semibold"
            class="z-10 w-[157px]"
            variant="green"
            size="sm"
            :text="$t('become_volunteer')"
          />
        </a>
        <div class="absolute z-1 top-0 left-0 w-full h-full">
          <img
            class="w-full h-full"
            src="/svg/volontyor-vector.svg"
            alt="image"
          />
        </div>
        <div class="absolute bottom-0 right-0 z-2">
          <img src="/svg/volontyor-line.svg" alt="image" />
        </div>
      </div>
      <div
        v-if="hasYouth"
        class="w-full h-[355px] card-young bg-side-card-50 rounded-2xl relative z-10 p-4 overflow-hidden flex flex-col justify-between mb-5"
      >
        <div class="contents">
          <img
            class="w-[156px] h-[34px] mx-auto object-cover"
            :src="data?.[0]?.image ?? '/logos/yoshlar.svg'"
            alt="image"
          />
          <p class="leading-5 text-base font-bold text-white text-center">
            {{ data?.[0]?.name }}
          </p>
          <a
            class="text-side-card-100 text-xs font-medium text-center z-10"
            :href="`https://${data?.[0]?.link}`"
            target="_blank"
            >yoshlar.gov.uz</a
          >
        </div>

        <div class="absolute z-1 top-0 left-0 w-full h-full">
          <img class="w-full h-full" src="/svg/gerb.svg" alt="image" />
        </div>
      </div>
      <slot name="prefix"></slot>
    </template>
  </div>
</template>
<script setup lang="ts">
import { useCommonStore } from '~/store/common'
import { ICardSide } from '~/types'

interface Props {
  hasVolunteer?: boolean
  hasYouth?: boolean
}
defineProps<Props>()
const loading = computed(() => useCommonStore().loading)
const data = computed<ICardSide[]>(() => CommonStore.sideCards)
const CommonStore = useCommonStore()
CommonStore.fetchSideCards()
</script>

<style scoped>
.card-young {
  box-shadow: 0 8px 28px 0 rgba(0, 0, 0, 0.02);
}
</style>
