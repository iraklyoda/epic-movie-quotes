<template>
  <section class="lg:top-18 absolute lg:right-20 z-20 w-full px-3 lg:w-auto">
    <div
      class="flex items-center justify-between gap-2 rounded-md bg-successGreen py-4 px-4"
    >
      <div class="flex items-center gap-2">
        <SuccessIcon />
        <p class="text-darkGreen">{{ msg }}</p>
      </div>
      <close-icon color="black" class="cursor-pointer" @click="closeAll" />
    </div>
  </section>
  <div
    class="absolute left-0 top-0 z-10 h-screen w-full bg-black opacity-40 lg:hidden"
    @click="closeAll"
  >

  </div>
</template>
<script setup>
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();

function closeAll() {
  profileStore.successUsername = false;
  profileStore.successPassword = false;
  profileStore.successChanges = false;
}

defineProps(["msg"]);
</script>
