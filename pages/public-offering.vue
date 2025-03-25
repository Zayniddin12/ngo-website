<template>
  <div class="w-screen min-h-svh">
    <LayoutOthersPage
      :title="data?.[0]?.name"
      :content="data?.[0]?.description"
      :loading="pending"
    />
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from "~/store/home";

const { data, pending } = await useAsyncData("public-offering", () =>
  useHomeStore().fetchDocumentPages()
);
</script>
