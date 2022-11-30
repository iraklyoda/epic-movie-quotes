<template>
  <movie-dialog
    route="MoviePage"
    :param="{ id: route.params.id }"
    class="lg:mt-24 h-screen"
  >
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:w-240 lg:h-auto lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="w-3.5"></div>
        <p class="text-xl place-self-end">{{ $t("editMovie") }}</p>
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
        v-for="movie in currentMovie"
        v-bind:key="movie.title"
        @submit="onSubmit"
        class="mx-9 lg:mx-0 lg:px-9 mt-7 lg:w-full"
        enctype="multipart/form-data"
      >
        <Field
          name="title_en"
          v-slot="{ field, meta }"
          v-model="movieTitleEn"
          rules="required"
        >
          <div class="relative">
            <input
              v-bind="field"
              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="name"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            />
            <span class="text-niceGrey absolute right-3 top-2">Eng</span>
          </div>
        </Field>
        <Field
          name="title_ka"
          v-slot="{ field, meta }"
          rules="required"
          v-model="movieTitleKa"
        >
          <div class="relative mt-4">
            <input
              v-bind="field"
              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="name"
              placeholder="ფილმის სახელი"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            />
            <span class="text-niceGrey absolute right-3 top-2">ქარ</span>
          </div>
        </Field>
        <Field
          name="categories"
          v-slot="{ meta }"
          v-model="categoryTags"
          rules="required"
        >
          <div
            class="relative mt-4 bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-2 rounded h-auto outline-none"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
            }"
          >
            <div class="flex flex-wrap gap-1">
              <div v-for="(tag, index) in categoryTags" :key="'tag' + index">
                <span
                  class="bg-niceGrey text-white px-2 py-1 flex text-sm gap-2.5 items-center"
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
                class="bg-transparent focus:outline-none placeholder-white"
                :class="{
                  'pl-2': categoryTags.length > 0,
                  'border-niceRed': !meta.valid && meta.touched,
                  'border-validGreen': meta.valid && meta.touched,
                }"
              />
            </div>
          </div>
        </Field>
        <Field
          name="director_en"
          v-slot="{ field, meta }"
          rules="required"
          v-model="movieDirectorEn"
        >
          <div class="relative mt-4">
            <input
              v-bind="field"
              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="directorEn"
              placeholder="Director"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            />
            <span class="text-niceGrey absolute right-3 top-2">Eng</span>
          </div>
        </Field>
        <Field
          name="director_ka"
          v-slot="{ field, meta }"
          rules="required"
          v-model="movieDirectorKa"
        >
          <div class="relative mt-4">
            <input
              v-bind="field"
              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="directorKa"
              placeholder="რეჟისორი"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            />
            <span class="text-niceGrey absolute right-3 top-2">ქარ</span>
          </div>
        </Field>
        <Field
          name="description_en"
          v-slot="{ field, meta }"
          rules="required"
          v-model="movieDescriptionEn"
        >
          <div class="relative mt-4">
            <textarea
              v-bind="field"
              rows="3"
              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="descriptionEn"
              placeholder="Movie description"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            ></textarea>
            <span class="text-niceGrey absolute right-3 top-2">Eng</span>
          </div>
        </Field>
        <Field
          name="description_ka"
          v-slot="{ field, meta }"
          rules="required"
          v-model="movieDescriptionKa"
        >
          <div class="relative mt-2">
            <textarea
              v-bind="field"
              rows="3"
              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
              id="descriptionKa"
              placeholder="ფილმის აღწერა"
              :class="{
                'border-niceRed': !meta.valid && meta.touched,
                'border-validGreen': meta.valid && meta.touched,
              }"
            ></textarea>
            <span class="text-niceGrey absolute right-3 top-2">ქარ</span>
          </div>
        </Field>
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
            class="relative mt-4 bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-4 rounded lg:py-12 outline-none"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
              'border-dotted border-4 border-blue-700': isDragging,
            }"
          >
            <div class="lg:gap-3" v-if="!img">
              <div class="relative">
                <img
                  :src="root + movieImageSrc"
                  alt="current image"
                  class="blur-xs opacity-95"
                />
                <label
                  for="movieImage"
                  class="bg-mirageGradient cursor-pointer opacity-80 px-3 py-3 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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
              <div class="flex gap-3 items-center">
                <camera-icon></camera-icon>
                <span class="mt-1 lg:hidden">Upload image</span>
                <span class="mt-1 invisible lg:visible"
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
          class="bg-niceRed py-3 mt-4 w-full rounded-md text-white lg:p-2"
        >
          {{ $t("getStarted") }}
        </button>
      </Form>
      <div class="h-screen lg:h-12"></div>
    </div>
  </movie-dialog>
</template>

<script setup>
import { onBeforeMount, ref } from "vue";
import { Form, Field } from "vee-validate";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import axiosInstance from "@/config/axios/index.js";
import axios from "@/config/axios/jwtAxios.js";
import { useRoute } from "vue-router";
import { useSingleStore } from "@/stores/single.js";
import CameraIcon from "@/components/icons/CameraIcon.vue";
const root = import.meta.env.VITE_APP_ROOT;
const route = useRoute();
const currentMovie = ref([]);

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
      (categoryTags.value = movie.genres),
        (movieDescriptionEn.value = movie.description.en);
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
    genres: JSON.stringify(values.categories),
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
  axiosInstance
    .post(
      import.meta.env.VITE_APP_ROOT_API + "/movies/movie/" + route.params.id,
      movie,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
    .then(function (response) {
      singleMovie.getMovie(route.params.id);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
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
