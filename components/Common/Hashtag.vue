<template>
  <div class="flex flex-wrap gap-2">
    <template v-if="isLoading">
      <span
        v-for="item in iterableNumber"
        :key="item"
        class="shimmer !bg-[#edeef1] w-[70px] h-[21px] mb-[10px] rounded-lg"
        :class="{ '!w-[164px]': item % 2 === 0 }"
      />
    </template>
    <template v-else-if="list">
      <p
        v-for="(item, idx) in list"
        :key="idx"
        class="px-4 py-2.5 bg-gray border border-gray-500 rounded-lg text-[#171717] text-sm leading-130 font-medium"
      >
        #{{ item.name }}
      </p>
    </template>
    <template v-else-if="listWithSlug">
      <p
        v-for="(item, idx) in listWithSlug"
        :key="idx"
        class="px-3 py-2 duration-300 border border-[#13161214] hover:text-primary hover:bg-[#62ad5a1a] hover:border-[#62ad5a1a] rounded-lg text-[#686A67] text-sm leading-130 font-semibold cursor-pointer"
        @click="handleClick(item?.slug)"
      >
        # {{ item.name }}
      </p>
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  list?: string[]
  loadingIterableNumber?: number
  isLoading?: boolean
  listWithSlug?: {
    name: string
    slug?: string
  }[]
}
const props = defineProps<Props>()
const router = useRouter()

const handleClick = (slug?: string) => {
  if (slug) {
    router.push(`${slug}`)
  }
}
const iterableNumber = ref(props.loadingIterableNumber ?? 7)
</script>
