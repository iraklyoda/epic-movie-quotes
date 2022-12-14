<template>
  <router-link
    class="absolute top-0 z-30 h-auto w-full lg:h-screen"
    :to="{ name: 'MoviePage' }"
  >
  </router-link>
  <div class="h-screen w-screen">
    <div
      class="absolute top-0 left-0 z-40 h-screen w-screen overflow-scroll bg-darkBlue pt-7 lg:relative lg:ml-36 lg:mt-4 lg:h-4/5 lg:w-3/5 lg:overflow-scroll lg:rounded-xl lg:pb-8"
    >
      <div class="h-0.5"></div>
      <nav class="mx-9 flex items-center justify-between">
        <div class="w-3.5"></div>
        <p class="place-self-end text-xl">{{ $t("editMovie") }}</p>
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
        v-for="movie in currentMovie"
        v-bind:key="movie.title"
        @submit="onSubmit"
        class="mx-9 mt-7 lg:mx-0 lg:w-full lg:px-9"
        v-slot="{ errors }"
      >
        <MovieInput
          id="movieTitleEn"
          :errors="errors.title_en"
          name="title_en"
          lang="Eng"
          rules="required|min:3|eng_char"
          v-model:modelValue="movieTitleEn"
        />
        <MovieInput
          id="movieTitleKa"
          :errors="errors.title_ka"
          name="title_ka"
          lang="ქარ"
          rules="required|min:3|geo_char"
          v-model:modelValue="movieTitleKa"
        />
        <Field
          name="genres"
          v-slot="{ meta }"
          v-model="categoryTags"
          rules="required"
        >
          <div
            class="relative mt-4 h-auto w-full rounded border-1 border-niceGrey bg-transparent px-2.5 py-2 placeholder-white outline-none"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
            }"
          >
            <div class="flex flex-wrap gap-1">
              <div v-for="(tag, index) in categoryTags" :key="'tag' + index">
                <span
                  class="flex items-center gap-2.5 bg-niceGrey px-2 py-1 text-sm text-white"
                  ><p>{{ tag }}</p>
                  <CloseIcon
                    class="w-2 cursor-pointer"
                    @click="removeTag(index)"
                /></span>
              </div>
              <input
                v-model="categoryTag"
                @keyup.,="addTag"
                @keydown.enter.prevent="addTag"
                :placeholder="$t('category') + '...'"
                class="bg-transparent placeholder-white focus:outline-none"
                :class="{
                  'pl-2': categoryTags.length > 0,
                  'border-niceRed': !meta.valid && meta.touched,
                  'border-validGreen': meta.valid && meta.touched,
                }"
              />
            </div>
          </div>
        </Field>
        <MovieInput
          id="directorEn"
          :errors="errors.director_en"
          name="director_en"
          lang="Eng"
          rules="required|min:3|eng_char"
          v-model:modelValue="movieDirectorEn"
        />
        <MovieInput
          id="directorKa"
          :errors="errors.director_ka"
          name="director_ka"
          lang="ქარ"
          rules="required|min:3|geo_char"
          v-model:modelValue="movieDirectorKa"
        />
        <MovieInput
          type="textarea"
          rows="3"
          id="descriptionEn"
          :errors="errors.description_en"
          name="description_en"
          lang="Eng"
          rules="required|min:3|eng_char"
          v-model:modelValue="movieDescriptionEn"
        />
        <MovieInput
          type="textarea"
          rows="3"
          id="descriptionKa"
          :errors="errors.description_ka"
          name="description_ka"
          lang="ქარ"
          rules="required|min:3|geo_char"
          v-model:modelValue="movieDescriptionKa"
        />
        <Field
          name="image"
          v-slot="{ handleChange, handleBlur, meta, value }"
          v-model="img"
        >
          <div
            @dragenter="onDragEnter"
            @dragleave="onDragLeave"
            @dragover.prevent
            @drop="onDrop"
            class="relative mt-4 w-full rounded border-1 border-niceGrey bg-transparent px-2.5 py-4 placeholder-white outline-none lg:py-12"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
              'border-4 border-dotted border-blue-700': isDragging,
            }"
          >
            <div class="lg:gap-3" v-if="!img">
              <div class="relative">
                <img
                  :src="root + movieImageSrc"
                  alt="current image"
                  class="opacity-95 blur-xs"
                />
                <label
                  for="movieImage"
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform cursor-pointer rounded-lg bg-mirageGradient px-3 py-3 opacity-80"
                >
                  <CameraIcon class="mx-auto" />
                  <p class="mt-4">
                    {{ $t("changeImage") }}
                  </p></label
                >
              </div>
            </div>
            <div
              class="flex justify-between lg:justify-start lg:gap-3"
              v-if="img"
            >
              <div class="flex items-center gap-3">
                <camera-icon></camera-icon>
                <span class="mt-1 lg:hidden">Upload image</span>
                <span class="invisible mt-1 lg:visible"
                  >{{ $t("dragAndDrop") }}
                </span>
              </div>
              <label for="movieImage" class="bg-fadePurple px-2 py-2">{{
                $t("changeImage")
              }}</label>
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
          {{ $t("saveChanges") }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field } from "vee-validate";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import axiosInstance from "@/config/axios/index.js";
import axios from "@/config/axios/jwtAxios.js";
import { useRoute, useRouter } from "vue-router";
import { useSingleStore } from "@/stores/single.js";
import { useProfileStore } from "@/stores/profile.js";
import CameraIcon from "@/components/icons/CameraIcon.vue";
import MovieInput from "@/components/ui/movies/MovieInput.vue";
const root = import.meta.env.VITE_APP_ROOT;
const route = useRoute();
const router = useRouter();
const currentMovie = ref([]);
const profile = useProfileStore();

const movieTitleEn = ref("");
const movieTitleKa = ref("");
const categoryTag = ref("");
const categoryTags = ref([]);
const movieDirectorEn = ref("");
const movieDirectorKa = ref("");
const movieDescriptionEn = ref("");
const movieDescriptionKa = ref("");
const movieImageSrc = ref("");

const singleMovie = useSingleStore();

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
      movieTitleEn.value = movie.title.en;
      movieTitleKa.value = movie.title.ka;
      movieDirectorEn.value = movie.director.en;
      movieDirectorKa.value = movie.director.ka;
      categoryTags.value = movie.genres;
      movieDescriptionEn.value = movie.description.en;
      movieDescriptionKa.value = movie.description.ka;
      movieImageSrc.value = movie.image;
    } catch (e) {
      console.log(e);
    }
  };
  getMovie();
});

function onSubmit(values) {
  const movie = {
    genres: values.genres,
    title_en: values.title_en,
    title_ka: values.title_ka,
    director_en: values.director_en,
    director_ka: values.director_ka,
    description_en: values.description_en,
    description_ka: values.description_ka,
  };
  if (img.value) {
    movie.image = values.image;
  }
  console.log(movie);
  const editMovie = async () => {
    try {
      const response = await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/movies/movie/" + route.params.id,
        movie,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      singleMovie.getMovie(route.params.id);
      router.push({name: "MoviePage"});
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  editMovie();
}

const isDragging = ref(false);
const dragCount = ref(0);
const img = ref("");

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

function addTag() {
  if (categoryTag.value.length > 3) {
    categoryTags.value.push(categoryTag.value.replace(",", ""));
    categoryTag.value = "";
  }
}
function removeTag(index) {
  categoryTags.value.splice(index, 1);
}
</script>
