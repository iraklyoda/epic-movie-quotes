<template>
  <router-link
    class="absolute left-0 top-0 z-30 h-screen w-screen lg:h-screen"
    :to="{ name: 'MovieList' }"
  >
  </router-link>
  <div class="absolute top-0 h-screen">
    <div
      class="absolute z-50 h-screen w-screen overflow-hidden overflow-scroll bg-darkBlue pt-7 pb-12 font-helvetica lg:top-24 lg:left-[34rem] lg:h-4/5 lg:w-200 lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="mx-9 flex items-center justify-between">
        <div class="w-3.5"></div>
        <p class="place-self-end text-xl">{{ $t("addMovie") }}</p>
        <router-link :to="{ name: 'MovieList' }">
          <CloseIcon class="w-3.5" />
        </router-link>
      </nav>
      <div class="mt-4 w-full border-b-2 border-fadeGrey"></div>
      <aside class="ml-9">
        <div class="mt-7 flex items-center gap-4">
          <img
            :src="profileStore.profilePicture"
            alt="profile picture"
            class="h-10 w-10 rounded-full object-cover object-center"
          />
          <div>
            <p class="whitespace-nowrap text-xl">
              {{ profileStore.user.username }}
            </p>
          </div>
        </div>
      </aside>
      <Form
        @submit="onSubmit"
        class="mx-9 mt-7 lg:mx-0 lg:w-full lg:px-9"
        v-slot="{ errors }"
      >
        <MovieInput
          id="titleEn"
          name="title_en"
          :errors="errors.title_en"
          rules="required|min:3|eng_char"
          lang="Eng"
          placeholder="Movie Name"
        />
        <MovieInput
          id="titleKa"
          name="title_ka"
          :errors="errors.title_ka"
          rules="required|min:3|geo_char"
          lang="ქარ"
          placeholder="ფილმის სახელი"
        />
        <Field
          name="genres"
          v-slot="{ meta }"
          v-model="categoryTags"
          rules="required"
        >
          <div
            class="relative mt-4 h-auto w-full rounded border-1 bg-transparent px-2.5 py-2 placeholder-white outline-none"
            :class="{
              'border-niceGrey': !meta.touched,
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
                class="placeholder-white focus:outline-none"
                :class="{
                  'bg-transparent': true,
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
          name="director_en"
          rules="required|min:3|eng_char"
          :errors="errors.director_en"
          placeholder="Director"
          lang="Eng"
        />
        <MovieInput
          id="directorKa"
          name="director_ka"
          rules="required|min:3|geo_char"
          :errors="errors.director_ka"
          placeholder="რეჟისორი"
          lang="ქარ"
        />
        <MovieInput
          type="textarea"
          rows="3"
          id="descriptionEn"
          name="description_en"
          rules="required|min:3|eng_char"
          :errors="errors.description_en"
          placeholder="Movie Description"
          lang="Eng"
        />
        <MovieInput
          type="textarea"
          rows="3"
          id="descriptionKa"
          name="description_ka"
          rules="required|min:3|geo_char"
          :errors="errors.description_ka"
          placeholder="ფილმის აღწერა"
          lang="Geo"
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
            class="border-niceGray relative mt-4 w-full rounded border-1 bg-transparent px-2.5 py-4 placeholder-white outline-none lg:py-2"
            :class="{
              'border-niceRed': !meta.valid && meta.touched,
              'border-validGreen': meta.valid && meta.touched,
              'border-4 border-dotted border-blue-700': isDragging,
            }"
          >
            <div class="flex justify-between lg:justify-start lg:gap-3">
              <div class="flex items-center gap-3">
                <camera-icon></camera-icon>
                <span class="mt-1 lg:hidden">Upload image</span>
                <span class="invisible mt-1 lg:visible"
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
          class="mt-4 w-full rounded-md bg-niceRed py-3 text-white lg:p-2"
        >
          {{ $t("getStarted") }}
        </button>
      </Form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import axios from "@/config/axios/index.js";
import { useMovieStore } from "@/stores/movie.js";
import { useProfileStore } from "@/stores/profile.js";
import MovieInput from "@/components/ui/movies/MovieInput.vue";
const movieList = useMovieStore();
const router = useRouter();
const profileStore = useProfileStore();

function onSubmit(values) {
  console.log(values);
  const addMovie = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/movies/create",
        values,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      movieList.getMovies();
      router.push({ name: "MovieList" });
    } catch (e) {
      console.log(e);
    }
  };
  addMovie();
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
