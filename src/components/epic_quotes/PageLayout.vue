<template>
  <div class="h-auto min-h-screen bg-riverStyx text-white lg:bg-mirage">
    <!--    Dialog    -->
    <header>
      <div
        v-if="page.menuOpen"
        class="absolute top-0 z-20 h-screen w-full lg:hidden"
        @click="page.changeMenu()"
      ></div>
      <nav class="bg-headerBlue py-5">
        <div class="mx-9 flex items-center justify-between">
          <p class="hidden text-skinWhite lg:block">{{ $t("movieQuotes") }}</p>
          <MenuIcon
            class="mt-1 w-5 cursor-pointer lg:hidden"
            @click="page.changeMenu()"
          ></MenuIcon>
          <div class="flex gap-5">
            <SearchIcon
              v-if="route.name === 'NewsFeed'"
              class="w-5 lg:hidden"
            ></SearchIcon>
            <div @click="notificationState" class="relative cursor-pointer">
              <NotificationIcon class="w-5"></NotificationIcon>
              <div
                v-if="notifications.unread > 0"
                class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-vermilion"
              >
                <span class="text-sm font-bold">{{
                  notifications.unread
                }}</span>
              </div>
            </div>
            <!--            Notifications     -->
            <div
              v-if="notificationOpen"
              class="fixed top-0 left-0 z-10 h-screen w-full"
              @click="notificationState"
            ></div>
            <div
              v-if="notificationOpen"
              class="lg:over absolute left-0 right-2 top-16 z-20 mb-12 h-fit w-full bg-black lg:left-auto lg:right-60 lg:w-2/5 lg:rounded-lg"
            >
              <TriangleIcon
                class="lg:-top-30 absolute right-7 -top-3 -z-10 lg:-top-2"
              />
              <div class="overflow-scroll lg:h-176">
                <div class="px-8 pt-4">
                  <div class="flex items-center justify-between">
                    <p class="text-md">{{ $t("notifications") }}</p>
                    <p class="cursor-pointer text-sm" @click="readMark">
                      {{ $t("markAsAllRead") }}
                    </p>
                  </div>
                  <section class="flex flex-col gap-2 pt-6">
                    <NotificationComponent
                      v-for="notification in notifications.notifications"
                      v-bind:key="notification.id"
                      :notification="notification"
                    />
                  </section>
                </div>
              </div>
            </div>
            <LanguageChange />
            <button
              @click="logout"
              class="mx-auto -mt-1.5 block hidden rounded border-2 px-6 py-1.5 lg:block"
            >
              {{ $t("logOut") }}
            </button>
          </div>
        </div>
      </nav>
      <div
        class="z-10 h-5/6 w-full overflow-auto rounded-md bg-fadePink backdrop-blur-xs"
        :class="{ absolute: route.name === 'AddMovie' }"
      ></div>
      <div
        class="z-10 h-full w-full overflow-auto rounded-md bg-fadePink backdrop-blur-xs"
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
import { useNotificationsStore } from "@/stores/notifications.js";
import LanguageChange from "@/components/ui/LanguageChange.vue";
import ProfileNavigation from "@/components/epic_quotes/ProfileNavigation.vue";
import NotificationComponent from "@/components/news_feed/NotificationComponent.vue";
import TriangleIcon from "@/components/icons/TriangleIcon.vue";
import { onBeforeMount, ref } from "vue";
import axiosInstance from "@/config/axios/jwtAxios";

const page = usePageStore();
const profileStore = useProfileStore();
const notifications = useNotificationsStore();

const notificationOpen = ref(false);
const unreadNotifications = ref([]);

function notificationState() {
  notificationOpen.value = !notificationOpen.value;
}
setTimeout(() => {
  console.log(profileStore.user.id);
  window.Echo.private("add-notification." + profileStore.user.id).listen(
    ".new-notification",
    () => {
      notifications.getNotifications();
    }
  );
}, 200);

const markAsRead = async () => {
  try {
    const response = await axiosInstance.post(
      import.meta.env.VITE_APP_ROOT_API + "/notifications/mark-read"
    );
    notifications.getNotifications();
    console.log(response);
  } catch (err) {
    console.log(err);
  }
};

function readMark() {
  markAsRead();
}

const route = useRoute();
function getRoute() {
  console.log(route.name);
}

onBeforeMount(() => {
  notifications.getNotifications();
  profileStore.getProfile();
});

const store = useUserStore();
defineProps(["search"]);

function logout() {
  store.logout();
}
</script>
