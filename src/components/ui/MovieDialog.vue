<template>
  <div
    class="absolute top-0 left-0 w-full h-auto flex overflow-scroll  justify-center items-center"
  >
    <router-link
      class="fixed top-0 h-auto w-full lg:h-screen"
      :to="{name: route, params: param}"
    >
    </router-link>
    <div class="relative max-h-176">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(["route", "param"]);
</script>
