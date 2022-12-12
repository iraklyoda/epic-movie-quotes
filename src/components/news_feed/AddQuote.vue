<template>
  <router-link
    class="absolute left-0 top-0 z-30 h-screen w-screen lg:h-screen"
    :to="{ name: 'NewsFeed' }"
  >
  </router-link>
  <div
    class="absolute top-0 z-50 h-screen w-screen overflow-hidden overflow-scroll bg-darkBlue pt-7 pb-12 lg:left-[35rem] lg:top-24 lg:h-auto lg:w-200 lg:rounded-xl"
  >
    <div class="h-0.5"></div>
    <nav class="mx-9 flex items-center justify-between">
      <div class="w-3.5"></div>
      <p class="place-self-end text-xl">{{ $t("addQuote") }}</p>
      <router-link :to="{ name: 'NewsFeed' }">
        <CloseIcon class="w-3.5" />
      </router-link>
    </nav>
    <div class="mt-4 w-full border-b-2 border-fadeGrey"></div>
    <aside class="ml-9">
      <div class="mt-7 flex items-center gap-4">
        <img
          :src="profile.profilePicture"
          alt="profile picture"
          class="h-10 w-10 rounded-full object-cover object-center"
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
      <MovieInput
        id="quoteKa"
        name="quote_ka"
        :errors="errors.quote_ka"
        placeholder="ახალი ციტატა"
        rows="3"
        type="textarea"
        isQuote="true"
        rules="required|min:3|geo_char"
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
        rules="required|min:3|eng_char"
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
          class="relative mt-4 w-full rounded border-1 bg-transparent px-2.5 py-4 placeholder-white outline-none lg:py-2"
          :class="{
            'border-niceRed': !meta.valid && meta.touched,
            'border-validGreen': meta.valid && meta.touched,
            'border-4 border-dotted border-blue-700': isDragging,
            'border-niceGray': true,
          }"
        >
          <div class="flex justify-between lg:justify-start lg:gap-3">
            <div class="flex items-center gap-3">
              <camera-icon></camera-icon>
              <span class="mt-1 lg:hidden">{{ $t("uploadImage") }}</span>
              <span class="mt-1 hidden lg:block">{{ $t("dragAndDrop") }} </span>
            </div>
            <label
              for="movieImage"
              class="cursor-pointer self-center bg-fadePurple px-2 py-2 xs:whitespace-nowrap xs:text-xs md:text-base"
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
          class="relative mt-4 w-full rounded bg-black px-2.5 py-7 placeholder-white lg:py-2"
          :class="{
            'border-1 border-niceRed': !meta.valid && meta.touched,
            'border-1 border-validGreen': meta.valid && meta.touched,
          }"
        >
          <button type="button" @click="openMovies" class="w-full">
            <div class="flex items-center justify-between">
              <div v-if="chosenMovie === ''" class="flex items-center gap-4">
                <MovieIcon class="ml-2 w-6" />
                <p>{{ $t("chooseMovie") }}</p>
              </div>
              <div
                v-else
                class="block flex w-full cursor-pointer gap-2 rounded px-2.5 pb-2 lg:py-2"
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
          class="relative mt-1 h-24 h-32 w-full overflow-scroll rounded bg-black px-2.5 py-10 placeholder-white lg:py-2"
        >
          <div v-for="movie in movie.movies" v-bind:key="movie.title">
            <label
              class="block flex w-full cursor-pointer gap-2 rounded px-2.5 pb-7 hover:bg-niceGrey lg:py-2"
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
              class="pointer-events-none fixed opacity-0"
            />
          </div>
        </div>
      </Field>
      <button class="mt-4 w-full rounded-md bg-niceRed py-3 text-white lg:p-2">
        {{ $t("addQuote") }}
      </button>
    </Form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Form, Field, configure } from "vee-validate";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import axios from "@/config/axios/index.js";
import MovieIcon from "@/components/icons/MovieIcon.vue";
import { useMovieStore } from "@/stores/movie.js";
import { useUserStore } from "@/stores/user.js";
import { useAllQuotesStore } from "@/stores/allQuotes.js";
import { useProfileStore } from "@/stores/profile.js";
import router from "@/router";
const movie = useMovieStore();
const user = useUserStore();
const root = import.meta.env.VITE_APP_ROOT;
const profile = useProfileStore();

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
  const addQuote = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/quotes/create",
        quote,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      useAllQuotesStore().getNumberQuotes();
      router.push({ name: "NewsFeed" });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  addQuote();
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
