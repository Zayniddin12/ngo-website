<template>
  <div class="app">
    <Html :lang="head.htmlAttrs!.lang" :dir="head.htmlAttrs!.dir">
      <Head>
        <Title>{{ $t('website_title') }}</Title>
        <Link
          v-for="link in head.link"
          :id="link.id"
          :key="link.id"
          :rel="link.rel"
          :href="link.href"
          :hreflang="link.hreflang"
        />
        <Meta
          v-for="meta in head.meta"
          :id="meta.id"
          :key="meta.id"
          :property="meta.property"
          :content="meta.content"
        />
      </Head>
      <Body class="bg-gray">
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </Body>
    </Html>
  </div>
</template>
<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

useSeoMeta({
  title: 'NGO',
  description: 'NGO title',
  ogTitle: 'NGO',
  ogDescription: 'NGO title',
  twitterTitle: 'NGO',
  twitterDescription: 'NGO title',
  ogImage: '/og.png',
  twitterImage: '/og.png',
})
</script>
