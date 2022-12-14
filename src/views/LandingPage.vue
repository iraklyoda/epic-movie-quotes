<template>
  <main
    class="lg:h-auto lg:overflow-auto"
    :class="{
      'h-screen overflow-hidden':
        route.name === 'Login' || route.name === 'Register',
    }"
  >
    <!--          Dialog  -->
    <RouterView />
    <!--            Dialog-->
    <div class="h-screen overflow-scroll lg:snap-y lg:snap-mandatory">
      <section class="h-110 bg-darkBlue text-white lg:h-screen lg:snap-start">
        <header class="mx-8 flex items-center justify-between">
          <p class="mt-8 text-skinWhite">{{ $t("movieQuotes") }}</p>
          <nav class="flex lg:gap-4">
            <div class="lg:flex">
              <LanguageChange class="mt-8 mr-4 lg:mr-2" />
              <button
                @click="router.push({ name: 'Register' })"
                class="mx-auto mt-6 block hidden rounded bg-niceRed px-6 py-1 hover:bg-hoverRed active:bg-activeRed lg:block"
              >
                {{ $t("signUp") }}
              </button>
            </div>
            <button
              class="mr-2 mt-6 rounded border py-1.5 px-5"
              @click="router.push({ name: 'Login' })"
            >
              {{ $t("logIn") }}
            </button>
          </nav>
        </header>
        <p
          class="mx-auto mt-32 w-80 text-center text-xl font-bold text-skinWhite lg:mt-60 lg:w-176 lg:text-6xl lg:leading-22.5"
        >
          {{ $t("findAnyQuote") }}
        </p>
        <button
          @click="router.push({ name: 'Login' })"
          class="mx-auto mt-6 block rounded bg-niceRed px-3 py-1.5 hover:bg-hoverRed active:bg-activeRed lg:px-4 lg:py-2"
        >
          {{ $t("getStarted") }}
        </button>
        <h3></h3>
      </section>
      <section class="text-white">
        <movie-component
          class="lg:snap-center"
          v-for="movie in movies"
          :key="movie.name_year"
          :quote="movie.quote"
          :year="movie.name_year"
          :bg="movie.bg"
        ></movie-component>
      </section>
    </div>
    <footer class="bg-footerBlue py-3 lg:p-4">
      <p class="ml-8 text-xxs font-medium text-white lg:text-xs">
        &#169; {{ $t("rightsReserved") }}
      </p>
    </footer>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { RouterView, useRouter, useRoute } from "vue-router";
import MovieComponent from "@/components/landing_page/MovieComponent.vue";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.query.token && route.query) {
    router.push({
      name: "CreatePassword",
      params: { token: route.query.token, email: route.query.email },
    });
  }
});

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

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
