<template>
  <main
    class="lg:h-auto lg:overflow-auto"
    :class="{
      'h-screen overflow-hidden':
        route.name === 'Login' || route.name === 'Register',
    }"
  >
    <!--          Dialog  -->
    <RouterView />
    <!--            Dialog-->
    <div class="snap-y snap-mandatory h-screen overflow-scroll">
      <section
        class="text-white bg-darkBlue h-110 lg:h-screen font-helvetica snap-start"
      >
        <header class="flex justify-between mx-8 items-center">
          <p class="mt-8 text-skinWhite">{{ $t("movieQuotes") }}</p>
          <nav class="flex lg:gap-4">
            <div class="lg:flex">
              <LanguageChange class="mt-8 mr-2" />
              <button
                @click="router.push({ name: 'Register' })"
                class="block mx-auto bg-niceRed px-6 py-1 rounded mt-6 hidden lg:block"
              >
                {{ $t("signUp") }}
              </button>
            </div>
            <button
              class="mr-2 mt-6 border py-1.5 px-5 rounded"
              @click="router.push({ name: 'Login' })"
            >
              {{ $t("logIn") }}
            </button>
          </nav>
        </header>
        <p
          class="text-center text-xl text-skinWhite mt-32 w-80 mx-auto font-bold lg:text-6xl lg:leading-22.5 lg:mt-60 lg:w-176"
        >
          {{ $t("findAnyQuote") }}
        </p>
        <button
            @click="router.push({name: 'Login'})"
          class="block mx-auto bg-niceRed px-3 py-1.5 rounded mt-6 lg:px-4 lg:py-2"
        >
          {{ $t("getStarted") }}
        </button>
        <h3></h3>
      </section>
      <section class="text-white font-helvetica">
        <movie-component
          class="snap-center"
          v-for="movie in movies"
          :key="movie.name_year"
          :quote="movie.quote"
          :year="movie.name_year"
          :bg="movie.bg"
        ></movie-component>
      </section>
    </div>
    <footer class="bg-footerBlue py-3 lg:p-4">
      <p class="text-white text-xxs ml-8 font-medium font-helvetica lg:text-xs">
        &#169; {{ $t("rightsReserved") }}
      </p>
    </footer>
  </main>
</template>

<script setup>
import { RouterView, useRouter, useRoute } from "vue-router";

import MovieComponent from "@/components/landing_page/MovieComponent.vue";

const router = useRouter();
const route = useRoute();

const movies = {
  interstellar: {
    name_year: "interstellar",
    quote: "interstellarQuote",
    bg: "bg-interstellar",
  },
  royal: {
    name_year: "tenenbaums",
    quote: "tenenbaumsQuote",
    bg: "bg-royal",
  },
  lotr: {
    name_year: "lotr",
    quote: "lotrQuote",
    bg: "bg-lotr",
  },
};
</script>
