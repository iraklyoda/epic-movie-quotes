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
        <p class="mt-8 text-skinWhite">MOVIE QUOTES</p>
        <nav class="flex lg:gap-4">
          <div class="lg:flex">
            <button
              type="button"
              @click="changeLocale"
              class="px-6 py-1 justify-center items-center gap-2 mt-6 hidden lg:flex"
            >
              <p>Eng</p>
              <down-arrow></down-arrow>
            </button>
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
        &#169; 2022 MOVIE QUOTES. ALL RIGHTS RESERVED.
      </p>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";
import i18n from "@/config/i18n";

import MovieComponent from "@/components/landing_page/MovieComponent.vue";
import DialogComponent from "@/components/ui/DialogComponent.vue";
import RegisterComponent from "@/components/landing_page/RegisterComponent.vue";
import AuthComponent from "@/components/landing_page/AuthComponent.vue";

const registerOpen = ref(false);
const authOpen = ref(false);

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
function changeLocale() {
  if (i18n.global.locale.value === "en") {
    i18n.global.locale.value = "ka";
  } else {
    i18n.global.locale.value = "en";
  }
}

const movies = {
  interstellar: {
    name_year: "Interstellar, 2014",
    quote: "You have to leave something behind to go forward",
    bg: "bg-interstellar",
  },
  royal: {
    name_year: "The Royal Tenebaums, 2001",
    quote:
      "I think we’re just gonna have to be secretly in love with search other and leave it that",
    bg: "bg-royal",
  },
  lotr: {
    name_year: "The Lord of the Rings, 2003",
    quote:
      "I see in your eyes the same fear that would take the heart of me....",
    bg: "bg-lotr",
  },
};
</script>
