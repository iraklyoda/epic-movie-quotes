<template>
  <nav class="py-8 pl-9">
    <router-link :to="{ name: 'NewsFeed' }">
      <LeftArrowIcon class="scale-125" />
    </router-link>
  </nav>
  <SuccessComponent v-if="userStore.success"/>
  <section class="h-auto pb-12 bg-headerBlue">
    <div class="flex flex-col items-center">
      <img
        src="@/assets/images/user/profile_picture.png"
        alt="profile picture"
        class="w-40 pt-10"
      />
      <p class="pt-2 text-lg">{{ $t("uploadNewPhoto") }}</p>
    </div>
    <div class="px-9 pt-12">
      <p>{{ $t("username") }}</p>
      <div class="mt-1 flex justify-between">
        <p class="text-lg">{{ user.username }}</p>
        <router-link :to="{ name: 'ChangeName' }">
          <span class="text-niceGrey">Edit</span>
        </router-link>
      </div>
      <div class="mt-4 border-b-2 border-fadeGrey"></div>
    </div>
    <div class="px-9 pt-8">
      <p>{{ $t("password") }}</p>
      <div class="mt-1 flex justify-between">
        <p class="text-lg">●●●●●●●●●</p>
        <span class="text-niceGrey">Edit</span>
      </div>
      <div class="mt-4 border-b-2 border-fadeGrey"></div>
    </div>
  </section>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile.js";
import {ref} from "vue";

const userStore = useProfileStore();
const user = ref([]);
setTimeout(()=>{
  user.value = userStore.user;
},100);


</script>
