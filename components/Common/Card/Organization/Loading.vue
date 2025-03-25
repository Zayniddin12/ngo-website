<template>
  <div
    class="bg-white hover:border-primary transition-300 md:flex md:justify-between md:h-28 p-5 gap-2 rounded-2xl border border-gray-500 lg:grid-cols-4 grid grid-cols-1 items-center"
  >
    <div class="flex-y-center space-x-2.5 w-full">
      <div
        class="w-[50px] h-[50px] md:h-[72px] md:w-[72px] p-1.5 bg-white shadow-primary rounded-full shimmer shrink-0"
      />
      <div class="space-y-1 w-full">
        <h1 class="w-full h-5 shimmer rounded" />
        <div class="lg:hidden w-full">
          <p class="w-full h-5 shimmer rounded" />
        </div>
      </div>
    </div>
    <div class="hidden lg:block w-full">
      <p class="w-full h-5 shimmer rounded" />
    </div>
    <div class="hidden md:block w-full">
      <p class="w-full h-5 shimmer rounded" />
    </div>
    <div class="flex md:justify-end">
      <div class="min-w-32 h-9 rounded-lg shimmer" />
    </div>
  </div>
</template>
