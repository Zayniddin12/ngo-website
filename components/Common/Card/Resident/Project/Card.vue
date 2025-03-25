<template>
  <div
    class="w-full flex flex-col md:flex-row rounded-2xl bg-white p-5"
    :class="cardStyle"
  >
    <NuxtImg
      v-if="project?.image"
      alt="image"
      :src="project?.image || '/images/defaultImg-for-project.svg'"
      :class="ImgStyle"
      class="object-cover object-center w-[234px] aspect-[234/234] shrink-0 rounded-xl"
    />
    <div :class="{ 'ml-0': projects }" class="sm:ml-4">
      <p
        class="text-2xl font-extrabold text-brand-black leading-130 max-md:mt-3"
      >
        {{ project?.name }}
      </p>
      <CommonHashtag
        class="mt-3 mb-5"
        :list-with-slug="project?.tag"
        :is-loading="!!isLoading"
      />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <CommonCardProjectInfo
          v-bind="{
            price: project?.price,
            from: project?.from,
            to: project?.to,
            location: project?.location,
            status: project?.status,
          }"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  project?: any
  projects?: boolean
  cardStyle?: string
  ImgStyle?: string
  isLoading?: boolean
}

defineProps<Props>()
</script>

<style scoped></style>
