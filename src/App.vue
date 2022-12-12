<template>
  <div :class="{ 'font-helvetica_eng': lang === 'en', 'font-helvetica_geo': lang === 'ka' }">
    <RouterView></RouterView>
  </div>
</template>

<style>
input[type="file"] {
  display: none;
}
</style>

<script setup>
import { ref, computed } from "vue";
import { RouterView } from "vue-router";
import i18n from "@/config/i18n";
const lang = computed(() => {
  return i18n.global.locale.value;
});
</script>
