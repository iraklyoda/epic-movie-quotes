<template>
  <figure class="h-110 bg-hero bg-no-repeat bg-cover bg-center lg:h-300 lg:bg-fixed" :class="bgClass">
    <div class="h-1"></div>
    <div class="flex mt-44 lg:mt-160 gap-2 ml-9 lg:ml-44">
      <div class="w-4 h-0.5 bg-white mt-2.5 lg:w-8"></div>
      <div class="font-bold">
        <h2 class="text-xl w-72 lg:text-5xl lg:w-245">"{{ quote }}"</h2>
        <p class="mt-2 lg:text-3xl">{{ year }}</p>
      </div>
    </div>
  </figure>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps(["year", "quote", "bg"]);

const bgClass = computed(() => {
  if (props.bg === "bg-lotr") {
    return props.bg + " bg-right";
  } else {
    return props.bg;
  }
});
</script>
