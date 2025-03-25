<template>
  <div class="container pt-5 pb-16">
    <template v-if="loading">
      <CommonWinnerLoading
        v-if="
          participants?.status === 'completed' ||
          participants?.status === 'started'
        "
      />
      <CommonParticipantLoading v-else />
    </template>
    <template v-else-if="participants?.project_request?.length">
      <CommonWinnerCard
        v-if="
          participants?.status === 'completed' ||
          participants?.status === 'started'
        "
        :list="
         participants?.project_request.map((item) => ({
          id: item.id,
          company: {
            name: item.resident.name,
            date: item.resident.date,
            image: item.resident.image,
            slug: item.resident.slug,
          },
          date_of_application: item.resident.date,
          start_date: participants?.start_date!,
          end_date: participants?.end_date!,
          price: participants?.price!,
          status: item.status,
        }))
      "
      />
      <div v-else class="grid gap-4">
        <template v-for="item in participants?.project_request" :key="item.id">
          <CommonParticipantCard
            :company="{
              name: item.resident.name,
              date: item.resident.date,
              image: item.resident.image,
              slug: item.resident.slug,
            }"
            :date="item.create_date"
          />
        </template>
      </div>
    </template>
    <CommonNoData
      v-else
      image="/svg/noData/no_participant.svg"
      :title="$t('place_empty')"
      :subtitle="$t('all_empty')"
    />
  </div>
</template>

<script setup lang="ts">
import { IParticipant } from '~/types'

interface Props {
  participants?: IParticipant
  loading: boolean
}

defineProps<Props>()
</script>
