<template>
  <div v-if="showSection" class="relative">
    <section
      class="relative overflow-hidden h-auto pb-[19rem] md:pb-[16rem] bg-brand-black"
    >
      <div
        v-if="!loading"
        class="w-[360px] translate-x-1/2 right-0 -translate-y-1/2 absolute h-[360px] bg-danger-600/60 blur-[300px] rounded-full"
      />
      <div
        class="container py-10 md:py-16 grid gap-6 grid-cols-1 md:grid-cols-3"
      >
        <CommonSectionHeaderTitle
          title-class="!text-2xl md:!text-4xl !font-extrabold !text-white"
          :title="$t('support_female_gender')"
          :subtitle="$t('support_female_gender_text')"
        >
          <div class="flex md:justify-normal flex-wrap gap-5 text-white">
            <a
              v-if="contanctInfoData?.length > 0"
              :href="`tel:${contanctInfoData[0]?.phone}`"
              class="min-h-10"
            >
              <BaseButton size="sm" variant="transparent" class="h-full">
                <p class="text-white text-sm font-bold leading-none">
                  {{ $t('contact_us') }}
                </p>
              </BaseButton>
            </a>
            <BaseButton
              size="sm"
              variant="green"
              @click="navigateTo('/support-women')"
            >
              <div class="flex items-center gap-2">
                <div class="text-white">{{ $t('all_services') }}</div>
                <div><i-arrow-right class="text-2xl !m-0" /></div>
              </div>
            </BaseButton>
          </div>
        </CommonSectionHeaderTitle>
        <CommonCardSupport
          v-for="(item, key) in supports"
          :key
          :loading="supportStore.isLoading"
          v-bind="item"
        />
      </div>
      <MainSectionNumberOfProjects
        :projects="supportStatisticNumbers"
        class="hidden md:flex md:flex-wrap"
        :loading="loading"
        v-bind="{ isVisible }"
      />
      <MainSectionNumberOfProjectsMobile
        :projects="supportStatisticNumbers"
        class="md:hidden mt-0 my-10 md:mt-16 md:mb-96"
        v-bind="{ isVisible }"
      />

      <div
        class="w-[360px] z-0 -translate-x-1/2 translate-y-1/2 absolute bottom-0 h-[360px] bg-[#F32663]/60 blur-[300px] rounded-full"
      />
    </section>
    <CommonCardNeedHelp
      :loading="loading"
      class="md:-mt-40 -mt-[16rem]"
      :phone="contanctInfoData?.[0]?.phone"
    />
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '~/store/contact'
import { useHomeStore } from '~/store/home'
import { useSupportStore } from '~/store/support'
import type { IProjectNumbers } from '~/types'
import type { ISupportCard } from '~/types/support'

const supportStore = useSupportStore()
const homeStore = useHomeStore()
const supports = ref<ISupportCard[]>([])
const supportStatisticNumbers = ref<IProjectNumbers[] | undefined>([])

interface Props {
  isVisible?: boolean
}

const loading = ref(true)
const useContact = useContactStore()
const showSection = ref(true)
useContact.fetchContacts()

const contanctInfoData = computed(() => useContact.contacts)

defineProps<Props>()
onMounted(() => {
  Promise.all([
    supportStore.getSupports(5),
    homeStore.fetchSupportStatisticNumbers(),
  ])
    .then(([supportData, statisticData]) => {
      supports.value = supportData!
      supportStatisticNumbers.value = statisticData?.map((item) => {
        return {
          title: item.name,
          quantity: item.count,
        }
      })
      showSection.value = supportData!.length > 0 || statisticData!.length > 0
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<style scoped></style>
