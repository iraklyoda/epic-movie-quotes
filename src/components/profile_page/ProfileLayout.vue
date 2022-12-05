<template>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";
import { onBeforeMount } from "vue";

const userStore = useProfileStore();
onBeforeMount(userStore.getProfile);
</script>
