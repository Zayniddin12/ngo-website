// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: 'https://ngo.uicgroup.tech/',
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        moduleResolution: 'Node16',
      },
    },
  },

  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'NGO',
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      noscript: [
        {
          children:
            '<div><img src=“https://mc.yandex.ru/watch/97865248” style="position:absolute; left:-9999px;" alt="" /></div>',
        },
      ],
      script: [
        {
          children:
            '(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)}; \n' +
            ' m[i].l=1*new Date();\n' +
            'for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}\n' +
            'k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})\n' +
            '(window, document, “script”, “https://mc.yandex.ru/metrika/tag.js”, “ym”);\n' +
            'ym(97865248, “init”, {\n' +
            'clickmap:true,\n' +
            'trackLinks:true,\n' +
            'accurateTrackBounce:true\n' +
            '});',
        },
      ],
    },
  },

  css: ['~/assets/tailwind.css', '~/assets/_toastification.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-marquee',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // automatically imports `defineStore`
          ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
      },
    ],
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    'nuxt-security',
    'nuxt-svgo',
    '@nuxtjs/robots',
  ],

  i18n: {
    vueI18n: './i18n.config.ts',
    globalInjection: true, // if you are using custom path, default
  },

  security: {
    headers: {
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: false,
      permissionsPolicy: {
        geolocation: ['self'],
      },
    },
  },

  nitro: {
    serveStatic: true,
    compressPublicAssets: true,
  },

  svgo: {
    componentPrefix: 'i',
  },

  build: {
    transpile: ['vue-toastification'],
  },

  devServerHandlers: [],

  runtimeConfig: {
    public: {
      baseURL: 'localhost',
    },
  },

  compatibilityDate: '2024-07-10',
})
