<template>
  <div class="bg-white w-full p-4 rounded-20">
    <div class="flex justify-between items-start mb-4">
      <div class="flex-y-center gap-3">
        <div class="w-[50px] h-[50px] shimmer shrink-0 rounded-full" />
        <div>
          <p class="shimmer h-4 w-[130px] rounded" />
          <div>
            <span class="shimmer h-2 w-[100px] rounded" />
          </div>
          <div class="flex-y-center gap-2">
            <span
              v-for="key in 2"
              :key
              class="shimmer h-8 w-24 mt-1 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>

    <p v-for="key in 2" :key class="w-full h-4 rounded shimmer" />
  </div>
</template>
<script setup lang="ts"></script>
