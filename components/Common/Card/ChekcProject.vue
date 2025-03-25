<template>
  <div>
    <div
      class="rounded-xl border border-primary py-5 pl-6 pr-[30px] relative md:flex justify-between items-center bg-white"
    >
      <div>
        <h3 class="text-brand-black text-xl font-bold leading-130">
          {{ $t('check_project') }}
        </h3>
        <p
          class="text-gray-700 leading-140 text-sm font-medium mt-2 max-w-[372px]"
        >
          {{ $t('check_project_sub') }}
        </p>
      </div>
      <img
        class="absolute bottom-0 right-[30%] hidden md:block"
        src="/svg/show-hand.svg"
        alt="image"
      />

      <a target="_blank" :href="oneId?.one_id_url">
        <BaseButton
          :text="$t('get_project')"
          variant="green"
          class="mt-5 md:mt-0"
        >
          <template #suffix>
            <i-rocket class="!mb-0 text-2xl" />
          </template>
        </BaseButton>
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from '~/store/home'

const homeStore = useHomeStore()

const { data: oneId } = useAsyncData(async () => {
  const res = await homeStore.fetchOneId()
  if ('error' in res) {
    throw new Error('Not Found')
  }
  return res
})
</script>
