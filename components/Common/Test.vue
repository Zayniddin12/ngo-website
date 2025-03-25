<template>
  <div class="sticky z-30 w-full top-0 right-0 marquee-container py-3 block">
    <div class="marquee w-full flex justify-around gap-5">
      <div v-for="item in 100" :key="item">
        <div class="flex items-center gap-5">
          <p
            class="font-normal text-[11px] text-white leading-[13px] opacity-80"
          >
            {{ $t('site_working_on_test_mode') }}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
          >
            <circle
              opacity="0.4"
              cx="14.5"
              cy="14"
              r="5.75"
              stroke="white"
              stroke-width="0.5"
            />
            <g opacity="0.6" filter="url(#filter0_f_5745_31286)">
              <circle cx="14.5" cy="14" r="4" fill="white" />
            </g>
            <circle cx="14.5" cy="14" r="4" fill="white" />
            <defs>
              <filter
                id="filter0_f_5745_31286"
                x="0.5"
                y="0"
                width="28"
                height="28"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="5"
                  result="effect1_foregroundBlur_5745_31286"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.marquee-container {
  overflow: hidden;
  line-height: 30px;
  background: #62ad5a;
}

.marquee-container .marquee {
  white-space: nowrap;
  animation: marquee 90s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(-10%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
