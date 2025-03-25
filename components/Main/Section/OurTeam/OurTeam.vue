<template>
  <div class="container">
    <div
      v-if="!loading"
      :class="{ 'lg:!grid-cols-3': isResidents }"
      class="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 flex-wrap mb-6 card_our_team"
    >
      <div
        v-for="(member, index) in team"
        :key="index"
        :class="{ '!flex-col': isResidents }"
        class="p-4 md:p-6 text-center bg-white rounded-2xl max-sm:flex max-sm:items-center members-center gap-3"
      >
        <img
          :src="member?.image ?? '/images/default-user.png'"
          alt="img"
          class="rounded-full mx-0 sm:mx-auto sm:w-[120px] sm:h-[120px] object-cover object-top w-20 h-20 aspect-[1/1]"
        />
        <div :class="{ 'flex flex-col-reverse': isResidents }">
          <h3
            class="text-primary text-sm font-medium leading-tight"
            :class="{ 'mt-0 md:mt-6': !isResidents }"
          >
            {{ member?.position }}
          </h3>
          <p
            class="text-brand-black text-xl max-[500px]:text-base font-bold leading-tight mb-1"
            :class="{ 'mt-6': isResidents }"
          >
            {{ member?.name }}
          </p>
        </div>
        <div v-if="isResidents" class="mt-5 w-full">
          <div
            v-if="
              getSocialsByTeamMember(member?.id).some((m) => m?.name)?.length
            "
            class="flex gap-3 pt-5 mx-auto justify-center w-[80%]"
          >
            <div
              v-for="social of getSocialsByTeamMember(member?.id)"
              :key="social.id"
            >
              <a
                v-if="!!social?.name"
                :aria-label="`${social?.name} link`"
                :href="social?.name as string"
                class="flex gap-4 p-2 bg-gray-500 rounded-[40px]"
                target="_blank"
              >
                <component :is="`i-${social?.name}`" class="text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseButton
      v-if="team?.length >= 8"
      :text="$t('show_more')"
      class="w-full"
      variant="green"
    />
    <MainSectionOurTeamLoading v-else-if="loading" />
  </div>
</template>

<script lang="ts" setup>
import type { ITeam } from '@/types/residents'

interface Props {
  isResidents?: boolean
  team: ITeam[]
  loading?: boolean
}

const props = defineProps<Props>()

const getSocialsByTeamMember = (id: number) => {
  const member = props.team.find((m) => m.id === id)
  return [
    {
      id: 1,
      name: member?.facebook,
    },
    {
      id: 2,
      name: member?.instagram,
    },
    {
      id: 3,
      name: member?.telegram,
    },
  ]
}
</script>
