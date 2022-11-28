<template>
  <main
    :class="{
      'h-screen':
        store.registerOpen ||
        store.authOpen ||
        store.forgotOpen ||
        store.checkOpen ||
        store.createOpen ||
        store.passwordOpen,
      'overflow-hidden':
        store.registerOpen ||
        store.authOpen ||
        store.forgotOpen ||
        store.checkOpen ||
        store.createOpen ||
        store.passwordOpen,
    }"
    class="lg:h-auto lg:overflow-auto"
  >
    <!--          Dialog  -->
    <dialog-component @close="store.closeRegister" :open="store.registerOpen">
      <register-component @login="store.switchToLogin"> </register-component>
    </dialog-component>
    <dialog-component @close="store.closeAuth" :open="store.authOpen">
      <auth-component
        @register="store.switchToRegister"
        @forgotPassword="store.switchToForgotPassword"
      ></auth-component>
    </dialog-component>
    <dialog-component @close="store.closeForgot" :open="store.forgotOpen">
      <forgot-password @login="store.switchToLogin"></forgot-password>
    </dialog-component>
    <dialog-component @close="store.closeCheck" :open="store.checkOpen">
      <check-component @close="store.closeCheck"></check-component>
    </dialog-component>
    <dialog-component @close="store.closePassword" :open="store.passwordOpen">
      <check-password @close="store.closePassword"></check-password>
    </dialog-component>
    <dialog-component @close="store.closeSent" :open="store.sentOpen">
      <sent-component></sent-component>
    </dialog-component>
    <dialog-component @close="store.closeCreate" :open="store.createOpen">
      <create-component @login="store.switchCreateToLogin"></create-component>
    </dialog-component>
    <!--            Dialog-->
    <div class="snap-y snap-mandatory h-screen overflow-scroll">
      <section class="text-white bg-darkBlue h-110 lg:h-screen font-helvetica snap-start">
        <header class="flex justify-between mx-8 items-center">
          <p class="mt-8 text-skinWhite">{{ $t("movieQuotes") }}</p>
          <nav class="flex lg:gap-4">
            <div class="lg:flex">
              <LanguageChange class="mt-8 mr-2" />
              <button
                @click="store.registerOpen = true"
                class="block mx-auto bg-niceRed px-6 py-1 rounded mt-6 hidden lg:block"
              >
                {{ $t("signUp") }}
              </button>
            </div>
            <button
              class="mr-2 mt-6 border py-1.5 px-5 rounded"
              @click="store.authOpen = true"
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
          class="snap-center"
          v-for="movie in movies"
          :key="movie.name_year"
          :quote="movie.quote"
          :year="movie.name_year"
          :bg="movie.bg"
        ></movie-component>
      </section>
    </div>
    <footer class="bg-footerBlue py-3 lg:p-4">
      <p class="text-white text-xxs ml-8 font-medium font-helvetica lg:text-xs">
        &#169; {{ $t("rightsReserved") }}
      </p>
    </footer>
  </main>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";

import MovieComponent from "@/components/landing_page/MovieComponent.vue";
import RegisterComponent from "@/components/landing_page/RegisterComponent.vue";
import AuthComponent from "@/components/landing_page/AuthComponent.vue";
import CheckComponent from "@/components/landing_page/CheckComponent.vue";
import CheckPassword from "@/components/landing_page/CheckPassword.vue";
import ForgotPassword from "@/components/landing_page/ForgotPassword.vue";
import SentComponent from "@/components/landing_page/SentComponent.vue";
import CreateComponent from "@/components/landing_page/CreateComponent.vue";

const store = useUserStore();


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
