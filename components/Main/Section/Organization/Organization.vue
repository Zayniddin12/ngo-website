<template>
  <div v-if="showSection" class="container pt-16 pb-14">
    <div class="mb-9 flex items-end justify-between">
      <CommonSectionHeaderTitle
        title-class="text-28 max-sm:text-2xl text-brand-black"
        subtitle-class="max-w-[781px]"
        :title="$t('org.title')"
        :subtitle="$t('org.subtitle')"
      />
      <BaseButton
        class="hidden md:block !py-2 !px-6 !text-sm !font-bold !leading-none"
        size="sm"
        variant="greenBorder"
        @click="navigateTo('/organizations')"
      >
        <div class="flex items-center gap-2">
          <div class="text-black">{{ $t('org.btn_text') }}</div>
          <div><i-arrow-right class="text-2xl !m-0" /></div>
        </div>
      </BaseButton>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="loading">
        <div v-if="!loading" class="space-y-4">
          <template v-for="(org, key) in organization" :key>
            <CommonCardOrganization :data="org" />
          </template>
        </div>
        <div v-else class="container">
          <MainSectionOrganizationLoading />
        </div>
      </div>
    </Transition>
    <BaseButton
      class="block mt-6 w-full md:hidden !py-2 !px-6 !text-sm !font-bold !leading-none"
      size="sm"
      variant="greenBorder"
      @click="navigateTo('/organizations')"
    >
      <div class="flex items-center gap-2">
        <div class="text-black">{{ $t('all_services') }}</div>
        <div><i-arrow-right class="text-2xl !m-0" /></div>
      </div>
    </BaseButton>
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home'
import type { IOrganization } from '~/types'

const organization = ref<IOrganization[]>([])
const homeStore = useHomeStore()
const showSection = ref(true)

const loading = ref(true)
onMounted(() => {
  homeStore
    .fetchOrganizations()
    .then((data) => {
      organization.value = (data as any)?.records as IOrganization[]
      showSection.value = organization?.value?.length > 0
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<style scoped></style>
