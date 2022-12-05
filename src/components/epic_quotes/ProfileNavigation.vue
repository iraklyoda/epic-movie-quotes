<template>
  <div
    class="top-18 absolute left-0 z-20 h-4/6 w-10/12 bg-darkBlue pl-10 lg:relative lg:z-0 lg:flex lg:h-auto lg:w-auto lg:flex-col lg:bg-transparent lg:pl-16"
    :class="{ block: page.menuOpen, hidden: !page.menuOpen }"
  >
    <div class="mt-7 flex items-center gap-4">
      <img
        src="@/assets/images/user/profile_picture.png"
        alt="profile picture"
        class="w-10 lg:w-15"
      />
      <div>
        <p class="text-md whitespace-nowrap lg:text-2xl">
          {{ profile.user.username }}
        </p>
        <router-link :to="{ name: 'ProfilePage' }">
          <p class="whitespace-nowrap text-sm text-lightGrey lg:text-base">
            {{ $t("editYourProfile") }}
          </p>
        </router-link>
      </div>
    </div>
    <router-link :to="{ name: 'NewsFeed' }">
      <div class="mt-6 flex items-center gap-8">
        <home-icon
          :color="[
            route.matched.some((route) => route.path.includes('/newsfeed'))
              ? '#E31221'
              : 'white',
          ]"
          class="ml-3 w-5 lg:w-7"
        ></home-icon>
        <p>{{ $t("newsFeed") }}</p>
      </div>
    </router-link>
    <router-link :to="{ name: 'MovieList' }">
      <div class="mt-6 flex items-center gap-8">
        <movie-icon
          :color="[
            route.matched.some((route) => route.path.includes('/movielist')) ||
            route.matched.some((route) => route.path.includes('/movie'))
              ? '#E31221'
              : 'white',
          ]"
          class="ml-3 w-5 lg:w-7"
        ></movie-icon>
        <p>{{ $t("listOfMovies") }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePageStore } from "@/stores/page.js";
import { useProfileStore } from "@/stores/profile.js";

const profile = useProfileStore();
const page = usePageStore();
const route = useRoute();
const menuOpen = ref(true);
</script>
