<template>
  <div class="space-y-6 pages">
    <div class="p-4 md:p-6 bg-white rounded-20">
      <h3 class="mb-4 !text-2xl font-bold leading-tight">
        {{ $t('contact_info') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-3">
        <CommonCardContactInformation
          v-if="hasContactInfo"
          :items="contactInfo"
        />
        <CommonCardLoadingContactInfo v-else-if="loading" />
      </div>
      <CommonSectionNoData
        v-if="!hasContactInfo && !loading"
        class="min-h-40"
        :title="$t('no_data.about.title')"
        image="/svg/noData/no_projects.svg"
      />
    </div>
    <div class="p-4 md:p-6 bg-white rounded-20 my-6">
      <h3 class="mb-4 !text-2xl font-bold leading-tight">
        {{ $t('props') }}
      </h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-2 gap-y-3">
        <CommonCardContactInformation v-if="hasProps" :items="properties" />
        <CommonCardLoadingContactInfo v-else-if="loading" />
      </div>
      <CommonSectionNoData
        v-if="!hasProps && !loading"
        :title="$t('no_data.about.title')"
        image="/svg/noData/no_projects.svg"
      />
    </div>
    <div class="p-4 md:p-6 bg-white rounded-20">
      <h3 class="mb-4 !text-2xl font-bold leading-tight">
        {{ $t('company_address') }}
      </h3>
      <CommonMap
        v-if="mapDetails?.coords?.every(Boolean) && !loading"
        :markers="mapDetails"
        :image="mapDetails?.image"
      />
      <div v-else-if="loading" class="w-full h-52 shimmer rounded-lg" />
      <CommonSectionNoData
        v-else
        :title="$t('no_data.about.title')"
        image="/svg/noData/no_projects.svg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useResidentsStore } from '~/store/residents'
import type { IResidentContact, IResidentProperties } from '~/types/residents'

const { t } = useI18n()
const residentsStore = useResidentsStore()
const { id } = useRoute().params

const contactInfo = ref([])
const properties = ref([])
const mapDetails = ref({
  name: '',
  coords: [],
  location: '',
  image: '',
})

const loading = ref(true)

const hasContactInfo = computed(() =>
  contactInfo.value.map(({ title }) => title).some(Boolean)
)

const hasProps = computed(() =>
  properties.value.map(({ title }) => title).some(Boolean)
)

onMounted(async () => {
  try {
    const propertiesData = await residentsStore.fetchResidentProps(id as string)
    const data = await residentsStore.fetchResidentContact(id as string)

    mapDetails.value = {
      coords: [data?.latitude, data?.longitude],
      location: data?.location,
      image: data?.image,
    }
    contactInfo.value = transformContact(data)
    properties.value = transformProperties(propertiesData)
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

function transformContact(contact: IResidentContact) {
  return [
    {
      icon: 'phone',
      title: contact?.phone,
      description: t('resident_form.label.phone'),
    },
    {
      icon: 'location',
      title: contact?.location,
      description: t('event.info.address'),
    },
    {
      icon: 'mail',
      title: contact?.email,
      description: t('resident_form.label.email'),
    },
    {
      icon: 'clock-hour',
      title: contact?.working_hours,
      description: t('working_hours'),
    },
    {
      icon: 'external-link',
      title: contact?.web_site,
      description: t('website'),
    },
  ]
}

function transformProperties(properties: IResidentProperties) {
  return [
    {
      icon: 'calendar',
      title: properties?.register_date,
      description: t('resident_form.placeholder.reg_date'),
    },
    {
      icon: 'list',
      title: properties?.list_number,
      description: t('phone_num_list'),
    },
    {
      icon: 'file-text',
      title: properties?.bank_details,
      description: t('bank_props'),
    },
    {
      icon: 'file-text',
      title: properties?.number_stir,
      description: t('stir'),
    },
    {
      icon: 'file-text',
      title: properties?.number_ktut,
      description: t('ktut'),
    },
    {
      icon: 'file-text',
      title: properties?.inn,
      description: t('inn'),
    },
    {
      icon: 'file-text',
      title: properties?.oked,
      description: t('oked'),
    },
  ]
}
</script>
