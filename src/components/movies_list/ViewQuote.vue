<template>
  <movie-dialog route="MoviePage" class="lg:mt-24 h-screen">
    <div
      class="w-screen h-auto bg-darkBlue pt-7 font-helvetica lg:w-240 lg:h-auto lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="flex justify-between items-center mx-9">
        <div class="flex gap-3 justify-center py-3 rounded-lg">
          <router-link :to="{name: 'EditQuote', params: { quoteId: route.params.quoteId }}">
            <EditIcon class="w-4" />
          </router-link>
          <div class="border-l-2 text-xs h-4"></div>
          <DeleteIcon class="w-4" />
        </div>
        <p class="text-xl mx-auto hidden lg:block">{{ $t("viewQuote") }}</p>
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
        class="px-9 pt-10 italic lg:text-xl"
        v-for="quote in quoteStore.quote"
        v-bind:key="quote.quote"
      >
        <div class="flex justify-between">
          <p>"{{ quote.quote.en }}"</p>
          <span class="text-niceGrey">Eng</span>
        </div>
        <div class="flex mt-4 justify-between">
          <p>"{{ quote.quote.ka }}"</p>
          <span class="text-niceGrey">ქარ</span>
        </div>
        <img
          :src="root + quote.thumbnail"
          alt="quote"
          class="mx-auto h-80 mt-6 lg:mx-0 lg:w-full lg:h-110 object-cover rounded-xl"
        />
        <div class="flex items-center pt-4">
          <span>3</span>
          <CommentIcon class="ml-3" />
          <span class="ml-6">10</span>
          <HeartIcon class="ml-3" />
        </div>
      </section>
      <div class="border-b-2 mt-4 border-fadeGrey mx-9"></div>
      <!--      Comments -->
      <section class="px-9">
        <CommentComponent />
        <div class="mt-4 flex  mb-4 lg:pb-6">
          <img
            src="@/assets/images/user/profile_picture.png"
            alt="profile picture"
          />
          <input
            :placeholder="$t('writeAComment')"
            class="block ml-3 pl-4 w-full bg-footerBlue rounded-md"
          />
        </div>
      </section>
      <div class="h-screen lg:h-12"></div>
    </div>
  </movie-dialog>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { useQuoteStore } from "@/stores/quote.js";
import CommentComponent from "@/components/news_feed/CommentComponent.vue";
const quoteStore = useQuoteStore();
const route = useRoute();
onBeforeMount(() => {
  quoteStore.getQuote(route.params.quoteId);
});

const root = import.meta.env.VITE_APP_ROOT;
</script>
