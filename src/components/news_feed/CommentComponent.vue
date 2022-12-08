<template>
  <div class="mt-7 flex items-center gap-4">
    <img
      :src="root + props.comment.author.profile_picture"
      alt="profile picture"
      class="h-10 w-10 rounded-full object-cover object-center"
    />
    <p>{{ props.comment.author.username }}</p>
  </div>
  <p class="mt-3 break-words lg:mt-1 lg:pl-14 lg:pr-12">
    {{ props.comment.body }}
  </p>
  <div class="mt-4 border-b-2 border-fadeGrey"></div>
</template>

<script setup>
import {ref} from "vue";
const root = ref(import.meta.env.VITE_APP_ROOT);
const props = defineProps(["comment"]);
if (props.comment.author.google_id) {
  root.value = "";
}
</script>
