<template>
  <div class="bg-cinder min-h-screen text-white lg:bg-mirage">
    <header>
      <nav class="bg-headerBlue py-5">
        <div class="flex justify-between items-center mx-9">
          <p class="text-skinWhite hidden lg:block">{{ $t("movieQuotes") }}</p>
          <MenuIcon class="mt-1 w-5 lg:hidden"></MenuIcon>
          <div class="flex gap-5">
            <SearchIcon class="w-5 lg:hidden"></SearchIcon>
            <NotificationIcon class="w-5"></NotificationIcon>
            <LanguageChange/>
            <button
              @click="logout"
              class="block mx-auto px-6 py-1.5 -mt-1.5 border-2 rounded hidden lg:block"
            >
              {{ $t("logOut") }}
            </button>
          </div>
        </div>
      </nav>
    </header>
    <main class="text-white">
      <div class="lg:ml-16 lg:flex">
        <!--        Profile      -->
        <div class="hidden lg:flex lg:flex-col">
          <div class="mt-7 flex items-center gap-4">
            <img
              src="@/assets/images/user/profile_picture.png"
              alt="profile picture"
              class="w-15"
            />
            <div>
              <p class="text-2xl">Maia Nakashidze</p>
              <p class="text-lightGrey">{{ $t("editYourProfile") }}</p>
            </div>
          </div>
          <div class="flex items-center mt-6 gap-8">
            <home-icon class="w-7 ml-3"></home-icon>
            <p>{{ $t("newsFeed") }}</p>
          </div>
          <div class="flex items-center mt-6 gap-8">
            <movie-icon class="w-7 ml-3"></movie-icon>
            <p>{{ $t("listOfMovies") }}</p>
          </div>
        </div>
        <!--        Posts        -->
        <div class="lg:ml-[15%]">
          <div class="lg:flex items-center justify-center">
            <section
              class="bg-footerBlue py-5 flex gap-3 lg:bg-headerBlue lg:py-2 lg:mt-6 lg:rounded-lg lg:-mb-2 lg:ml-8 lg:w-4/5"
            >
              <write-icon class="ml-9 w-5 lg:ml-3"></write-icon>
              <p>{{ $t("writeNewQuote") }}</p>
            </section>
            <section class="hidden lg:flex mt-7 ml-2 gap-3 items-center">
              <search-icon class="w-5"></search-icon>
              <p class="text">{{ $t("searchBy") }}</p>
            </section>
          </div>
          <post-component></post-component>
          <post-component></post-component>
          <post-component></post-component>
          <post-component></post-component>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
import PostComponent from "@/components/news_feed/PostComponent.vue";
import { ref } from "vue";
import LanguageChange from "@/components/ui/LanguageChange.vue";
const store = useUserStore();

function logout() {
  store.logout();
}
</script>
