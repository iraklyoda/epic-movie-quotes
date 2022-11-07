<template>
  <div
    v-if="open"
    class="absolute top-0 left-0 bg-fadeBlack w-full h-screen flex justify-center items-center"
  >
    <div class="fixed w-full h-screen top-0" @click="$emit('close')"></div>
    <div class="relative">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(["open"]);
defineEmits(["close"]);
</script>
