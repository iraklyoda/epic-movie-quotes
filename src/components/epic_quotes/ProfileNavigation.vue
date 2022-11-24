<template>
  <div class="hidden lg:flex lg:flex-col">
    <div class="mt-7 flex items-center gap-4">
      <img
        src="@/assets/images/user/profile_picture.png"
        alt="profile picture"
        class="w-15"
      />
      <div>
        <p class="text-2xl whitespace-nowrap">Maia Nakashidze</p>
        <p class="text-lightGrey whitespace-nowrap">
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
          class="w-7 ml-3"
        ></home-icon>
        <p>{{ $t("newsFeed") }}</p>
      </div>
    </router-link>
    <router-link :to="{ name: 'MovieList' }">
      <div class="flex items-center mt-6 gap-8">
        <movie-icon
          :color="[route.matched.some((route) => route.path.includes('/movielist')) ? '#E31221' : 'white']"
          class="w-7 ml-3"
        ></movie-icon>
        <p>{{ $t("listOfMovies") }}</p>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
</script>
