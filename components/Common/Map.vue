<template>
  <client-only>
    <div
      v-if="markers?.coords.every(Boolean)"
      class="rounded-lg overflow-hidden relative"
    >
      <yandex-map
        v-model="activeCoord"
        :behaviors="behaviors"
        :coords="markers.coords"
        :settings="settings"
        :zoom="16"
        :controls="['zoomControl']"
        class="w-full h-[500px] rounded-lg"
      >
        <ymap-marker
          :coords="markers?.coords"
          :hint-content="markers?.name"
          :icon="markerIcon"
          cluster-name="1"
        />
      </yandex-map>
      <CommonCardContactInformation
        title-class="line-clamp-1"
        main-class="bg-white !p-3 absolute bottom-3 left-3 md:bottom-5 md:left-5 w-[214px] line-clamp-1 w-max rounded-lg shadow-mapCard"
        body-class="flex-col-reverse"
        :items="mapInfo"
      />
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { yandexMap, ymapMarker } from 'vue-yandex-maps'

interface Props {
  markers: {
    name?: string
    coords: number[]
    location: string
  }
}

const behaviors = ref('drag')
const props = defineProps<Props>()

const { t } = useI18n()

const mapInfo = ref([
  {
    icon: 'location',
    title: props.location,
    description: t('location'),
  },
])

const settings = {
  apiKey: '',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1',
}
const activeCoord = ref<{ lat?: number; lng?: number; location?: number }>({})
const markerIcon = {
  layout: 'default#image',
  imageHref: '/svg/location.svg',
  imageSize: [30, 42],
  imageOffset: [-15, -42],
}
</script>

<style>
.ymaps-2-1-79-map-copyrights-promo,
.ymaps-2-1-79-copyright__content {
  display: none !important;
}
</style>
