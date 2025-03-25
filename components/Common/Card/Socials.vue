<template>
  <div class="page-shadow bg-white rounded-20 p-5">
    <p class="text-xl font-bold leading-relaxed mb-5">
      {{ $t('socials') }}
    </p>
    <Transition name="fade" mode="out-in">
      <div v-if="loading" class="space-y-2">
        <div
          v-for="key in 3"
          :key
          class="shimmer w-[245px] h-12 rounded-xl"
        ></div>
      </div>
      <div v-else class="space-y-2">
        <BaseButton
          v-if="telegram"
          variant="greenBorder"
          main-class="!justify-between"
          class="w-full !p-2.5 !rounded-xl !text-sm !font-semibold !leading-130"
          text="1"
          text-class="opacity-0"
          @click="openLink(telegram)"
        >
          <template #prefix>
            <div class="flex-center gap-3">
              <div class="flex-center p-1.5 rounded-full bg-primary">
                <i-telegram class="text-white text-xl !mb-0" />
              </div>
              <p class="text-brand-black text-[15px] font-bold leading-tight">
                {{ $t('social_sites.telegram') }}
              </p>
            </div>
          </template>
          <template #suffix>
            <i-external-link class="text-primary text-xl !mb-0" />
          </template>
        </BaseButton>
        <BaseButton
          v-if="instagram"
          variant="greenBorder"
          main-class="!justify-between"
          class="w-full !p-2.5 !rounded-xl !text-sm !font-semibold !leading-130"
          text="1"
          text-class="opacity-0"
          @click="openLink(instagram)"
        >
          <template #prefix>
            <div class="flex-center gap-3">
              <div class="flex-center p-1.5 rounded-full bg-primary">
                <i-instagram class="text-white text-xl !mb-0" />
              </div>
              <p class="text-brand-black text-[15px] font-bold leading-tight">
                {{ $t('social_sites.instagram') }}
              </p>
            </div>
          </template>
          <template #suffix>
            <i-external-link class="text-primary text-xl !mb-0" />
          </template>
        </BaseButton>
        <BaseButton
          v-if="facebook"
          variant="greenBorder"
          main-class="!justify-between"
          class="w-full !p-2.5 !rounded-xl !text-sm !font-semibold !leading-130"
          text="1"
          text-class="opacity-0"
          @click="openLink(facebook)"
        >
          <template #prefix>
            <div class="flex-center gap-3">
              <div class="flex-center p-1.5 rounded-full bg-primary">
                <i-facebook class="text-white text-xl !mb-0" />
              </div>
              <p class="text-brand-black text-[15px] font-bold leading-tight">
                {{ $t('social_sites.facebook') }}
              </p>
            </div>
          </template>
          <template #suffix>
            <i-external-link class="text-primary text-xl !mb-0" />
          </template>
        </BaseButton>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  telegram?: string
  facebook?: string
  instagram?: string
  loading?: boolean
}

defineProps<Props>()

const openLink = (link: string) => {
  window.open(link, '_blank')
}
</script>

<style scoped></style>
