<template>
  <section class="absolute z-20 w-full px-3">
    <div
      class="flex items-center justify-between gap-2 rounded-md bg-successGreen py-4 px-4"
    >
      <div class="flex items-center gap-2">
        <SuccessIcon />
        <p class="text-darkGreen">Username changed successfully</p>
      </div>
      <close-icon color="black" class="cursor-pointer" @click="profileStore.success = false" />
    </div>
  </section>
  <div
    class="absolute left-0 top-0 z-10 h-screen w-full bg-black opacity-40"
    @click="profileStore.success = false"
  ></div>
</template>
<script setup>
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();
</script>
