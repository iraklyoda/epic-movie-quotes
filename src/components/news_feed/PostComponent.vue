<template>
  <div class="max-w-5xl px-6 lg:rounded-xl lg:bg-cinder lg:pl-0">
    <div class="lg:px-12">
      <div class="mt-7 flex items-center gap-4 lg:pt-6 lg:pr-2">
        <img
          class="h-12 w-12 rounded-full object-cover object-center"
          :src="profilePicture"
          alt="profile picture"
        />
        <p>{{ props.user.username }}</p>
      </div>
      <figure class="mt-3.5">
        <div class="flex items-center">
          <figcaption class="pr-4 text-sm sm:text-base">
            "{{ i18n.global.locale.value === "ka" ? quote.ka : quote.en }}" -
            {{ i18n.global.locale.value === "ka" ? movie.ka : movie.en }}
          </figcaption>
        </div>
        <img :src="root + image" alt="movie" class="mt-4" />
      </figure>
      <section class="mt-5 flex items-center text-xl">
        <span>{{ props.comments.length }}</span>
        <CommentIcon class="ml-3" />
        <span class="ml-6">{{ props.likes.length }}</span>
        <HeartIcon
          class="ml-3 cursor-pointer"
          :active="getActive()"
          @click="like"
        />
      </section>
      <div class="mt-4 border-b-2 border-fadeGrey lg:w-auto"></div>
      <div class="max-h-72 overflow-scroll">
        <CommentComponent
          v-for="(comment, index) in props.comments"
          v-bind:key="index"
          :comment="comment"
          class="lg:pr-14"
        />
      </div>
      <section class="mt-4 mb-4 flex lg:w-auto lg:pb-6">
        <img
          :src="profile.profilePicture"
          alt="profile picture"
          class="h-10 w-10 rounded-full object-cover object-center"
        />
        <PostComment
          :quoteId="props.quoteId"
          :quote-author="quoteAuthor"
          class="h-full w-full pr-6"
        />
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
import { useProfileStore } from "@/stores/profile.js";
import i18n from "@/config/i18n";
import axiosInstance from "@/config/axios/index.js";
import { computed, ref } from "vue";

const profile = useProfileStore();
const root = ref(import.meta.env.VITE_APP_ROOT);

function getActive() {
  const active = ref(false);
  if (props.likes) {
    props.likes.forEach((like) => {
      if (like.user_id === profile.user.id && like.quote_id === props.quoteId) {
        active.value = true;
      }
    });
  }
  return active.value;
}

const profilePicture = computed(() => {
  if (props.user.profile_picture.includes("https")) {
    return props.user.profile_picture;
  } else {
    return root.value + props.user.profile_picture;
  }
});

function like() {
  const like = async () => {
    try {
      axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/quote/" + props.quoteId + "/like"
      );
    } catch (e) {
      console.log(e);
    }
  };
  like();
}

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
  quoteAuthor: {
    required: true,
  },
  movie: {},
  comments: {},
  likes: {},
  user: {},
  index: {},
});
</script>
