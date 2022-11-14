<template>
  <main
    :class="{
      'h-screen': registerOpen || authOpen,
      'overflow-hidden': registerOpen || authOpen,
    }"
    class="lg:h-auto lg:overflow-auto"
  >
    <!--          Dialog  -->
    <dialog-component @close="closeRegister" :open="registerOpen">
      <register-component @login="switchToLogin"> </register-component>
    </dialog-component>
    <dialog-component @close="closeAuth" :open="authOpen">
      <auth-component @register="switchToRegister"></auth-component>
    </dialog-component>
    <!--            Dialog-->
    <section class="text-white bg-darkBlue h-110 lg:h-screen font-helvetica">
      <header class="flex justify-between mx-8 items-center">
        <p class="mt-8 text-skinWhite">{{ $t("movieQuotes") }}</p>
        <nav class="flex lg:gap-4">
          <div class="lg:flex">
            <div>
              <div
                v-if="langOpen"
                class="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
              >
                <div
                  class="fixed w-full h-screen top-0"
                  @click="langDown"
                ></div>
                <div class="relative"></div>
              </div>
              <button
                @click="langDropdown"
                type="button"
                class="px-6 py-1 justify-center items-center gap-2 mt-6 hidden lg:flex"
              >
                <p>{{ currentLanguage }}</p>
                <down-arrow
                  class="transition-transform"
                  :class="{ 'rotate-180': langOpen }"
                ></down-arrow>
              </button>
              <div v-if="langOpen" class="absolute hidden flex-col ml-6 mt-1 lg:flex">
                <button type="button" @click="changeLocale">
                  {{ currentLanguage === "En" ? "Ka" : "En" }}
                </button>
              </div>
            </div>
            <button
              @click="registerOpen = true"
              class="block mx-auto bg-niceRed px-6 py-1 rounded mt-6 hidden lg:block"
            >
              {{ $t("signUp") }}
            </button>
          </div>
          <button
            class="mr-2 mt-6 border py-1.5 px-5 rounded"
            @click="authOpen = true"
          >
            {{ $t("logIn") }}
          </button>
        </nav>
      </header>
      <p
        class="text-center text-xl text-skinWhite mt-32 w-80 mx-auto font-bold lg:text-6xl lg:leading-22.5 lg:mt-60 lg:w-176"
      >
        {{ $t("findAnyQuote") }}
      </p>
      <button
        class="block mx-auto bg-niceRed px-3 py-1.5 rounded mt-6 lg:px-4 lg:py-2"
      >
        {{ $t("getStarted") }}
      </button>
      <h3></h3>
    </section>
    <section class="text-white font-helvetica">
      <movie-component
        v-for="movie in movies"
        :key="movie.name_year"
        :quote="movie.quote"
        :year="movie.name_year"
        :bg="movie.bg"
      ></movie-component>
    </section>
    <footer class="bg-footerBlue py-3 lg:p-4">
      <p class="text-white text-xxs ml-8 font-medium font-helvetica lg:text-xs">
        &#169; {{ $t("rightsReserved") }}
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user.js";

import MovieComponent from "@/components/landing_page/MovieComponent.vue";
import DialogComponent from "@/components/ui/DialogComponent.vue";
import RegisterComponent from "@/components/landing_page/RegisterComponent.vue";
import AuthComponent from "@/components/landing_page/AuthComponent.vue";

const registerOpen = ref(false);
const authOpen = ref(false);
const store = useUserStore();

function closeRegister() {
  registerOpen.value = false;
}
function closeAuth() {
  authOpen.value = false;
}
function switchToLogin() {
  registerOpen.value = false;
  authOpen.value = true;
}
function switchToRegister() {
  authOpen.value = false;
  registerOpen.value = true;
}

const langOpen = ref(false);

const currentLanguage = computed(() => {
  if (store.appLanguage === "ka") {
    return "Ka";
  } else {
    return "En";
  }
});

function langDropdown() {
  langOpen.value = !langOpen.value;
}

function langDown() {
  langOpen.value = false;
}

function changeLocale() {
  if (store.appLanguage === "en") {
    store.setAppLanguage("ka");
  } else {
    store.setAppLanguage("en");
  }
  langDown();
}

const movies = {
  interstellar: {
    name_year: "interstellar",
    quote: "interstellarQuote",
    bg: "bg-interstellar",
  },
  royal: {
    name_year: "tenenbaums",
    quote: "tenenbaumsQuote",
    bg: "bg-royal",
  },
  lotr: {
    name_year: "lotr",
    quote: "lotrQuote",
    bg: "bg-lotr",
  },
};
</script>
