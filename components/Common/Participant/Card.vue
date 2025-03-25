<template>
  <NuxtLink
    :to="`/residents/${company?.slug}`"
    class="p-4 bg-white rounded-2xl border border-gray-500 hover:md:-translate-y-2 duration-300 block"
  >
    <div class="flex justify-between gap-4">
      <div class="flex gap-2 items-center">
        <img
          alt="image"
          :src="company.image ?? '/images/user-default.png'"
          class="w-[50px] h-[50px] shrink-0 object-cover rounded-full"
        />
        <div>
          <h4 class="text-xl font-extrabold leading-130 text-brand-black">
            {{ company.name }}
          </h4>
          <p class="text-gray-700 text-xs">
            {{
              $t('resident_with', {
                date: dayjs(new Date(company.date))
                  .locale($i18n.locale === 'uz' ? 'uz-latn' : $i18n.locale)
                  .format('DD MMMM, YYYY'),
              })
            }}
          </p>
        </div>
      </div>
      <div class="px-4 py-2 flex flex-col bg-gray-500 items-center rounded-lg">
        <p class="text-brand-black text-sm font-semibold">
          {{ dayjs(new Date(date)).format('DD.MM.YYYY') }}
        </p>
        <p class="text-gray-700 text-sm">
          {{ $t('application_submitted') }}
        </p>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  company: {
    name: string
    date: string
    image: string
    slug: string
  }
  date: string
}

defineProps<Props>()
</script>
