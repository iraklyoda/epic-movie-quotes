<template>
  <movie-dialog route="MoviePage" class="lg:mt-24 h-screen">
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:w-240 lg:h-auto lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="flex gap-3 justify-center py-3 rounded-lg">
          <router-link to="">
            <EditIcon class="w-4" />
          </router-link>
          <div class="border-l-2 text-xs h-4"></div>
          <DeleteIcon class="w-4" />
        </div>
        <p class="text-xl mx-auto hidden lg:block">{{ $t("editQuote") }}</p>
        <router-link
          :to="{ name: 'MoviePage', params: { id: route.params.id } }"
        >
          <CloseIcon class="w-3.5" />
        </router-link>
      </nav>
      <div class="border-b-2 mt-4 border-fadeGrey w-full"></div>
      <aside class="pl-9">
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
      <section
        class="px-9 pt-10 lg:pt-0 italic lg:text-xl"
        v-for="quote in quoteStore.quote"
        v-bind:key="quote.quote"
      >
        <Form
          @submit="onSubmit"
          class="mx-9 lg:mx-0 lg:px-9 mt-7 lg:w-full"
          v-slot="{ errors }"
        >
          <Field name="movie_id" :value="quote.movie_id" class="hidden" />
          <MovieInput
            type="textarea"
            id="quoteEn"
            :errors="errors.quote_en"
            :value="quote.quote.en"
            name="quote_en"
            lang="Eng"
            rules="required"
          />
          <MovieInput
            type="textarea"
            id="quoteKa"
            :errors="errors.quote_ka"
            :value="quote.quote.ka"
            name="quote_ka"
            lang="ქარ"
            rules="required"
          />
          <Field
            name="thumbnail"
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
                    :src="root + quote.thumbnail"
                    alt="current image"
                    class="blur-xs opacity-95"
                  />
                  <label
                    for="quoteImage"
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
                <label for="quoteImage" class="bg-fadePurple px-2 py-2">{{
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
                id="quoteImage"
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
      </section>
      <!--      Comments -->
      <div class="h-screen lg:h-12"></div>
    </div>
  </movie-dialog>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { useQuoteStore } from "@/stores/quote.js";
import { useQuotesStore } from "@/stores/quotes.js";
import { useSingleStore } from "@/stores/single.js";
import { configure, Field, Form } from "vee-validate";
import axiosInstance from "@/config/axios/index.js";
import router from "@/router";
const quoteStore = useQuoteStore();
const movie = useSingleStore();

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const route = useRoute();

const quoteEn = ref(quoteStore.quote);
console.log(quoteEn.value);

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
  document.getElementById("quoteImage").files = e.dataTransfer.files;
  img.value = document.getElementById("quoteImage").files[0];
}

function onSubmit(values) {
  const quote = {
    movie_id: values.movie_id,
    quote_en: values.quote_en,
    quote_ka: values.quote_ka,
  };
  if (img.value) {
    quote.image = values.thumbnail;
  }
  console.log(values);
  axiosInstance
    .post(
      import.meta.env.VITE_APP_ROOT_API +
        "/quotes/quote/" +
        route.params.quoteId,
      quote,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    )
    .then(function (response) {
      const quotesStore = useQuotesStore();
      movie.getMovie(route.params.id);
      quoteStore.getQuote(route.params.quoteId);
      quotesStore.getQuotes(route.params.id);
      router.push({ name: "MoviePage" });
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
}

onBeforeMount(() => {
  quoteStore.getQuote(route.params.quoteId);
});

const root = import.meta.env.VITE_APP_ROOT;
</script>
