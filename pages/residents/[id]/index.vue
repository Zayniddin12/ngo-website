<template>
  <div class="space-y-6 pages">
    <div class="bg-white rounded-20 p-4 md:p-5">
      <h3 class="text-brand-black font-bold leading-130 text-2xl mb-3 md:mb-4">
        {{ $t('about_organization') }}
      </h3>
      <CollapseTransition v-if="!loading">
        <p
          class="text-brand-black font-medium leading-140 tracking-[0.32px] md:line-clamp-none"
          :class="{
            'line-clamp-2': !showMore,
          }"
          v-html="single?.description!"
        ></p>
      </CollapseTransition>
      <div v-else class="w-full h-[230px] shimmer rounded-lg"></div>
      <!--      <p-->
      <!--        class="text-primary font-medium leading-140 tracking-[0.32px] block md:hidden cursor-pointer"-->
      <!--        @click="toggleShowMore"-->
      <!--      >-->
      <!--        {{ showMore ? $t('show_less') : $t('show_more') }}-->
      <!--      </p>-->
    </div>

    <h3 class="mb-4 !text-2xl font-bold leading-tight">
      {{ $t('our_team_title') }}
    </h3>
    <MainSectionOurTeam
      is-residents
      class="px-0 !mb-0 our-team"
      :team="single?.team ?? []"
      :loading="loading"
    />
    <CommonNoData
      v-if="!single?.team?.length"
      image="/noData/no_projects.svg"
      :title="$t('no_data.about.title')"
    />
  </div>
</template>

<script setup lang="ts">
import { IResidentSingle } from '~/types/residents'

interface Props {
  single?: IResidentSingle
  loading?: boolean
}

defineProps<Props>()

const showMore = ref(false)

const toggleShowMore = () => {
  showMore.value = !showMore.value
}
</script>

<style>
@media screen and (max-width: 768px) {
  .our-team .card_our_team {
    margin-bottom: 0 !important;
  }
}
</style>
