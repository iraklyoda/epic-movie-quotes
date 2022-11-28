<template>
  <div class="bg-riverStyx min-h-screen h-auto text-white lg:bg-mirage">
    <!--    Dialog    -->
    <header>
      <nav class="bg-headerBlue py-5">
        <div class="flex justify-between items-center mx-9">
          <p class="text-skinWhite hidden lg:block">{{ $t("movieQuotes") }}</p>
          <MenuIcon class="mt-1 w-5 lg:hidden"></MenuIcon>
          <div class="flex gap-5">
            <SearchIcon
              v-if="route.name === 'NewsFeed'"
              class="w-5 lg:hidden"
            ></SearchIcon>
            <NotificationIcon class="w-5"></NotificationIcon>
            <LanguageChange />
            <button
              @click="logout"
              class="block mx-auto px-6 py-1.5 -mt-1.5 border-2 rounded hidden lg:block"
            >
              {{ $t("logOut") }}
            </button>
          </div>
        </div>
      </nav>
      <div
        class="h-5/6 w-full bg-fadePink z-10 backdrop-blur-xs overflow-auto rounded-md"
        :class="{ absolute: route.name === 'AddMovie' }"
      ></div>
      <div
        class="h-full w-full bg-fadePink z-10 backdrop-blur-xs overflow-auto rounded-md"
        :class="{ absolute: route.name === 'AddQuote' }"
      ></div>
    </header>
    <main class="text-white">
      <div class="lg:flex lg:flex-shrink">
        <!--        Profile      -->
        <ProfileNavigation class="z-20" />
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { RouterView, useRoute } from "vue-router";
import { useUserStore } from "@/stores/user.js";

import LanguageChange from "@/components/ui/LanguageChange.vue";
import ProfileNavigation from "@/components/epic_quotes/ProfileNavigation.vue";

const route = useRoute();
function getRoute() {
  console.log(route.name);
}

const store = useUserStore();
defineProps(["search"]);

function logout() {
  store.logout();
}
</script>
