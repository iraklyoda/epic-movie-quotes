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
          enctype="multipart/form-data"
        >
          <Field name="movie_id" :value="quote.movie_id" class="hidden" />
          <Field
            name="quote_en"
            :value="quote.quote.en"
            v-slot="{ field, meta }"
            rules="required"
          >
            <div class="relative">
              <textarea
                v-bind="field"
                class="bg-transparent border-1 pr-12 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
                id="name"
                :class="{
                  'border-niceRed': !meta.valid && meta.touched,
                  'border-validGreen': meta.valid && meta.touched,
                }"
              ></textarea>
              <span class="text-niceGrey absolute right-3 top-2">Eng</span>
            </div>
          </Field>
          <Field
            name="quote_ka"
            :value="quote.quote.ka"
            v-slot="{ field, meta }"
            rules="required"
          >
            <div class="relative mt-4">
              <textarea
                v-bind="field"
                class="bg-transparent border-1 pr-12 border-niceGrey placeholder-white w-full px-2.5 py-1.5 rounded lg:py-2 outline-none"
                id="name"
                placeholder="ფილმის სახელი"
                :class="{
                  'border-niceRed': !meta.valid && meta.touched,
                  'border-validGreen': meta.valid && meta.touched,
                }"
              ></textarea>
              <span class="text-niceGrey absolute right-3 top-2">ქარ</span>
            </div>
          </Field>
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
import { Field, Form } from "vee-validate";
import axiosInstance from "@/config/axios/index.js";
const quoteStore = useQuoteStore();

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
      quoteStore.getQuote(route.params.quoteId);
      quotesStore.getQuotes(route.params.id);
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
