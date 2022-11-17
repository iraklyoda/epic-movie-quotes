<template>
  <div
    class="w-screen h-screen bg-footerBlue font-helvetica lg:bg-SteelGray lg:w-150 lg:h-auto lg:pb-4 lg:-mt-8 lg:rounded-xl"
  >
    <div class="h-0.5"></div>
    <div
      class="bg-blueGradient rounded-xl py-4 w-5/6 h-96 mt-20 mx-auto lg:bg-none lg:pb-12 lg:h-auto"
    >
      <email-sent class="mx-auto mt-20 lg:mt-0"></email-sent>
      <div class="text-center">
        <h2 class="mt-4 text-2xl text-white font-medium lg:text-3xl lg:mt-12">
          {{ $t("thankYou") }}!
        </h2>
        <p class="mt-5 text-white w-5/6 mx-auto">
          {{ $t("accountActivated") }}
        </p>
      </div>
      <button
        type="button"
        @click="store.switchSentToLogin"
        class="bg-niceRed py-1.5 w-48 block mx-auto mt-6 rounded-md text-white lg:p-2"
      >
        {{ $t("logIn") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
</script>