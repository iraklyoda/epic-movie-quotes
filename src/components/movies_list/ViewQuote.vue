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
          <DeleteIcon
            class="w-4 cursor-pointer"
            @click="destroyQuote(route.params.quoteId)"
          />
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
            :src="profile.profilePicture"
            alt="profile picture"
            class="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <p class="whitespace-nowrap text-xl">{{ profile.user.username }}</p>
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
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { onBeforeMount } from "vue";
import { useQuoteStore } from "@/stores/quote.js";
import { useProfileStore } from "@/stores/profile.js";
import { useSingleStore } from "@/stores/single.js";
import CommentComponent from "@/components/news_feed/CommentComponent.vue";
import router from "@/router";
const quoteStore = useQuoteStore();
const profile = useProfileStore();
const movie = useSingleStore();
const route = useRoute();
onBeforeMount(() => {
  quoteStore.getQuote(route.params.quoteId);
});

function destroyQuote(id) {
  const destroy = async () => {
    await quoteStore.deleteQuote(id);
    movie.getMovie(route.params.id);
    router.push({ name: "MoviePage" });
  };
  destroy();
}

const root = import.meta.env.VITE_APP_ROOT;
</script>
