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
      class="mx-auto w-4/5 pt-6 lg:w-full lg:pl-24"
      v-for="movie in movie.movie"
      v-bind:key="movie.title"
    >
      <h3 class="mb-4 hidden text-lg lg:block">{{ $t("movieDescription") }}</h3>
      <div class="lg:pl-25 gap-12 lg:flex">
        <div>
          <img
            :src="root + movie.image"
            alt="Movie Title"
            class="mx-auto h-80 rounded-xl object-cover lg:mx-0 lg:h-110 lg:w-200"
          />
          <div class="mt-4 hidden items-center gap-4 lg:flex">
            <div class="items-center gap-2 text-xl sm:hidden lg:flex">
              <h3>{{ $t("allQuotes") }}</h3>
              <p>({{ $t("total") }} {{ movie.quotes.length }})</p>
            </div>
            <div class="h-6 border-l-2 border-l-niceGrey text-sm"></div>
            <router-link
              :to="{ name: 'MovieQuote' }"
              class="hidden w-36 items-center gap-2 whitespace-nowrap rounded-md bg-niceRed py-2 px-3 lg:flex lg:w-auto"
            >
              <AddIcon />
              <p>{{ $t("addQuote") }}</p>
            </router-link>
          </div>
        </div>
        <div>
          <div class="my-4 hidden items-center lg:flex">
            <figcaption class="text-xl">
              {{ lang === "Ka" ? movie.title.ka : movie.title.en }}
            </figcaption>
            <div
              class="ml-48 flex w-24 justify-center gap-3 rounded-lg bg-headerBlue py-3"
            >
              <router-link :to="{ name: 'EditMovie' }">
                <EditIcon class="w-4" />
              </router-link>
              <div class="border-l-2 text-sm"></div>
              <DeleteIcon class="w-4" @click="destroyMovie(route.params.id)" />
            </div>
          </div>
          <div class="mt-7 flex flex-wrap gap-1 lg:w-96">
            <span
              v-for="genre in movie.genres"
              v-bind:key="genre"
              class="flex items-center gap-2.5 bg-niceGrey px-2 py-1 text-sm text-white"
              ><p>{{ genre }}</p></span
            >
          </div>
          <aside class="my-5 flex gap-2">
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
          class="whitespace mt-7 flex w-32 items-center gap-2 rounded-md bg-niceRed py-2 pl-3 lg:hidden lg:w-48"
        >
          <AddIcon />
          <p>{{ $t("addQuote") }}</p>
        </router-link>
      </div>
      <div
        class="mt-4 w-full max-w-3xl border-b-2 border-fadeGrey lg:hidden"
      ></div>
      <div class="lg:hidden">
        <h3 class="mt-8 text-xl">{{ $t("allQuotes") }}</h3>
        <p>({{ $t("total") }} {{ movie.quotes.length }})</p>
      </div>
      <!--      Quotes-->
      <div
        v-for="quote in movie.quotes"
        class="relative mt-6 bg-cinder lg:ml-24 lg:w-200 lg:rounded-2xl"
        v-bind:key="quote.quote"
      >
        <div class="mx-9">
          <div class="lg:flex lg:items-center lg:gap-8">
            <img
              :src="root + quote.thumbnail"
              alt="quote"
              class="h-36 w-full object-cover pt-5 lg:w-56"
            />
            <p class="mt-6 w-9/12 text-xl italic text-lightGrey">
              "{{ lang === "Ka" ? quote.quote.ka : quote.quote.en }}"
            </p>
            <DotsMenu
              class="mt-8 hidden cursor-pointer self-start lg:block"
              @click="toggleQuoteMenu(quote.id)"
            />
            <div
              v-if="openQuoteId === quote.id"
              class="absolute right-6 bottom-4 z-40 h-36 w-48 rounded-xl bg-headerBlue transition-transform lg:-right-36 lg:top-12"
            >
              <div class="mt-2 flex flex-col">
                <router-link
                  :to="{ name: 'ViewQuote', params: { quoteId: quote.id } }"
                  class="flex cursor-pointer items-center gap-3 py-2 pl-8 hover:bg-cinder"
                >
                  <EyeIcon />
                  <p>{{ $t("viewQuote") }}</p>
                </router-link>
                <router-link
                  :to="{ name: 'EditQuote', params: { quoteId: quote.id } }"
                  class="flex cursor-pointer items-center gap-3 py-2 pl-8 hover:bg-cinder"
                >
                  <EditIcon />
                  <p>{{ $t("edit") }}</p>
                </router-link>
                <div
                  @click="destroyQuote(quote.id)"
                  class="flex cursor-pointer items-center gap-3 py-2 pl-8 hover:bg-cinder"
                >
                  <DeleteIcon />
                  <p>{{ $t("delete") }}</p>
                </div>
              </div>
            </div>
            <div
              v-if="openQuoteId"
              class="fixed left-0 top-0 z-30 h-screen w-full"
              @click="openQuoteId = ''"
            ></div>
          </div>
          <div
            class="mt-4 hidden w-full border-b-2 border-fadeGrey lg:block"
          ></div>
          <div class="mt-4 w-full border-b-2 border-fadeGrey lg:hidden"></div>
          <section class="mt-2 flex items-center justify-between pb-4 text-xl">
            <div class="flex items-center">
              <span>{{ quote.comments.length }}</span>
              <CommentIcon class="ml-3" />
              <span class="ml-6">{{ quote.likes.length }}</span>
              <HeartIcon class="ml-3" />
            </div>
            <DotsMenu
              class="cursor-pointer lg:hidden"
              @click="toggleQuoteMenu(quote.id)"
            />
          </section>
        </div>
      </div>
    </figure>

    <!--    Quotes    -->
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
import { useSingleStore } from "@/stores/single.js";
const movie = useSingleStore();
const route = useRoute();
const router = useRouter();
const quotesStore = useQuotesStore();
const quote = useQuoteStore();
const movies = useMovieStore();

console.log(movie.movie);

const openQuoteId = ref("");

function destroyQuote(id) {
  const destroy = async () => {
    await quote.deleteQuote(id);
    movie.getMovie(route.params.id);
  }
  destroy();
}

function destroyMovie(id) {
  router.push({ name: "MovieList" });
  movie.deleteMovie(id);
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
  movie.getMovie(route.params.id);
});

const root = import.meta.env.VITE_APP_ROOT;
</script>
