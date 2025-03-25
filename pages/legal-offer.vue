<template>
  <div class="w-screen min-h-svh">
    <LayoutOthersPage
      :title="data?.[1]?.name"
      :content="data?.[1]?.description"
      :loading="pending"
    />
  </div>
</template>
<script setup lang="ts">
import { useHomeStore } from "~/store/home";

const { data, pending } = await useAsyncData("terms-of-agreement", () =>
  useHomeStore().fetchDocumentPages()
);
</script>
