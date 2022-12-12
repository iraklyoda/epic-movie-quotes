<template>
  <div class="hidden text-white lg:block">
    <div
      v-if="store.langOpen"
      class="absolute top-0 left-0 flex h-screen w-full items-center justify-center"
    >
      <div class="fixed top-0 h-screen w-full" @click="store.langDown"></div>
      <div class="relative"></div>
    </div>
    <button
      @click="store.langDropDown"
      type="button"
      class="hidden items-center justify-center gap-2 px-6 lg:flex"
    >
      <p>{{ store.currentLanguage }}</p>
      <down-arrow
        class="transition-transform"
        :class="{ 'rotate-180': store.langOpen }"
      ></down-arrow>
    </button>
    <div v-if="store.langOpen" class="absolute ml-6 hidden flex-col lg:flex">
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
