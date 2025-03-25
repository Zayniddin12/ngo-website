<!-- eslint-disable vue/no-v-html -->
<template>
  <div
    v-if="!loading"
    :class="{
      'h-[366px] !p-6 flex flex-col justify-between gap-3': isService,
      '!h-[260px] !bg-white/90 backdrop-blur-[30px] hover:border-white/10 !p-6':
        isResident,
      '!bg-gray border-white hover:border-primary backdrop-blur !p-5 max-sm:!pb-0':
        isGrant,
      'hover:!bg-primary group hover:-translate-y-2': !isGrant,
    }"
    class="p-5 max-[500px]:p-3 relative rounded-20 bg-white border-2 border-gray-500 border-solid transition-300 cursor-pointer active:scale-100 overflow-hidden"
  >
    <template v-if="isService">
      <div>
        <CommonImage
          class="group-hover:opacity-70 w-16"
          :src="imgSrc"
          alt="image"
        />
        <p
          class="text-brand-black min-h-[50px] text-xl font-extrabold leading-tight transition-300 group-hover:text-white mb-4 mt-7"
        >
          {{ card?.name }}
        </p>
        <p
          class="text-sm font-semibold line-clamp-3 leading-snug text-gray-700 transition-300 group-hover:text-white/60"
          v-html="card?.description"
        />
      </div>
    </template>
    <template v-else>
      <div
        v-if="isResident && step % 2 == 1"
        class="font-extrabold leading-130 text-primary text-5xl align-self-stretch group-hover:text-white mb-4"
      >
        {{ step }}
      </div>
      <CommonImage
        v-if="isService"
        class="group-hover:opacity-70 w-16"
        :src="imgSrc"
        alt="image"
      />
      <p
        :class="{
          'line-clamp-2 !mt-0 !leading-130 !text-xl': isGrant,
          '!text-xl': isService,
          '!mt-0 !mb-3': isResident,
        }"
        class="text-brand-black text-xl max-[500px]:text-lg font-extrabold leading-tight transition-300 group-hover:text-white mb-4 mt-7"
      >
        {{ card?.name }}
      </p>

      <p
        :class="{
          'line-clamp-2': isGrant,
          'line-clamp-4': !isGrant,
          '!line-clamp-3': isService || isResident,
        }"
        class="text-sm font-semibold leading-snug text-gray-700 transition-300 group-hover:text-white/60"
        v-html="card?.description"
      />
    </template>

    <div v-if="isService" class="flex-y-center justify-between w-full">
      <NuxtLink to="/about-us/#our-services">
        <BaseButton
          variant="outline-white"
          class="group-hover:text-primary group-hover:border-primary !py-3 !px-6 !text-sm !font-bold !leading-130"
          :text="$t('more')"
        />
      </NuxtLink>
      <i-arrow-right class="text-2xl text-gray-600 group-hover:text-white" />
    </div>
    <div v-if="isGrant" class="mt-5">
      <template v-if="!loading">
        <div class="flex items-center gap-4 mb-5">
          <div class="bg-primary w-1 h-9 rounded-xl group-hover:bg-white/40" />
          <div>
            <p class="text-gray-700 font-normal text-sm leading-tight">
              {{ $t('category') }}
            </p>
            <p
              class="text-brand-black text-base leading-tight font-bold mt-1 group-hover:text-white"
            >
              {{ card.category.name }}
            </p>
          </div>
        </div>
        <div class="flex items-center gap-4 mb-5">
          <div class="bg-primary w-1 h-9 rounded-xl group-hover:bg-white/40" />
          <div>
            <p class="text-gray-700 font-normal text-sm leading-tight">
              {{ $t('page.grants.date') }}
            </p>
            <p
              class="text-brand-black text-base leading-tight font-bold mt-1 group-hover:text-white"
            >
              {{ dayjs(new Date(card.end_date)).format('DD.MM.YYYY') }}
            </p>
          </div>
        </div>
      </template>
    </div>
    <div
      v-if="isGrant"
      class="-mb-6 max-[500px]:-mb-1 mt-10 text-center w-full py-3.5 px-5 bg-primary justify-between rounded-t-[20px] flex gap-4 items-center"
    >
      <p
        class="text-white/70 text-sm font-medium leading-tight max-w-24 text-left"
      >
        {{ $t('page.grants.sum') }}
      </p>
      <p
        class="text-white font-bold max-[500px]:font-normal text-end leading-tight w-full text-xl max-[500px]:text-sm"
      >
        {{ formatNumberSpace(card.price || '0') }}
        <span
          class="text-base max-[500px]:text-sm text-white/70 font-bold ml-2 max-[500px]:ml-0"
        >
          <!--          TODO: Change to dynamic language -->
          <!--          {{ $t('sum_single') }}-->
          UZS
        </span>
      </p>
    </div>
    <div
      v-if="isResident && step % 2 == 0"
      class="font-extrabold leading-130 text-primary text-5xl align-self-stretch pt-4 group-hover:text-white"
    >
      {{ step }}
    </div>
  </div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'

interface Props {
  loading?: boolean
  isGrant?: boolean
  isService?: boolean
  isResident?: boolean
  card: any
  step: number
}

const props = defineProps<Props>()

const { isValidImageUrl } = useValidImage()

const imgSrc = ref('/svg/Icon.svg')

onMounted(async () => {
  imgSrc.value = await isValidImageUrl(props.card?.image, '/svg/Icon.svg')
})
</script>
