<template>
  <div
    class="container min-[900px]:hidden flex justify-between sticky bottom-0 z-[100] bg-white border-t border-t-primary hidden-print"
  >
    <nuxt-link to="/">
      <div class="flex-center flex-col py-2.5 px-[4px] group cursor-pointer">
        <i-home
          class="icon text-2xl text-gray-400 group-hover:text-primary transition-300"
        />
        <p
          class="text-gray-400 text-[10px] mt-px font-medium text-center group-hover:text-primary transition-300"
        >
          {{ $t('home') }}
        </p>
      </div>
    </nuxt-link>
    <nuxt-link to="/residents">
      <div class="flex-center flex-col py-2.5 px-1 group cursor-pointer">
        <i-teamwork
          class="icon text-2xl text-gray-400 group-hover:text-primary transition-300"
        />
        <p
          class="text-gray-400 text-[10px] mt-px font-medium group-hover:text-primary text-center transition-300"
        >
          {{ $t('residents') }}
        </p>
      </div>
    </nuxt-link>
    <nuxt-link to="/projects">
      <div class="flex-center flex-col py-2.5 px-1 group cursor-pointer">
        <i-star-with-border
          class="icon text-2xl text-gray-400 group-hover:text-primary transition-300"
        />
        <p
          class="text-gray-400 text-[10px] mt-px font-medium group-hover:text-primary text-center transition-300"
        >
          {{ $t('projects') }}
        </p>
      </div>
    </nuxt-link>
    <nuxt-link to="/social">
      <div class="flex-center flex-col py-2.5 px-1 group cursor-pointer">
        <i-calendar
          class="icon text-2xl text-gray-400 group-hover:text-primary transition-300"
        />
        <p
          class="icon text-gray-400 text-[10px] mt-px font-medium group-hover:text-primary text-center transition-300"
        >
          {{ $t('events.short_btn') }}
        </p>
      </div>
    </nuxt-link>

    <nuxt-link to="/support-women">
      <div class="flex-center flex-col py-2.5 px-1 group cursor-pointer">
        <i-woman
          class="icon text-2xl text-gray-400 group-hover:text-primary transition-300"
        />
        <p
          class="text-gray-400 text-[10px] mt-px font-medium group-hover:text-primary text-center transition-300"
        >
          {{ $t('support_short') }}
        </p>
      </div>
    </nuxt-link>
  </div>
</template>
<script setup lang="ts"></script>
<style>
.router-link-active p {
  @apply !text-primary;
}

.router-link-active div .icon {
  @apply !text-primary;
}
</style>
