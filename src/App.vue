<template>
  <RouterView></RouterView>
</template>

<style>
input[type="file"] {
  display: none;
}
</style>

<script setup>
import { RouterView } from "vue-router";

console.log(import.meta.env.VITE_APP_ROOT_API);
</script>
