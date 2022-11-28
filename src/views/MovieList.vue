<template>
  <div
    class="lg:relative mt-8 justify-between mx-6 lg:w-[80%] pr-4 ml-9 lg:pl-2"
  >
    <router-view class="z-20"></router-view>
    <div class="flex justify-between items-start w-full">
      <div>
        <h3 class="text-sm sm:text-lg lg:text-2xl">
          {{ $t("myListOfMovies") }}
          <span class="invisible lg:visible">({{ $t("total") }} {{movie.movies.length}} )</span>
        </h3>
        <p class="text-xs lg:hidden">({{ $t("total") }} {{movie.movies.length}})</p>
      </div>

      <div class="flex gap-1">
        <section class="hidden lg:flex ml-2 mt-1 gap-3 items-center">
          <search-icon class="w-5"></search-icon>
          <p class="text">{{ $t("searchBy") }}</p>
        </section>
        <router-link
          :to="{ name: 'AddMovie' }"
          class="flex items-center ml-2 gap-2 bg-niceRed text-xs lg:text-lg whitespace-nowrap py-2 px-3 rounded-md"
        >
          <AddIcon />
          <p>{{ $t("addMovie") }}</p>
        </router-link>
      </div>
    </div>
    <div class="mt-3 lg:grid lg:grid-cols-3 lg:gap-x-10 lg:gap-y-4">
      <MovieComponent
        v-for="movie in movie.movies"
        v-bind:key="movie.title"
        :title="user.currentLanguage === 'Ka' ? movie.title.ka : movie.title.en"
        :id="movie.id"
        :img="movie.image"
      />
    </div>
  </div>
</template>

<script setup>

import MovieComponent from "@/components/movies_list/MovieComponent.vue";
import { RouterView } from "vue-router";
import { useMovieStore } from "@/stores/movie.js";
import { useUserStore } from "@/stores/user.js";

const movie = useMovieStore();
const user = useUserStore();

</script>
