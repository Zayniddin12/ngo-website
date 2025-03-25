<template>
  <div class="relative">
    <div
      class="flex !gap-2.5 items-center py-7 overflow-x-hidden justify-center"
    >
      <div v-for="index in dataCols" :key="index">
        <div class="grid grid-cols-2 gap-2.5 w-[290px]">
          <div
            v-for="(img, indx) in imagesDatas.slice(index, index + 6)"
            :key="indx"
            :class="{
              'row-span-2 !h-[290px]':
                (indx === 0 && index % 2 === 0) ||
                (indx === 3 && index % 2 === 1),
              'col-span-2 !w-[290px]':
                (indx === 3 && index % 2 === 0) ||
                (indx === 0 && index % 2 === 1),
            }"
            class="w-[141px] h-[141px] rounded-lg"
          >
            <template
              v-if="isVideo(img)"
              :class="{
                '!h-[290px]':
                  (indx === 0 && index % 2 === 0) ||
                  (indx === 3 && index % 2 === 1),
                '!w-[290px]':
                  (indx === 3 && index % 2 === 0) ||
                  (indx === 0 && index % 2 === 1),
              }"
            >
              <video controls :src="img" />
            </template>
            <template v-else>
              <CommonImage
                class="object-cover w-[141px] h-[141px] rounded-lg"
                image-class="object-cover w-[141px] h-[141px] rounded-lg"
                :class="{
                  '!h-[290px]':
                    (indx === 0 && index % 2 === 0) ||
                    (indx === 3 && index % 2 === 1),
                  '!w-[290px]':
                    (indx === 3 && index % 2 === 0) ||
                    (indx === 0 && index % 2 === 1),
                }"
                :src="img"
                alt="images"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      class="w-full h-full absolute z-10 to-gray top-0 left-0"
      style="
        background: linear-gradient(
          180deg,
          rgba(245, 247, 245, 0.6) 0%,
          #f5f7f5 100%
        );
      "
    ></div>
    <div
      class="absolute w-full h-full z-20 top-0 left-0 flex items-center justify-center"
    >
      <img
        alt="image"
        src="/vidoes/Flag.gif"
        class="lg:h-[503px] lg:w-[479px] w-[200px] h-[214px]"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { mainAbout } from '~/data/index'

const imagesDatas = ref(mainAbout)
const dataCols = imagesDatas?.value?.length / 6
const isImage = (url) => /\.(jpeg|jpg|gif|png|svg|photos|webp)$/i.test(url)
const isVideo = (url) => /\.(mov|mp4|avi)$/i.test(url)
</script>
