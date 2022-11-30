<template>
  <router-view></router-view>
  <div
    v-if="
      route.name !== 'MovieQuote' &&
      route.name !== 'EditMovie' &&
      route.name !== 'ViewQuote' &&
      route.name !== 'EditQuote'
    "
  >
    <figure
      class="pt-6 w-4/5 mx-auto lg:w-full lg:pl-24"
      v-for="movie in movie.movie"
      v-bind:key="movie.title"
    >
      <h3 class="hidden lg:block text-lg mb-4">{{ $t("movieDescription") }}</h3>
      <div class="lg:flex gap-12 lg:pl-25">
        <div>
          <img
            :src="root + movie.image"
            alt="Movie Title"
            class="mx-auto h-80 lg:mx-0 lg:w-200 lg:h-110 object-cover rounded-xl"
          />
          <div class="items-center gap-4 mt-4 hidden lg:flex">
            <div class="sm:hidden lg:flex items-center gap-2 text-xl">
              <h3>{{ $t("allQuotes") }}</h3>
              <p>({{ $t("total") }} {{ quotesStore.quotes.length }})</p>
            </div>
            <div class="border-l-2 border-l-niceGrey text-sm h-6"></div>
            <router-link
              :to="{ name: 'MovieQuote' }"
              class="items-center w-36 lg:w-auto gap-2 bg-niceRed py-2 px-3 whitespace-nowrap rounded-md hidden lg:flex"
            >
              <AddIcon />
              <p>{{ $t("addQuote") }}</p>
            </router-link>
          </div>
        </div>
        <div>
          <div class="hidden lg:flex items-center my-4">
            <figcaption class="text-xl">
              {{ lang === "Ka" ? movie.title.ka : movie.title.en }}
            </figcaption>
            <div
              class="flex ml-48 bg-headerBlue gap-3 w-24 justify-center py-3 rounded-lg"
            >
              <router-link :to="{ name: 'EditMovie' }">
                <EditIcon class="w-4" />
              </router-link>
              <div class="border-l-2 text-sm"></div>
              <DeleteIcon class="w-4" @click="destroyMovie(route.params.id)" />
            </div>
          </div>
          <div class="flex flex-wrap gap-1 mt-7">
            <span
              v-for="genre in movie.genres"
              v-bind:key="genre"
              class="bg-niceGrey text-white px-2 py-1 flex text-sm gap-2.5 items-center"
              ><p>{{ genre }}</p></span
            >
          </div>
          <aside class="flex my-5 gap-2">
            <p class="text-lightGrey">{{ $t("director") }}:</p>
            <p>
              {{ lang === "Ka" ? movie.director.ka : movie.director.en }}
            </p>
          </aside>
          <p class="mt-5 lg:w-96">
            {{ lang === "Ka" ? movie.description.ka : movie.description.en }}
          </p>
        </div>
        <router-link
          :to="{ name: 'MovieQuote' }"
          class="flex items-center w-32 lg:w-48 mt-7 gap-2 bg-niceRed py-2 pl-3 whitespace rounded-md lg:hidden"
        >
          <AddIcon />
          <p>{{ $t("addQuote") }}</p>
        </router-link>
      </div>
      <div
        class="border-b-2 mt-4 border-fadeGrey w-full max-w-3xl lg:hidden"
      ></div>
      <div class="lg:hidden">
        <h3 class="text-xl mt-8">{{ $t("allQuotes") }}</h3>
        <p>({{ $t("total") }} {{ quotesStore.quotes.length }})</p>
      </div>
    </figure>

    <!--    Quotes    -->
    <div
      v-for="quote in quotesStore.quotes"
      class="mt-6 lg:ml-24 lg:w-200 bg-cinder lg:rounded-2xl relative"
      v-bind:key="quote.quote"
    >
      <div class="mx-9">
        <div class="lg:flex lg:items-center lg:gap-8">
          <img
            :src="root + quote.thumbnail"
            alt="quote"
            class="pt-5 h-36 w-full lg:w-56 object-cover"
          />
          <p class="text-xl text-lightGrey w-9/12 mt-6 italic">
            "{{ lang === "Ka" ? quote.quote.ka : quote.quote.en }}"
          </p>
          <DotsMenu
            class="self-start mt-8 cursor-pointer hidden lg:block"
            @click="toggleQuoteMenu(quote.id)"
          />
          <div
            v-if="openQuoteId === quote.id"
            class="bg-headerBlue w-48 h-36 absolute right-6 bottom-4 lg:-right-36 lg:top-12 transition-transform rounded-xl z-40"
          >
            <div class="flex flex-col mt-2">
              <router-link
                :to="{ name: 'ViewQuote', params: { quoteId: quote.id } }"
                class="flex items-center gap-3 hover:bg-cinder cursor-pointer pl-8 py-2"
              >
                <EyeIcon />
                <p>{{ $t("viewQuote") }}</p>
              </router-link>
              <router-link
                :to="{ name: 'EditQuote', params: { quoteId: quote.id } }"
                class="flex items-center gap-3 hover:bg-cinder cursor-pointer pl-8 py-2"
              >
                <EditIcon />
                <p>{{ $t("edit") }}</p>
              </router-link>
              <div
                @click="destroyQuote(quote.id)"
                class="flex items-center gap-3 hover:bg-cinder cursor-pointer pl-8 py-2"
              >
                <DeleteIcon />
                <p>{{ $t("delete") }}</p>
              </div>
            </div>
          </div>
          <div
            v-if="openQuoteId"
            class="fixed w-full h-screen left-0 top-0 z-30"
            @click="openQuoteId = ''"
          ></div>
        </div>
        <div
          class="border-b-2 mt-4 border-fadeGrey w-full hidden lg:block"
        ></div>
        <div class="border-b-2 mt-4 border-fadeGrey w-full lg:hidden"></div>
        <section class="mt-2 pb-4 text-xl flex items-center justify-between">
          <div class="flex items-center">
            <span>3</span>
            <CommentIcon class="ml-3" />
            <span class="ml-6">10</span>
            <HeartIcon class="ml-3" />
          </div>
          <DotsMenu class="lg:hidden cursor-pointer" @click="toggleQuoteMenu(quote.id)" />
        </section>
      </div>
    </div>
    <!--    Quotes   -->
  </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from "vue";
