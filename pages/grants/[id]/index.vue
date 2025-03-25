<template>
  <div class="grid gap-5 pages">
    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div v-if="!loading" class="bg-white rounded-2xl p-4">
          <p
            class="sm:text-2xl text-lg text-brand-black font-bold leading-130 mb-6"
          >
            {{ aboutGrandSingle?.name }}
          </p>
          <div class="description" v-html="aboutGrandSingle?.description" />
          <p
            v-if="aboutGrandSingle?.key_aspects.length"
            class="text-brand-black font-bold leading-130 text-xl mb-4"
          >
            {{ $t('aspect_project') }}
          </p>
          <CommonCardKeyProject :items="aboutGrandSingle?.key_aspects" />
        </div>
        <div v-else class="w-full bg-white p-4 rounded-2xl">
          <span class="w-[80%] shimmer h-7 rounded mb-6" />
          <span class="w-full shimmer h-24 rounded mb-6" />
          <p class="text-brand-black font-bold leading-130 text-xl mb-4">
            {{ $t('aspect_project') }}
          </p>
          <div class="grid grid-cols-2 gap-2">
            <span
              v-for="key in 2"
              :key
              class="w-full shimmer h-28 rounded-lg mb-6"
            />
          </div>
        </div>
      </div>
    </Transition>
    <div
      v-if="aboutGrandSingle?.bottom_description"
      class="bottom_description bg-white rounded-2xl p-4"
      v-html="aboutGrandSingle?.bottom_description"
    />
    <Transition name="fade" mode="out-in">
      <div v-if="loading" class="w-full bg-white p-4 rounded-2xl">
        <p class="text-2xl text-brand-black font-bold leading-loose mb-6">
          {{ $t('attached_file') }}
        </p>
        <div class="grid grid-cols-2 gap-2">
          <span
            v-for="key in 2"
            :key
            class="w-full shimmer h-14 rounded-lg mb-6"
          />
        </div>
      </div>
      <div
        v-else-if="aboutGrandSingle?.file?.length"
        class="bg-white rounded-2xl p-4"
      >
        <p class="text-2xl text-brand-black font-bold leading-loose mb-6">
          {{ $t('attached_file') }}
        </p>
        <CommonCardAttachedFiles :items="aboutGrandSingle?.file" />
      </div>
    </Transition>

    <div class="bg-white rounded-2xl p-4">
      <p class="text-brand-black font-bold leading-130 text-xl mb-4">
        {{ $t('terms_requirements') }}
      </p>
      <CommonCardTermsRequirements
        :start-date="aboutGrandSingle?.start_date"
        :end-date="aboutGrandSingle?.start_date"
        :price="aboutGrandSingle?.price"
        :source-of-budget="aboutGrandSingle?.source_of_budget"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { IFileProject } from '~/types'

interface IProjectDetailGrant {
  name: string
  description: string
  key_aspects: {
    id: number
    name: string
    description: string
  }[]
  file: IFileProject[]
  bottom_description: string
  start_date: string
  end_date: string
  source_of_budget: string
  price: number
}

const aboutGrandSingle = ref<IProjectDetailGrant>()
const loading = ref(true)
const route = useRoute()

const getProjectDetail = async (id: string) => {
  try {
    const res = await useApi().$get<IProjectDetailGrant>('send_request', {
      params: {
        model: 'resident.project',
        fields:
          'name,description,key_aspects{id,name,description},file{id,name,file},bottom_description,start_date,end_date,source_of_budget,price',
        id,
      },
    })

    aboutGrandSingle.value = res
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getProjectDetail(route.params.id as string)
})
</script>
