<template>
  <div class="grid gap-4">
    <span
      v-for="key in 3"
      :key="key"
      class="shimmer shrink-0 !bg-[#edeef1] w-full h-[82px] rounded-2xl mb-4"
    />
  </div>
</template>
<script setup lang="ts"></script>
