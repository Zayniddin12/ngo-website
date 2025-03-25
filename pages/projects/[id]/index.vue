<template class="pages">
  <div>
    <Transition name="fade" mode="out-in">
      <div :key="isLoading">
        <template v-if="isLoading">
          <div class="grid gap-5">
            <div class="bg-white p-5 rounded-2xl w-full">
              <span
                class="shimmer !bg-[#edeef1] w-4/5 h-[35px] mb-[10px] rounded-lg"
              />
              <span
                class="shimmer !bg-[#edeef1] w-full h-[100px] mb-[10px] rounded-lg"
              />
              <span
                class="shimmer !bg-[#edeef1] w-1/2 h-[35px] mt-6 mb-4 rounded-lg"
              />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <span
                  v-for="item in 4"
                  :key="item"
                  class="shimmer !bg-[#edeef1] w-full h-[100px] mt-6 mb-[10px] rounded-lg"
                />
              </div>
            </div>
            <div class="bg-white p-5 rounded-2xl w-full">
              <span
                class="shimmer !bg-[#edeef1] w-1/2 h-[35px] mb-[10px] rounded-lg"
              />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <span
                  v-for="item in 4"
                  :key="item"
                  class="shimmer !bg-[#edeef1] w-full h-[50px] mt-6 mb-[10px] rounded-lg"
                />
              </div>
            </div>
            <div class="bg-white p-5 rounded-2xl w-full">
              <span
                class="shimmer !bg-[#edeef1] w-1/2 h-[35px] mb-[10px] rounded-lg"
              />
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                <span
                  v-for="item in 4"
                  :key="item"
                  class="shimmer !bg-[#edeef1] w-full h-[50px] mt-6 mb-[10px] rounded-lg"
                />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="bg-white p-5 rounded-2xl w-full">
            <div
              class="w-full text-brand-black sm:text-2xl text-lg font-bold leading-130"
            >
              <h4 class="">
                {{ projectAboutData?.name }}
              </h4>
              <p
                class="text-brand-black font-medium leading-140 mt-3 !text-base"
                v-html="projectAboutData?.description"
              />
            </div>
            <div v-if="projectAboutData?.key_aspects.length" class="mt-6">
              <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
                {{ $t('aspect_project') }}
              </h3>
              <CommonCardKeyProject
                :items="
                  projectAboutData?.key_aspects.map((item) => ({
                    name: item.name,
                    description: item.description,
                  }))!
                "
              />
            </div>
          </div>
          <div
            v-if="projectAboutData?.file.length"
            class="bg-white p-4 md:p-5 rounded-2xl mt-5"
          >
            <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
              {{ $t('attached_file') }}
            </h3>
            <CommonCardAttachedFiles :items="projectAboutData.file" />
          </div>

          <div class="bg-white p-4 md:p-5 rounded-2xl mt-5">
            <h3 class="mb-4 text-brand-black text-xl leading-130 font-bold">
              {{ $t('terms_requirements') }}
            </h3>

            <CommonCardTermsRequirements
              :start-date="projectAboutData?.start_date"
              :end-date="projectAboutData?.end_date!"
              :price="projectAboutData?.price"
              :source-of-budget="projectAboutData?.source_of_budget"
            />
          </div>

          <CommonCardChekcProject class="mt-5" />
        </template>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { IProjectDetailAbout } from '~/types'

const projectAboutData = ref<IProjectDetailAbout>()
const isLoading = ref(true)
const route = useRoute()

const getProjectDetail = async (id: string) => {
  try {
    const res = await useApi().$get<IProjectDetailAbout>('send_request', {
      params: {
        model: 'resident.project',
        fields:
          'name,price,description,key_aspects{id,name,description},file{id,name,file,size},start_date,end_date,source_of_budget,category{id}',
        id,
      },
    })

    projectAboutData.value = res
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  getProjectDetail(route.params.id as string)
})
</script>
