<template>
  <div
    class="w-screen h-screen bg-footerBlue font-helvetica lg:bg-SteelGray lg:w-150 lg:h-auto lg:pb-4 lg:-mt-8 lg:rounded-xl"
  >
    <div class="h-0.5"></div>
    <div class="bg-blueGradient rounded-xl py-4 w-5/6 h-96 mt-20 mx-auto lg:bg-none lg:pb-12 lg:h-auto ">
      <check-email class="mx-auto mt-4 lg:mt-0"></check-email>
      <div class="text-center">
        <h2 class="mt-16 text-2xl text-white font-medium lg:text-3xl lg:mt-12">
          {{ $t("thankYou") }}
        </h2>
        <p class="mt-3 text-white w-5/6 mx-auto">
          {{ $t("checkMail") }}
        </p>
      </div>
      <button
        type="button"
        @click="$emit('close')"
        class="bg-niceRed py-1 w-48 block mx-auto mt-4 rounded-md text-white lg:p-2 lg:w-4/5"
      >
        {{ $t("goToMyEmail") }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineEmits(["close"]);
</script>
