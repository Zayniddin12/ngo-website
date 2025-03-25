<template>
  <main
    class="bg-primary-900 max-md:h-[880px] h-[800px] -mt-[127px] flex md:items-center !relative overflow-hidden"
  >
    <div class="md:container">
      <div class="relative flex justify-center z-10">
        <div class="container !px-5">
          <div
            class="flex flex-col-reverse max-md:mt-28 lg:flex-row justify-center items-center gap-6 lg:gap-14 mb-8 py-4 md:px-4 lg:p-0"
          >
            <div>
              <i18n-t
                scope="global"
                keypath="hero_with"
                tag="h1"
                class="text-white font-bold leading-130 text-28 lg:text-52"
              >
                <template #hero_with_title>
                  <span class="text-primary shadow-text">
                    {{ $t('hero_with_title') }}
                  </span>
                </template>
              </i18n-t>
              <p
                class="text-base font-normal leading-130 text-white/60 my-8 whitespace-wrap lg:max-w-[580px]"
              >
                {{ $t('company_about_main') }}
              </p>
              <div class="flex gap-4">
                <a target="_blank" :href="linker?.one_id_url">
                  <BaseButton
                    class="w-full text-xs lg:text-sm !px-5 md:!px-6 [&_div]:hidden"
                    variant="hero"
                    :text="$t('become_resident')"
                  />
                </a>
                <NuxtLink to="/support-women">
                  <BaseButton
                    class="w-full text-xs lg:text-sm !px-5 md:!px-6 [&_div]:hidden"
                    variant="green"
                    :text="$t('get_support')"
                  />
                </NuxtLink>
              </div>
            </div>
            <div class="lg:h-[380px] lg:w-[600px] w-[200px] h-[214px]">
              <img
                class="w-full h-full"
                src="/vidoes/NGOLogo.gif"
                alt="image"
              />
              <!--  TODO: add video if needed in the future -->
              <!--  <video autoplay loop muted playsinline> -->
              <!--     <source src="/vidoes/NGOLogo.webm" type="video/webm" /> -->
              <!--     Your browser does not support the video tag. -->
              <!--  </video>-->
            </div>
          </div>
          <div
            class="md:!relative overflow-hidden h-[70px] flex items-center max-md:w-screen absolute left-0 max-md:-bottom-8"
          >
            <client-only>
              <CommonMarquee
                v-if="!isLoading"
                class="!w-full"
                img-style="!min-w-12 !max-w-16 !h-auto"
                auto-fill
                alt="image"
                :items="partners.map((p) => ({ image_url: p.image }))"
              />
            </client-only>
          </div>
        </div>
      </div>
    </div>
    <img
      class="absolute left-0 bottom-0 z-0 responsive_image"
      src="/images/hero-left.svg"
      alt="image"
    />
    <img
      class="absolute right-0 bottom-0 z-0 responsive_image"
      src="/images/hero-right.svg"
      alt="image"
    />
    <span class="hero-bottom" />
    <span class="hero-top" />
  </main>
</template>
<script setup lang="ts">
import { useAboutStore } from '~/store/about'
import { useHomeStore } from '~/store/home'
import type { IPartners } from '~/types'

const homeStore = useHomeStore()
const { data: linker } = useAsyncData(async () => {
  const res = await homeStore.fetchOneId()
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})

const partners = ref<IPartners<any>[]>([])
const isLoading = ref(true)
const aboutStore = useAboutStore()

onMounted(() => {
  aboutStore.fetchPartners().then((data) => {
    partners.value = data
    isLoading.value = false
  })
})

const showResponsiveImage = ref(false)

onMounted(() => {
  setTimeout(() => {
    showResponsiveImage.value = true
  }, 4000)
})
</script>

<style>
.shadow-text {
  text-shadow: 0 4px 40px rgba(111, 189, 104, 0.4);
}
.hero-bottom {
  position: absolute;
  right: -340px;
  bottom: -340px;
  border-radius: 540px;
  opacity: 0.5;
  background: #62ad5a;
  filter: blur(250px);
  width: 540px;
  height: 540px;
}
.hero-top {
  position: absolute;
  left: -340px;
  top: -340px;
  border-radius: 540px;
  opacity: 0.5;
  background: #62ad5a;
  filter: blur(250px);
  width: 540px;
  height: 540px;
}

@media screen and (min-width: 768px) and (max-width: 1024px) {
  .gradient {
    display: none;
  }
}
@media screen and (max-width: 768px) {
  .responsive_image {
    bottom: 0;
    width: 35%;
  }
  .hero-bottom {
    bottom: -38%;
  }
}
</style>
