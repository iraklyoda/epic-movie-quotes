<template>
  <div
    class="absolute left-0 top-18 h-4/6 w-10/12 pl-10 lg:h-auto lg:w-auto bg-darkBlue lg:bg-transparent z-20 lg:z-0 lg:relative lg:flex lg:pl-16 lg:flex-col"
    :class="{ block: page.menuOpen, hidden: !page.menuOpen}"
  >
    <div class="mt-7 flex items-center gap-4">
      <img
        src="@/assets/images/user/profile_picture.png"
        alt="profile picture"
        class="w-10 lg:w-15"
      />
      <div>
        <p class="text-md lg:text-2xl whitespace-nowrap">{{ profile.user.username }}</p>
        <p class="text-sm lg:text-base text-lightGrey whitespace-nowrap">
          {{ $t("editYourProfile") }}
        </p>
      </div>
    </div>
    <router-link :to="{ name: 'NewsFeed' }">
      <div class="flex items-center mt-6 gap-8">
        <home-icon
          :color="[
            route.matched.some((route) => route.path.includes('/newsfeed'))
              ? '#E31221'
              : 'white',
          ]"
          class="w-5 lg:w-7 ml-3"
        ></home-icon>
        <p>{{ $t("newsFeed") }}</p>
      </div>
    </router-link>
    <router-link :to="{ name: 'MovieList' }">
      <div class="flex items-center mt-6 gap-8">
        <movie-icon
          :color="[
            route.matched.some((route) => route.path.includes('/movielist')) ||
            route.matched.some((route) => route.path.includes('/movie'))
              ? '#E31221'
              : 'white',
          ]"
          class="w-5 lg:w-7 ml-3"
        ></movie-icon>
        <p>{{ $t("listOfMovies") }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import {usePageStore} from "@/stores/page.js";
import { useProfileStore } from "@/stores/profile.js";

const profile = useProfileStore();
const page = usePageStore();
const route = useRoute();
const menuOpen = ref(true);
</script>
