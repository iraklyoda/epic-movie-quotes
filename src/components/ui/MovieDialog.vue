<template>
  <div
    class="absolute top-0 left-0 w-full h-auto flex justify-center items-center"
  >
    <router-link
      class="fixed w-full h-auto lg:h-screen top-0"
      :to="{name: route}"
    >
    </router-link>
    <div class="relative">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(["route"]);
</script>
