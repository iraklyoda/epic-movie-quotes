<template>
  <movie-dialog route="MovieList">
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:w-240 lg:h-auto lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="w-3.5"></div>
        <p class="text-xl place-self-end">{{ $t("addMovie") }}</p>
        <router-link :to="{ name: 'MovieList' }">
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
        v-slot="{ errors }"
      >
        <MovieInput
          id="title"
          name="title_en"
          :errors="errors.title_en"
          rules="required|min:5"
          lang="Eng"
          placeholder="Movie Name"
        />
        <!--        <Field name="title_en" v-slot="{ field, meta }" rules="required">-->
        <!--          <div class="relative">-->
        <!--            <input-->
        <!--              v-bind="field"-->
        <!--              class="bg-transparent border-1 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"-->
        <!--              id="name"-->
        <!--              placeholder="Movie name"-->
        <!--              :class="{-->
        <!--                'border-niceRed': !meta.valid && meta.touched,-->
        <!--                'border-validGreen': meta.valid && meta.touched,-->
        <!--              }"-->
        <!--            />-->
        <!--            <span class="text-niceGrey absolute right-3 top-2">Eng</span>-->
        <!--          </div>-->
        <!--        </Field>-->
        <Field
          name="title_ka"
          v-slot="{ field, meta }"
          rules="required|geo_num"
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
        <Field name="director_en" v-slot="{ field, meta }" rules="required">
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
        <Field name="director_ka" v-slot="{ field, meta }" rules="required">
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
        <Field name="description_en" v-slot="{ field, meta }" rules="required">
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
        <Field name="description_ka" v-slot="{ field, meta }" rules="required">
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
                <span class="mt-1 lg:hidden">Upload image</span>
                <span class="mt-1 invisible lg:visible"
                  >{{ $t("dragAndDrop") }}
                </span>
              </div>
              <label for="movieImage" class="bg-fadePurple px-2 py-2">{{
                $t("chooseFile")
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
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import axios from "@/config/axios/index.js";
import { useMovieStore } from "@/stores/movie.js";
import MovieInput from "@/components/ui/movies/MovieInput.vue";
const movieList = useMovieStore();
const router = useRouter();

function onSubmit(values) {
  console.log(values);
  const movie = {
    image: values.image,
    genres: JSON.stringify(values.categories),
    title_en: values.title_en,
    title_ka: values.title_ka,
    director_en: values.director_en,
    director_ka: values.director_ka,
    description_en: values.description_en,
    description_ka: values.description_ka,
  };
  axios
    .post(import.meta.env.VITE_APP_ROOT_API + "/movies/create", movie, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then(function (response) {
      console.log(response);
      movieList.getMovies();
      router.push({ name: "MovieList" });
    })
    .catch(function (error) {
      console.log(error);
    });
}

const categoryTag = ref("");
const categoryTags = ref([]);

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
