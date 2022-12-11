<template>
  <div
    class="top-18 absolute left-0 z-20 h-4/6 w-10/12 bg-darkBlue pl-10 lg:relative lg:z-0 lg:flex lg:h-auto lg:w-auto lg:flex-col lg:bg-transparent lg:pl-16"
    :class="{ block: page.menuOpen, hidden: !page.menuOpen }"
  >
    <div class="mt-7 flex items-center gap-4">
      <img
        :src="profile.profilePicture"
        alt="profile picture"
        class="h-16 w-10 w-16 rounded-full object-cover object-center"
        :class="{
          'border-2 border-niceRed': route.matched.some((route) =>
            route.path.includes('/profile')
          ),
        }"
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
    <button
      type="button"
      @click="user.logout"
      class="ml-3 mt-4 block rounded border-2 px-5 py-1 lg:hidden"
    >
      {{ $t("logOut") }}
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePageStore } from "@/stores/page.js";
import { useProfileStore } from "@/stores/profile.js";
import { useUserStore } from "@/stores/user.js";
const user = useUserStore();

const profile = useProfileStore();
const page = usePageStore();
const route = useRoute();
const menuOpen = ref(true);
</script>
