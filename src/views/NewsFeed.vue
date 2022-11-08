<template>
  <h1 class="text-4xl text-amber-600 text-center">
    Congrats! You are on happy page. Now make happy dances!
  </h1>
  <button type="button" @click="logout" >LogOut</button>
</template>

<script setup>
import { useUserStore } from "@/stores/user.js";
const store = useUserStore();



function logout() {
  store.logout();
}
</script>