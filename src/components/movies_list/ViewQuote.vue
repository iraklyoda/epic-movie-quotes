<template>
  <movie-dialog route="MoviePage" class="h-screen lg:mt-24">
    <div
      class="h-auto w-screen bg-darkBlue pt-7 font-helvetica lg:h-auto lg:w-240 lg:rounded-xl"
    >
      <div class="h-0.5"></div>
      <nav class="mx-9 flex items-center justify-between">
        <div class="flex justify-center gap-3 rounded-lg py-3">
          <router-link
            :to="{
              name: 'EditQuote',
              params: { quoteId: route.params.quoteId },
            }"
          >
            <EditIcon class="w-4" />
          </router-link>
          <div class="h-4 border-l-2 text-xs"></div>
          <DeleteIcon class="w-4" />
        </div>
        <p class="mx-auto hidden text-xl lg:block">{{ $t("viewQuote") }}</p>
        <router-link
          :to="{ name: 'MoviePage', params: { id: route.params.id } }"
        >
          <CloseIcon class="w-3.5" />
        </router-link>
      </nav>
      <div class="mt-4 w-full border-b-2 border-fadeGrey"></div>
      <aside class="pl-9">
        <div class="mt-7 flex items-center gap-4">
          <img
            src="@/assets/images/user/profile_picture.png"
            alt="profile picture"
            class="w-10"
          />
          <div>
            <p class="whitespace-nowrap text-xl">Nino Tabagari</p>
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
        <div class="mt-4 flex justify-between">
          <p>"{{ quote.quote.ka }}"</p>
          <span class="text-niceGrey">ქარ</span>
        </div>
        <img
          :src="root + quote.thumbnail"
          alt="quote"
          class="mx-auto mt-6 h-80 rounded-xl object-cover lg:mx-0 lg:h-110 lg:w-full"
        />
        <div class="flex items-center pt-4">
          <span>{{ quote.comments.length }}</span>
          <CommentIcon class="ml-3" />
          <span class="ml-6">{{ quote.likes.length }}</span>
          <HeartIcon class="ml-3" />
        </div>
        <section class="lg: px-9 px-0">
          <div class="mt-4 border-b-2 border-fadeGrey"></div>
          <CommentComponent
            v-for="comment in quote.comments"
            :comment="comment"
            v-bind:key="comment.id"
          />
        </section>
      </section>
      <!--      Comments -->
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
console.log(quoteStore.quote.comments);
const route = useRoute();
onBeforeMount(() => {
  quoteStore.getQuote(route.params.quoteId);
});

const root = import.meta.env.VITE_APP_ROOT;
</script>
