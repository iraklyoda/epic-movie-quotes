<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div
      class="mx-auto mt-20 h-96 w-5/6 rounded-xl bg-blueGradient py-4 lg:h-auto lg:bg-none lg:pb-12"
    >
      <check-email class="mx-auto mt-4 lg:mt-0"></check-email>
      <div class="text-center">
        <h2 class="mt-16 text-2xl font-medium text-white lg:mt-12 lg:text-3xl">
          {{ $t("checkYourEmail") }}
        </h2>
        <p class="mx-auto mt-3 w-5/6 text-white">
          {{ $t("passwordRecover") }}
        </p>
      </div>
      <button
        type="button"
        @click="router.push({ name: 'Landing' })"
        class="mx-auto mt-4 block w-48 rounded-md bg-niceRed py-1 text-white lg:w-4/5 lg:p-2"
      >
        {{ $t("goToMyEmail") }}
      </button>
    </div>
  </dialog-component>
</template>

<script setup>
import router from "@/router";
</script>
