<template>
  <div
    class="sm:flex-y-center flex-col shrink-0 sm:w-[560px] max-sm:w-full gap-3"
  >
    <div
      class="flex sm:flex-row-reverse flex-col-reverse rounded-20 overflow-hidden bg-white border-2 border-gray-500 backdrop-blur w-full"
    >
      <div class="w-full p-5">
        <div class="w-full mb-6">
          <span class="h-5 w-[75%] rounded-lg shimmer" />
          <span class="h-5 w-[100%] rounded-lg shimmer" />
        </div>
        <div v-for="key in 3" key class="flex items-center gap-2.5 w-full">
          <span class="w-4 h-4 shimmer" />
          <div class="w-full block">
            <p class="shimmer w-1/2 rounded-lg h-2 block" />
            <div class="w-full p-0 m-0">
              <span class="shimmer w-[30%] rounded-lg h-2" />
            </div>
          </div>
        </div>
      </div>
      <div
        class="max-sm:!w-full sm:max-w-[240px] shrink-0 sm:w-[240px] h-[260px] shimmer"
      />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
