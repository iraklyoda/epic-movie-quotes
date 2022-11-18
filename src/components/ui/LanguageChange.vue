<template>
  <div class="hidden text-white lg:block">
    <div
      v-if="store.langOpen"
      class="absolute top-0 left-0 w-full h-screen flex justify-center items-center"
    >
      <div class="fixed w-full h-screen top-0" @click="store.langDown"></div>
      <div class="relative"></div>
    </div>
    <button
      @click="store.langDropDown"
      type="button"
      class="px-6 justify-center items-center gap-2 hidden lg:flex"
    >
      <p>{{ store.currentLanguage }}</p>
      <down-arrow
        class="transition-transform"
        :class="{ 'rotate-180': store.langOpen }"
      ></down-arrow>
    </button>
    <div v-if="store.langOpen" class="absolute hidden flex-col ml-6 lg:flex">
      <button type="button" @click="store.changeLocale">
        {{ store.currentLanguage === "En" ? "Ka" : "En" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();
</script>
