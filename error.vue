<template>
  <NuxtLayout>
    <main class="h-full px-5 py-10 flex justify-center items-center relative">
      <div class="container z-10">
        <div
          class="w-full relative flex flex-col-reverse lg:flex-row align-center justify-between items-center md:gap-6 gap-10"
        >
          <div>
            <h4
              class="text-brand-black text-2xl md:text-4xl font-semibold leading-130"
            >
              {{ $t('error_title') }}
            </h4>
            <h4
              v-if="server"
              class="text-brand-black text-2xl md:text-4xl font-semibold leading-130"
            >
              {{ $t('error_text') }}
            </h4>

            <p
              class="mt-3 mb-6 md:mb-8 text-gray-700 leading-130 font-normal text-sm md:w-[478px]"
            >
              {{ $t('error_subtitle') }}
            </p>

            <p
              v-if="server"
              class="mt-3 mb-8 text-gray-700 leading-130 font-normal text-sm"
            >
              {{ $t('error_subtext') }}
            </p>

            <BaseButton
              class="w-full md:w-max !py-2"
              variant="greenBorder"
              :text="$t('back_home')"
              @click="handleError"
            />
          </div>
          <CommonImage
            src="/svg/404-img.svg"
            alt="image"
            class="w-[335px] h-[335px] md:w-[500px] md:h-[500px] rounded-20"
          />
          <CommonImage
            v-if="server"
            src="/svg/500-img.svg"
            alt="image"
            class="w-[335px] h-[335px] md:w-[500px] md:h-[500px] rounded-20"
          />
        </div>
      </div>
      <NuxtImg
        class="absolute bottom-0 left-0 z-0 hidden lg:block w-[370px]"
        src="/svg/404-left-pattern.svg"
        alt="image"
      />
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
const server = ref(false)

const error: any = useError()

const errorCode = computed(() =>
  error.value instanceof Error || !error.value ? 500 : error.value.statusCode
)

const errorMessage = computed(() =>
  error.value instanceof Error || !error.value
    ? 'Something went wrong'
    : error.value.statusMessage
)

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
