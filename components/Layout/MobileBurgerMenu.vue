<template>
  <div
    class="w-full fixed top-0 left-0 h-screen z-50 transition-all duration-300 bg-white container hidden-print"
  >
    <div>
      <div class="flex justify-between items-center py-6">
        <NuxtLink to="/" @click="$emit('update:modelValue', false)">
          <img
            :src="`/logos/logo-dark.svg`"
            alt="Logo"
            class="max-[1150px]:w-[150px]"
          />
        </NuxtLink>
        <div @click="$emit('update:modelValue', false)">
          <i-close class="text-brand-black text-2xl cursor-pointer"> </i-close>
        </div>
      </div>
      <div class="flex items-center justify-center mt-10 flex-col gap-3">
        <div v-for="(item, index) in links" :key="index">
          <NuxtLink
            :to="item.link"
            class="text-brand-black text-base font-medium leading-130"
            @click="$emit('update:modelValue', false)"
          >
            {{ $t(item.title) }}
          </NuxtLink>
        </div>
        <CommonLang class="mt-10" current-lang-style="!text-brand-black" />

        <a target="_blank" :href="linker?.one_id_url">
          <BaseButton variant="green" :text="$t('login')" class="mt-10">
            <template #suffix><i-internal-link class="text-2xl" /> </template>
          </BaseButton>
        </a>
        <ul
          v-if="!loading"
          class="absolute bottom-[20%] flex items-center gap-6"
        >
          <li>
            <a
              :href="`tel:${contactInfoData[0]?.phone}`"
              class="gap-2 flex items-center text-brand-black text-xs font-medium leading-none"
            >
              <i-phone class="!m-0 text-base text-primary" />
              {{ contactInfoData[0]?.phone }}
            </a>
          </li>
          <li>
            <a
              :href="`mailto:${contactInfoData[0]?.email}`"
              class="gap-2 flex items-center text-brand-black text-xs font-medium leading-none"
            >
              <i-mail class="!m-0 text-base text-primary" />
              {{ contactInfoData[0]?.email }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useContactStore } from '~/store/contact'
// import type { Links } from '~/data/menu'
import { useHomeStore } from '~/store/home'
const homeStore = useHomeStore()
const { data: linker } = useAsyncData(async () => {
  const res = await homeStore.fetchOneId()
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})
const useContact = useContactStore()
const contactInfoData = computed(() => useContact.contacts)
const loading = computed(() => useContact.loading)

useContact.fetchContacts()
interface Props {
  links?: Array<Links>
  openMenu?: boolean
}

defineProps<Props>()
defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
// const linker = computed(() => homeStore.oneId)
</script>

<style scoped></style>
