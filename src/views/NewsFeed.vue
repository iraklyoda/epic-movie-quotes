<template>
  <!--        Posts        -->
  <div class="lg:ml-[15%] relative">
    <div class="lg:flex items-center justify-center">
      <RouterView class="z-20 lg:top-24"/>
      <section
        class="bg-footerBlue py-5 flex gap-3 lg:bg-headerBlue lg:py-2 lg:mt-6 lg:rounded-lg lg:-mb-2 lg:ml-8 lg:w-4/5 relative"
      >
        <write-icon class="ml-9 w-5 lg:ml-3"></write-icon>
        <router-link :to="{ name: 'AddQuote' }">
          <p>{{ $t("writeNewQuote") }}</p>
        </router-link>
      </section>
      <section class="hidden lg:flex mt-7 ml-2 gap-3 items-center">
        <search-icon class="w-5"></search-icon>
        <p class="text">{{ $t("searchBy") }}</p>
      </section>
    </div>
    <post-component v-for="post in quotesStore.quotes" v-bind:key="post.id" :quote="post.quote" :image="post.image"></post-component>
  </div>
</template>

<script setup>
import PostComponent from "@/components/news_feed/PostComponent.vue";
import { RouterView } from "vue-router";
import { useQuotesStore } from "@/stores/quotes.js";
const quotesStore = useQuotesStore();

</script>
