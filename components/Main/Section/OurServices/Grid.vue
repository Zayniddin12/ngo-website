<template>
  <div id="our-services" class="md:pt-12 md:pb-16 py-6 text-center container">
    <CommonSectionHeaderTitle
      :title="$t('our_services_title')"
      :subtitle="$t('our_services_subtitle')"
      title-class="!text-brand-black max-md:text-3xl leading-tight"
      subtitle-class="text-base "
    />
    <div
      v-if="!loading"
      class="grid xl:grid-cols-4 md:grid-cols-3 min-[500px]:grid-cols-2 grid-cols-1 min-[900px]:gap-6 gap-4 mt-6 md:mt-10"
    >
      <div
        v-for="(item, i) in ServiceData"
        :key="i"
        class="min-[850px]:p-6 p-3 rounded-20 border border-gray-500 bg-white text-left"
      >
        <CommonImage src="/svg/Icon.svg" class="w-16" />
        <h3
          class="text-brand-black text-xl max-[500px]:text-lg font-extrabold mt-7 mb-4 leading-tight transition-300 group-hover:text-white"
        >
          {{ item?.name }}
        </h3>

        <p
          class="text-sm max-[500px]:text-xs font-semibold leading-snug text-gray-700 transition-300 group-hover:text-white/60 mb-9"
        >
          {{ item?.description }}
        </p>
      </div>
    </div>
    <MainSectionOurServicesLoading v-else />
  </div>
</template>
<script setup lang="ts">
import { useAboutStore } from '~/store/about'

const loading = ref(true)
let ServiceData = ref<any[]>([])
ServiceData = computed(() => aboutStore.serviceDatas)
const aboutStore = useAboutStore()

aboutStore.fetchOurServices()
onMounted(() => {
  setTimeout(() => {
    if (ServiceData.value) {
      loading.value = false
    }
  }, 1000)
})
</script>
