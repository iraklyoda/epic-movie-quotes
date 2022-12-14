<template>
  <router-link
      class="absolute top-0 z-30 h-auto w-full lg:h-screen"
      :to="{ name: 'MoviePage' }"
  >
  </router-link>
  <div class="h-screen w-screen">
    <div
      class="absolute top-0 left-0 z-40 h-screen w-screen overflow-scroll bg-darkBlue pb-4 pt-7  lg:relative lg:ml-36 lg:mt-4 lg:h-4/5 lg:w-3/5 lg:overflow-scroll lg:rounded-xl lg:pb-8"
    >
      <div class="h-0.5"></div>
      <nav class="mx-9 flex items-center justify-between">
        <div class="w-3.5"></div>
        <p class="place-self-end text-xl">{{ $t("addQuote") }}</p>
        <router-link
          :to="{ name: 'MoviePage', params: { id: route.params.id } }"
        >
          <CloseIcon class="w-3.5" />
        </router-link>
      </nav>
      <div class="mt-4 w-full border-b-2 border-fadeGrey"></div>
      <aside class="ml-9">
        <div class="mt-7 flex items-center gap-4">
          <img
            :src="profile.profilePicture"
            alt="profile picture"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p class="whitespace-nowrap text-xl">{{ profile.user.username }}</p>
          </div>
        </div>
      </aside>
      <Form
        @submit="onSubmit"
        class="mx-9 mt-7 lg:mx-0 lg:w-full lg:px-9"
        enctype="multipart/form-data"
        v-slot="{ errors }"
      >
        <Field
          name="movie"
          rules="required"
          v-for="movie in currentMovie"
          v-bind:key="movie.title"
          :value="movie.id"
        >
          <div
            class="relative mt-4 w-full rounded bg-black py-4 placeholder-white lg:bg-transparent lg:py-2"
          >
            <div class="flex items-center justify-between">
              <div
                class="block flex w-full gap-2 rounded px-2.5 pb-2 lg:py-2"
                :for="movie.title.en"
              >
                <img
                  :src="root + movie.image"
                  alt="movie"
                  class="w-4/12 rounded-lg object-cover xs:max-h-20 sm:max-h-52"
                />
                <div>
                  <p>
                    {{
                      user.currentLanguage === "Ka"
                        ? movie.title.ka
                        : movie.title.en
                    }}
                  </p>
                  <p>
                    <span class="text-lightGrey">{{ $t("director") }}:</span>
                    {{
                      user.currentLanguage === "Ka"
                        ? movie.director.ka
                        : movie.director.en
                    }}
                  </p>
                  <div class="flex flex-wrap gap-1">
                    <span
                      v-for="genre in movie.genres"
                      v-bind:key="genre"
                      class="flex items-center gap-2.5 bg-niceGrey px-2 py-1 text-sm text-white"
                      ><p>{{ genre }}</p></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Field>
        <MovieInput
          id="quoteKa"
          name="quote_ka"
          :errors="errors.quote_ka"
          placeholder="ახალი ციტატა"
          rows="3"
          type="textarea"
          isQuote="true"
          rules="required|min:3|geo_char"
        />
        <MovieInput
          id="quoteEn"
          name="quote_en"
          :errors="errors.quote_en"
          placeholder="Start create new quote"
          rows="3"
          type="textarea"
          isQuote="true"
          rules="required|min:3|eng_char"
        />
        <Field
          name="image"
          v-slot="{ handleChange, handleBlur, meta, value }"
          v-model="img"
          rules="required"
        >
          <div
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover.prevent
            @drop="onDrop"
            class="relative mt-4 w-full rounded border-1 border-niceGrey bg-transparent px-2.5 py-4 placeholder-white outline-none lg:py-2"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
              'border-4 border-dotted border-blue-700': isDragging,
            }"
          >
            <div class="flex justify-between lg:justify-start lg:gap-3">
              <div class="flex items-center gap-3">
                <camera-icon></camera-icon>
                <span class="mt-1 lg:hidden">{{ $t("uploadImage") }}</span>
                <span class="mt-1 hidden lg:block"
                  >{{ $t("dragAndDrop") }}
                </span>
              </div>
              <label
                for="movieImage"
                class="self-center bg-fadePurple px-2 py-2 xs:whitespace-nowrap xs:text-xs md:text-base"
                >{{ $t("chooseFile") }}</label
              >
            </div>
            <div v-if="value">
              {{ value.name }}
            </div>
            <input
              type="file"
              @change="handleChange"
              @blur="handleBlur"
              id="movieImage"
              placeholder="Choose file"
            />
          </div>
        </Field>
        <button
          class="mt-4 w-full rounded-md bg-niceRed hover:bg-hoverRed active:bg-activeRed py-3 text-white lg:p-2"
        >
          {{ $t("addQuote") }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { Form, Field } from "vee-validate";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { useRoute, useRouter } from "vue-router";
import axios from "@/config/axios/jwtAxios.js";
import axiosInstance from "@/config/axios/index.js";
import { useSingleStore } from "@/stores/single";
import { useUserStore } from "@/stores/user.js";
import { useProfileStore } from "@/stores/profile.js";
import { useMovieStore } from "@/stores/movie.js";
import { useAllQuotesStore } from "@/stores/allQuotes.js";
import MovieInput from "@/components/ui/movies/MovieInput.vue";

const movieList = useMovieStore();
const user = useUserStore();
const movie = useSingleStore();
const root = import.meta.env.VITE_APP_ROOT;
const route = useRoute();
const router = useRouter();
const profile = useProfileStore();
const currentMovie = ref([]);

onBeforeMount(() => {
  const getMovie = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/movies/movie/" + route.params.id
      );
      const movie = response.data;
      currentMovie.value.push({
        id: movie.id,
        image: movie.image,
        genres: movie.genres,
        title: movie.title,
        director: movie.director,
        description: movie.description,
      });
    } catch (e) {
      console.log(e);
    }
  };
  getMovie();
});

function onSubmit(values) {
  const quote = {
    movie_id: values.movie,
    quote_en: values.quote_en,
    quote_ka: values.quote_ka,
    thumbnail: values.image,
  };
  const addQuote = async () => {
    try {
      await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/create",
        quote,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      movieList.getMovies();
      useAllQuotesStore().currentPage = 1;
      useAllQuotesStore().Quotes = [];
      useAllQuotesStore().getQuotes();
      movie.getMovie(route.params.id);
      router.push({ name: "MoviePage", params: { id: route.params.id } });
    } catch (e) {
      console.log(e);
    }
  };
  addQuote();
  console.log(values);
}

const isDragging = ref(false);
const dragCount = ref(0);

const open = ref(false);
const chosenMovie = ref("");

watch(chosenMovie, () => {
  open.value = false;
});

const img = ref();

function onDragEnter(e) {
  e.preventDefault();
  dragCount.value++;
  isDragging.value = true;
}

function onDragLeave(e) {
  e.preventDefault();
  dragCount.value--;
  if (dragCount.value <= 0) {
    isDragging.value = false;
  }
}

function onDrop(e) {
  e.preventDefault();
  isDragging.value = false;
  document.getElementById("movieImage").files = e.dataTransfer.files;
  img.value = document.getElementById("movieImage").files[0];
}
</script>
