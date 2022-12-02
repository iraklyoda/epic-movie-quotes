<template>
  <movie-dialog route="NewsFeed">
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:overflow-auto lg:w-200 lg:h-auto lg:rounded-xl lg:overflow-x-hidden"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="w-3.5"></div>
        <p class="text-xl place-self-end">{{ $t("addQuote") }}</p>
        <router-link :to="{ name: 'NewsFeed' }">
          <CloseIcon class="w-3.5" />
        </router-link>
      </nav>
      <div class="border-b-2 mt-4 border-fadeGrey w-full"></div>
      <aside class="ml-9">
        <div class="mt-7 flex items-center gap-4">
          <img
            src="@/assets/images/user/profile_picture.png"
            alt="profile picture"
            class="w-10"
          />
          <div>
            <p class="text-xl whitespace-nowrap">Nino Tabagari</p>
          </div>
        </div>
      </aside>
      <Form
        @submit="onSubmit"
        class="mx-9 lg:mx-0 lg:px-9 mt-7 lg:w-full"
        enctype="multipart/form-data"
        v-slot="{ errors }"
      >
        <MovieInput
          id="quoteKa"
          name="quote_ka"
          :errors="errors.quote_ka"
          placeholder="ახალი ციტატა"
          rows="3"
          type="textarea"
          isQuote="true"
          rules="required"
          lang="ქარ"
        />
        <MovieInput
          id="quoteEn"
          name="quote_en"
          :errors="errors.quote_en"
          placeholder="Start create new quote"
          rows="3"
          type="textarea"
          isQuote="true"
          rules="required"
          lang="Eng"
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
            class="relative mt-4 bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-4 rounded lg:py-2 outline-none"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
              'border-dotted border-4 border-blue-700': isDragging,
            }"
          >
            <div class="flex justify-between lg:justify-start lg:gap-3">
              <div class="flex gap-3 items-center">
                <camera-icon></camera-icon>
                <span class="mt-1 lg:hidden">{{ $t("uploadImage") }}</span>
                <span class="mt-1 hidden lg:block"
                  >{{ $t("dragAndDrop") }}
                </span>
              </div>
              <label
                for="movieImage"
                class="bg-fadePurple px-2 py-2 self-center xs:text-xs xs:whitespace-nowrap md:text-base"
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
        <Field
          name="movie"
          rules="required"
          v-slot="{ meta }"
          v-model="chosenMovie"
        >
          <div
            class="relative mt-4 bg-black placeholder-white w-full px-2.5 py-7 rounded lg:py-2"
            :class="{
              'border-niceRed border-1': !meta.valid && meta.touched,
              'border-validGreen border-1': meta.valid && meta.touched,
            }"
          >
            <button type="button" @click="openMovies" class="w-full">
              <div class="flex items-center justify-between">
                <div v-if="chosenMovie === ''" class="flex items-center gap-4">
                  <MovieIcon class="w-6 ml-2" />
                  <p>{{ $t("chooseMovie") }}</p>
                </div>
                <div
                  v-else
                  class="w-full px-2.5 pb-2 rounded lg:py-2 block flex gap-2 cursor-pointer"
                  @click="setMovie"
                  :for="chosenMovie.title.en"
                >
                  <img
                    :src="root + chosenMovie.image"
                    alt="movie"
                    class="w-32 rounded-lg"
                  />
                  <div>
                    <p>
                      {{
                        user.currentLanguage === "Ka"
                          ? chosenMovie.title.ka
                          : chosenMovie.title.en
                      }}
                    </p>
                    <p>
                      {{ $t("director") }}:
                      {{
                        user.currentLanguage === "Ka"
                          ? chosenMovie.director.ka
                          : chosenMovie.director.en
                      }}
                    </p>
                  </div>
                </div>
                <DownArrow
                  class="mr-3 transition-transform"
                  :class="{ 'rotate-180': open }"
                />
              </div>
            </button>
          </div>
          <div
            v-if="open"
            class="relative mt-1 bg-black placeholder-white w-full px-2.5 py-10 rounded lg:py-2 overflow-scroll h-24"
          >
            <div v-for="movie in movie.movies" v-bind:key="movie.title">
              <label
                class="w-full px-2.5 pb-7 rounded lg:py-2 block flex gap-2 hover:bg-niceGrey cursor-pointer"
                @click="setMovie"
                :for="movie.title.en"
                ><img
                  :src="root + movie.image"
                  alt="movie"
                  class="w-32 rounded-lg"
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
                    {{ $t("director") }}:
                    {{
                      user.currentLanguage === "Ka"
                        ? movie.director.ka
                        : movie.director.en
                    }}
                  </p>
                </div>
              </label>
              <input
                type="radio"
                :id="movie.title.en"
                :value="movie"
                v-model="chosenMovie"
                class="fixed opacity-0 pointer-events-none"
              />
            </div>
          </div>
        </Field>
        <button
          class="bg-niceRed py-3 mt-4 w-full rounded-md text-white lg:p-2"
        >
          {{ $t("addQuote") }}
        </button>
      </Form>
      <div class="h-screen lg:h-12"></div>
    </div>
  </movie-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { Form, Field, configure } from "vee-validate";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import axios from "@/config/axios/index.js";
import MovieIcon from "@/components/icons/MovieIcon.vue";
import { useMovieStore } from "@/stores/movie.js";
import { useUserStore } from "@/stores/user.js";
const movie = useMovieStore();
const user = useUserStore();
const root = import.meta.env.VITE_APP_ROOT;

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

function onSubmit(values) {
  const quote = {
    movie_id: values.movie.id,
    quote_en: values.quote_en,
    quote_ka: values.quote_ka,
    thumbnail: values.image,
  };
  console.log(quote);
  axios
    .post(import.meta.env.VITE_APP_ROOT_API + "/quotes/create", quote, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

const isDragging = ref(false);
const dragCount = ref(0);

const open = ref(false);
const chosenMovie = ref("");

watch(chosenMovie, () => {
  open.value = false;
});

function openMovies() {
  open.value = !open.value;
}

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
