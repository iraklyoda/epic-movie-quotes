<template>
  <div class="bg-riverStyx min-h-screen h-auto text-white lg:bg-mirage">
    <!--    Dialog    -->
    <header>
      <div
        v-if="page.menuOpen"
        class="absolute w-full h-screen top-0 z-20 lg:hidden"
        @click="page.changeMenu()"
      ></div>
      <nav class="bg-headerBlue py-5">
        <div class="flex justify-between items-center mx-9">
          <p class="text-skinWhite hidden lg:block">{{ $t("movieQuotes") }}</p>
          <MenuIcon
            class="mt-1 w-5 cursor-pointer lg:hidden"
            @click="page.changeMenu()"
          ></MenuIcon>
          <div class="flex gap-5">
            <SearchIcon
              v-if="route.name === 'NewsFeed'"
              class="w-5 lg:hidden"
            ></SearchIcon>
            <NotificationIcon
              class="w-5 cursor-pointer"
              @click="notificationState"
            ></NotificationIcon>
            <!--            Notifications     -->
            <div v-if="notificationOpen" class="fixed w-full h-screen top-0 z-30" @click="notificationState"></div>
            <div
              v-if="notificationOpen"
              class="absolute bg-black w-full left-0 right-2 lg:w-2/5 h-fit lg:over lg:left-auto lg:right-60 top-16 z-20 lg:rounded-lg mb-12"
            >
              <TriangleIcon class="absolute right-7 -top-3 lg:-top-30 lg:-top-2 -z-10" />
              <div class="overflow-scroll lg:h-176">
                <div class="px-8 pt-4">
                  <div class="flex justify-between items-center">
                    <p class="text-md">{{ $t("notifications") }}</p>
                    <p class="text-sm">{{ $t("markAsAllRead") }}</p>
                  </div>
                  <section class="pt-6 flex flex-col gap-2">
                    <NotificationComponent />
                    <NotificationComponent />
                    <NotificationComponent />
                    <NotificationComponent />
                    <NotificationComponent />
                    <NotificationComponent />
                    <NotificationComponent />
                    <NotificationComponent />
                  </section>
                </div>
              </div>
            </div>
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
import { usePageStore } from "@/stores/page.js";
import { useProfileStore } from "@/stores/profile.js";
import LanguageChange from "@/components/ui/LanguageChange.vue";
import ProfileNavigation from "@/components/epic_quotes/ProfileNavigation.vue";
import NotificationComponent from "@/components/news_feed/NotificationComponent.vue";
import TriangleIcon from "@/components/icons/TriangleIcon.vue";
import { onBeforeMount, ref } from "vue";

const page = usePageStore();
const profileStore = useProfileStore();

const notificationOpen = ref(false);
function notificationState() {
  notificationOpen.value = !notificationOpen.value;
}

const route = useRoute();
function getRoute() {
  console.log(route.name);
}

onBeforeMount(() => {
  profileStore.getProfile();
});

const store = useUserStore();
defineProps(["search"]);

function logout() {
  store.logout();
}
</script>
