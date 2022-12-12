<template>
  <div class="fixed w-full h-screen top-0 z-10" @click="router.push({name: 'Landing'})"></div>
  <div class="relative">
    <div
      class="absolute top-0 left-0 bg-fadeBlack w-full h-screen flex justify-center items-center"
    >
      <div
        class="w-screen h-screen bg-footerBlue lg:bg-SteelGray lg:w-150 lg:h-auto lg:pb-4 lg:-mt-8 lg:rounded-xl z-20"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import router from "@/router";

defineEmits(["close"]);
</script>
