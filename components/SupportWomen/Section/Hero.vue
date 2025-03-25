<script setup lang="ts">
import { supportWomenHero } from '@/data'
</script>
<template>
  <section class="md:min-h-[575px] relative">
    <div
      class="absolute -top-10 right-0 blur-[175px] h-[160px] w-[648px] rounded-full bg-primary"
    />
    <div
      class="absolute-y -left-96 blur-[175px] rotate-[15deg] h-[363px] w-[648px] rounded-full bg-primary"
    />
    <div
      class="absolute bottom-10 right-32 blur-[75px] h-[60px] w-[648px] rounded-full bg-primary"
    />
    <div class="text-center flex-x-center relative z-10">
      <i18n-t
        scope="global"
        tag="p"
        keypath="page.support_women.hero_title"
        class="text-primary md:text-[40px] text-lg sm:w-2/3 font-extrabold leading-130"
      >
        <template #text>
          <span class="text-brand-black">
            {{ $t('page.support_women.hero_title_slice') }}
          </span>
        </template>
      </i18n-t>
    </div>
    <div class="md:hidden mt-10 relative z-10">
      <img
        class="w-full object-contain sm:object-cover object-top sm:h-64"
        src="/images/support-women/mobile.webp"
        alt="women"
      />
      <div
        class="w-full p-2 border border-primary backdrop-blur-xl bg-white/70 rounded-xl md:hidden -mt-10 sm:mt-0"
      >
        <div class="border-l-4 border-primary pl-2 rounded">
          <h3 class="text-primary font-bold">
            {{ $t('support_women_hero.title3') }}
          </h3>
          <p>{{ $t('support_women_hero.description3') }}</p>
        </div>
      </div>
    </div>

    <div class="hidden md:flex items-center justify-between relative mt-10">
      <div v-for="item of supportWomenHero" class="flex items-center">
        <div
          v-if="item.id !== 1"
          class="w-1 h-44 bg-radial rounded-full mr-4 hidden md:block"
        />
        <img class="hidden md:block" :src="item.image" alt="women " />

        <div
          v-if="item?.name && item?.description"
          class="absolute w-full max-w-sm h-24 bottom-0 p-2 py-3 border border-primary backdrop-blur-xl bg-white/20 rounded-xl hidden md:block fourth_image"
          :class="{
            'block md:bottom-1/4 md:left-1/3 first_img': item.id === 3,
            'md:-bottom-12 md:left-1/2 second_img': item.id === 4,
            '-top-8 right-2 md:-right-16 third_img': item.id === 5,
          }"
        >
          <div class="border-l-4 border-primary pl-2 rounded">
            <h3 class="text-primary font-bold">
              {{ $t('support_women_hero.' + item.name) }}
            </h3>
            <p class="">{{ $t('support_women_hero.' + item.description) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media screen and (max-width: 1224px) {
  .first_img {
    bottom: 35%;
  }
}

@media screen and (min-width: 768px) and (max-width: 850px) {
  .second_img {
    bottom: -100px;
  }
  .first_img {
    bottom: 38%;
  }
}
</style>
