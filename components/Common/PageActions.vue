<template>
  <div class="space-y-2 md:space-y-5 hidden-print">
    <div class="w-full h-[1px] bg-gray-200" />

    <div
      class="flex flex-col-reverse gap-3 md:flex-row items-center justify-between"
    >
      <div class="flex max-sm:flex-col md:justify-auto gap-3 md:gap-5 w-full">
        <CommonShare title="" />
        <div class="relative">
          <CommonActionButton @action="copy(link)">
            <template #suffix>
              <div>
                <i-copy class="text-gray-700 text-xl" />
              </div>
            </template>
          </CommonActionButton>
          <BaseTooltip v-bind="{ show }">
            {{ $t('copied') }}
          </BaseTooltip>
        </div>
      </div>

      <div
        class="flex justify-between md:justify-auto gap-2.5 md:gap-4 items-center w-full md:w-max"
      >
        <CommonActionButton
          text-class="pl-4"
          class="!w-full md:!w-max"
          :text="$t('print_out')"
          icon="share"
          @action="print"
        >
          <template #suffix>
            <div>
              <i-printer class="text-gray-700 text-xl" />
            </div>
          </template>
        </CommonActionButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  viewsCount?: number
}>()

const link = ref('')
const show = ref(false)

if (process.client) {
  link.value = window.location.href
}

function print() {
  window.print()
}
function copy(text: string) {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)

  input.select()
  document.execCommand('copy')

  document.body.removeChild(input)

  show.value = true

  setTimeout(() => {
    show.value = false
  }, 1500)
}
</script>

<style scoped>
.shadow-drop {
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.01),
    0 60px 80px 0 rgba(0, 0, 0, 0.04);
}
</style>

<!--commit-->
