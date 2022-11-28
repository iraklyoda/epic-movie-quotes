<template>
  <movie-dialog
    route="MoviePage"
    :param="{ id: route.params.id }"
    class="lg:mt-24"
  >
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:overflow-auto lg:w-200 lg:h-auto lg:rounded-xl lg:overflow-x-hidden"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="w-3.5"></div>
        <p class="text-xl place-self-end">{{ $t("addQuote") }}</p>
        <router-link
          :to="{ name: 'MoviePage', params: { id: route.params.id } }"
        >
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
      >
        <Field
          name="movie"
          rules="required"
          v-for="movie in currentMovie"
          v-bind:key="movie.title"
          :value="movie.id"
        >
          <div
            class="relative mt-4 bg-black lg:bg-transparent placeholder-white w-full py-4 rounded lg:py-2"
          >
            <div class="flex items-center justify-between">
              <div
                class="w-full px-2.5 pb-2 rounded lg:py-2 block flex gap-2"
                :for="movie.title.en"
              >
                <img
                  :src="root + movie.image"
                  alt="movie"
                  class="w-4/12 rounded-lg xs:max-h-20 sm:max-h-52"
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
                      class="bg-niceGrey text-white px-2 py-1 flex text-sm gap-2.5 items-center"
                      ><p>{{ genre }}</p></span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Field>
        <Field name="quote_ka" v-slot="{ field, meta }" rules="required">
          <div class="relative mt-2">
            <textarea
              v-bind="field"
              rows="3"
              class="bg-transparent border-1 border-niceGrey placeholder-lightGrey placeholder:italic w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="descriptionKa"
              placeholder="ახალი ციტატა"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            ></textarea>
            <span class="text-white absolute right-3 top-2">ქარ</span>
          </div>
        </Field>
        <Field name="quote_en" v-slot="{ field, meta }" rules="required">
          <div class="relative mt-4">
            <textarea
              v-bind="field"
              rows="3"
              class="bg-transparent border-1 border-niceGrey placeholder-lightGrey placeholder:italic w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="descriptionEn"
              placeholder="Start create new quote"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            ></textarea>
            <span class="text-white absolute right-3 top-2">Eng</span>
          </div>
        </Field>
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
import { onBeforeMount, ref, watch } from "vue";
import { Form, Field } from "vee-validate";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import { useRoute } from "vue-router";
import axios from "@/config/axios/jwtAxios.js";
import axiosInstance from "@/config/axios/index.js";
import { useMovieStore } from "@/stores/movie.js";
import { useUserStore } from "@/stores/user.js";

const user = useUserStore();
const movie = useMovieStore();
const root = import.meta.env.VITE_APP_ROOT;
const route = useRoute();
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
        genres: JSON.parse(movie.genres),
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
  console.log(quote);
  axiosInstance
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
  console.log(values);
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
