<template>
  <div class="bg-transparent py-6 flex items-center">
    <div class="container flex items-center justify-between">
      <div class="min-[900px]:flex hidden md:gap-4 lg:gap-32 z-10">
        <div>
          <NuxtLink to="/">
            <img
              v-if="$i18n.locale !== 'ru'"
              :src="`/logos/logo-${$i18n.locale}-light.svg`"
              alt="Logo"
              class="w-[216px] h-12"
            />
            <img v-else :src="`/logos/logo.svg`" alt="Logo" />
          </NuxtLink>
        </div>
        <div class="hidden min-[900px]:flex gap-3">
          <BaseRouterButton
            v-for="(item, index) in routerBtnData"
            :key="index"
            :to="item.link"
            :text="$t(item.title)"
          >
            <template #icon>
              <component
                :is="`i-${item.icon}`"
                class="text-2xl !m-0 !text-primary"
              />
            </template>
          </BaseRouterButton>
        </div>
      </div>

      <div class="max-[900px]:flex justify-end hidden w-full relative z-20">
        <i-burger
          class="text-2xl text-white relative z-20"
          @click="$emit('update:modelValue', true)"
        />
      </div>
      <a target="_blank" :href="linker?.one_id_url">
        <BaseButton
          variant="green"
          :text="$t('login')"
          class="z-10 !py-2 !px-6 max-[900px]:hidden"
        >
          <template #suffix>
            <i-login class="text-2xl !mb-0" />
          </template>
        </BaseButton>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { routerBtnData } from '~/data'
import { useHomeStore } from '~/store/home'

const homeStore = useHomeStore()

const { data: linker } = useAsyncData(async () => {
  const res = await homeStore.fetchOneId()
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<style scoped></style>
