<template>
  <div class="ml-9 max-w-3xl lg:bg-cinder lg:rounded-xl lg:mb-4">
    <div class="lg:ml-6">
      <div class="mt-7 flex items-center gap-4 lg:pt-6">
        <img
          src="@/assets/images/user/profile_picture.png"
          alt="profile picture"
        />
        <p>Maia Nakashidze</p>
      </div>
      <figure class="mt-3.5">
        <figcaption class="text-sm sm:text-base">
          {{ lang === "Ka" ? quote.ka : quote.en }}
        </figcaption>
        <img :src="root + image" alt="movie" class="w-11/12 max-w-3xl mt-4" />
      </figure>
      <section class="flex mt-5 text-xl items-center">
        <span>3</span>
        <CommentIcon class="ml-3" />
        <span class="ml-6">10</span>
        <HeartIcon class="ml-3" />
      </section>
      <div class="border-b-2 mt-4 border-fadeGrey w-11/12 max-w-3xl"></div>
      <CommentComponent v-for="(comment, index) in props.comments" v-bind:key="index" :comment="comment"/>
      <section class="mt-4 flex w-11/12 max-w-3xl mb-4 lg:pb-6">
        <img
          src="@/assets/images/user/profile_picture.png"
          alt="profile picture"
        />
        <PostComment :quoteId="props.quoteId"  class="w-full h-full"/>
      </section>
    </div>
  </div>
  <div class="hidden lg:block lg:pb-1"></div>
  <div class="bg-headerBlue py-4 lg:hidden"></div>
</template>

<script setup>
import CommentComponent from "@/components/news_feed/CommentComponent.vue";
import CommentIcon from "@/components/icons/CommentIcon.vue";
import HeartIcon from "@/components/icons/HeartIcon.vue";
import PostComment from "@/components/news_feed/PostComment.vue";
import { computed } from "vue";
import i18n from "@/config/i18n";

const root = import.meta.env.VITE_APP_ROOT;

const lang = computed(() => {
  if (i18n.global.locale.value === "ka") {
    return "Ka";
  } else {
    return "En";
  }
});

const props = defineProps({
  quote: {
    required: true,
  },
  image: {
    required: true,
  },
  quoteId: {
    required: true,
  },
  comments: {},
});
</script>
