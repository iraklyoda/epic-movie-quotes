<template>
  <!--  Mobile Search -->
  <router-view class="z-20"></router-view>
  <aside
    v-if="pageStore.searchListOpen"
    class="absolute top-0 left-0 z-40 h-2/5 w-screen bg-searchBlue"
  >
    <nav class="ml-6 mt-6 flex items-center gap-6">
      <LeftArrowIcon class="scale-150" @click="pageStore.changeListSearch" />
      <div>
        <Form @submit="mobileListSubmit">
          <Field
            :placeholder="$t('search')"
            name="search"
            class="h-8 bg-transparent pl-2 focus:outline-none"
            v-model="searchValue"
          />
        </Form>
      </div>
    </nav>
    <div class="mt-3 w-full border-b-2 border-fadeGrey"></div>
  </aside>
  <!--  Movie List -->
  <div
    class="mx-6 ml-9 justify-between pt-8 pr-4 lg:relative lg:w-[80%] lg:pl-2"
  >
    <div class="flex w-full items-start justify-between">
      <div>
        <h3 class="text-sm sm:text-lg lg:text-2xl">
          {{ $t("myListOfMovies") }}
          <span class="invisible lg:visible"
            >({{ $t("total") }} {{ movie.movies.length }})</span
          >
        </h3>
        <p class="text-xs lg:hidden">
          ({{ $t("total") }} {{ movie.movies.length }})
        </p>
      </div>

      <div class="flex gap-1">
        <section
          class="ml-2 mt-1 hidden cursor-pointer items-center gap-3 lg:flex"
          v-if="!searchMode"
          @click="searchMode = !searchMode"
        >
          <search-icon class="w-5"></search-icon>
          <p class="text">{{ $t("searchBy") }}</p>
        </section>
        <section v-if="searchMode">
          <Form>
            <Field
              v-model="searchValue"
              name="search"
              :placeholder="$t('search')"
              class="rounded-md border-2 border-cinder bg-transparent py-2 pl-2 focus:outline-none"
              :class="{
                'w-4': !searchMode,
                'w-full transition-width': searchMode,
              }"
            />
          </Form>
        </section>
        <router-link
          :to="{ name: 'AddMovie' }"
          class="ml-2 flex items-center gap-2 whitespace-nowrap rounded-md bg-niceRed py-2 px-3 text-xs lg:text-lg"
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
        :quotes="movie.quotes.length"
      />
    </div>
  </div>
</template>

<script setup>
import MovieComponent from "@/components/movies_list/MovieComponent.vue";
import { ref, watch } from "vue";
import { RouterView } from "vue-router";
import { useMovieStore } from "@/stores/movie.js";
import { useUserStore } from "@/stores/user.js";
import { usePageStore } from "@/stores/page.js";
import { Form, Field } from "vee-validate";
const searchMode = ref(false);
const movie = useMovieStore();
const user = useUserStore();

const pageStore = usePageStore();

const searchValue = ref("");

function mobileListSubmit() {
  pageStore.changeListSearch();
}

watch(searchValue, () => {
  movie.searchMovies({
    search: searchValue.value,
  });
});
</script>
