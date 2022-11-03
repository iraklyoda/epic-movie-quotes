<template>
  <main>
    <section class="text-white bg-darkBlue h-110 lg:h-screen font-helvetica">
      <header class="flex justify-between mx-8 items-center">
        <p class="mt-8 text-skinWhite">MOVIE QUOTES</p>
        <div class="flex lg:gap-4">
          <div class="lg:flex">
            <button
              class="px-6 py-1 justify-center items-center gap-2 mt-6 hidden lg:flex"
            >
              <p>Eng</p>
              <down-arrow></down-arrow>
            </button>
            <button
              class="block mx-auto bg-niceRed px-6 py-1 rounded mt-6 hidden lg:block"
            >
              Sign up
            </button>
          </div>
          <button class="mr-2 mt-6 border py-1.5 px-5 rounded">Log in</button>
        </div>
      </header>
      <p
        class="text-center text-xl mt-32 font-bold lg:text-6xl lg:leading-22.5 lg:mt-60"
      >
        Find any quote in <br />
        millions of movie lines
      </p>
      <button
        class="block mx-auto bg-niceRed px-3 py-1.5 rounded mt-6 lg:px-4 lg:py-2"
      >
        Get Started
      </button>
      <h3></h3>
    </section>
    <section class="text-white font-helvetica">
      <movie-component
        v-for="movie in movies"
        :key="movie.name_year"
        :quote="movie.quote"
        :year="movie.name_year"
        :bg="movie.bg"
      ></movie-component>
    </section>
  </main>
  <footer class="bg-footerBlue py-3 lg:p-4">
    <p class="text-white text-xxs ml-8 font-medium font-helvetica lg:text-xs">
      &#169; 2022 MOVIE QUOTES. ALL RIGHTS RESERVED.
    </p>
  </footer>
</template>

<script setup>
import MovieComponent from "@/components/landing_page/MovieComponent.vue";

const movies = {
  interstellar: {
    name_year: "Interstellar, 2014",
    quote: "You have to leave something behind to go forward",
    bg: "bg-interstellar",
  },
  royal: {
    name_year: "The Royal Tenebaums, 2001",
    quote:
      "I think we’re just gonna have to be secretly in love with search other and leave it that",
    bg: "bg-royal",
  },
  lotr: {
    name_year: "The Lord of the Rings, 2003",
    quote:
      "I see in your eyes the same fear that would take the heart of me....",
    bg: "bg-lotr",
  },
};
</script>