import i18n from "@/config/i18n";
import { useRoute, useRouter, RouterView } from "vue-router";
import DeleteIcon from "@/components/icons/DeleteIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import { useQuoteStore } from "@/stores/quote.js";
import { useQuotesStore } from "@/stores/quotes.js";
import { useMovieStore } from "@/stores/movie.js";
const route = useRoute();
const router = useRouter();
const quotesStore = useQuotesStore();
const quote = useQuoteStore();
const movies = useMovieStore();

import { useSingleStore } from "@/stores/single.js";

const movie = useSingleStore();

const openQuoteId = ref("");

function destroyQuote(id) {
  quote.deleteQuote(id);
  quotesStore.getQuotes(route.params.id);
  movies.getMovies();
}

function destroyMovie(id) {
  router.push({ name: "MovieList" });
  movie.deleteMovie(id);
  movies.getMovies();
}

function toggleQuoteMenu(quoteId) {
  if (quoteId === openQuoteId.value) {
    openQuoteId.value = "";
  } else {
    openQuoteId.value = quoteId;
  }
}

const lang = computed(() => {
  if (i18n.global.locale.value === "ka") {
    return "Ka";
  } else {
    return "En";
  }
});

onBeforeMount(() => {
  const getMovies = async () => {
    await movie.getMovie(route.params.id);
  };
  getMovies();
  quotesStore.getQuotes(route.params.id);
});

const root = import.meta.env.VITE_APP_ROOT;
</script>
