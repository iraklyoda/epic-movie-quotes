<template>
  <movie-dialog
    route="MoviePage"
    class="lg:mt-24 h-screen"
  >
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:w-240 lg:h-auto lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="w-3.5"></div>
        <p class="text-xl place-self-end">{{ $t("viewQuote") }}</p>
        <router-link to="">
          <CloseIcon class="w-3.5" />
        </router-link>
      </nav>
      <div class="h-screen lg:h-12"></div>
    </div>
  </movie-dialog>
</template>

<script setup>
</script>
