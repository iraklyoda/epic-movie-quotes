<template>
  <!--        Posts        -->
  <div class="lg:ml-[15%]">
    <div class="lg:flex items-center justify-center">
      <section
        class="bg-footerBlue py-5 flex gap-3 lg:bg-headerBlue lg:py-2 lg:mt-6 lg:rounded-lg lg:-mb-2 lg:ml-8 lg:w-4/5"
      >
        <write-icon class="ml-9 w-5 lg:ml-3"></write-icon>
        <p>{{ $t("writeNewQuote") }}</p>
      </section>
      <section class="hidden lg:flex mt-7 ml-2 gap-3 items-center">
        <search-icon class="w-5"></search-icon>
        <p class="text">{{ $t("searchBy") }}</p>
      </section>
    </div>
    <post-component></post-component>
    <post-component></post-component>
    <post-component></post-component>
    <post-component></post-component>
  </div>
</template>

<script setup>
import PostComponent from "@/components/news_feed/PostComponent.vue";
</script>
