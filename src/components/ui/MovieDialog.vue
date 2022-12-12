<template>
  <div
    class="absolute top-0 left-0 flex h-auto w-full items-center justify-center overflow-hidden lg:h-screen"
  >
    <router-link
      class="fixed top-0 h-auto w-full lg:h-screen"
      :to="{ name: route, params: param }"
    >
    </router-link>
    <div class="lg:overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(["route", "param"]);
</script>
