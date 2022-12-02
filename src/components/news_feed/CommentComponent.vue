<template>
  <div class="mt-7 flex items-center gap-4">
    <img src="@/assets/images/user/profile_picture.png" alt="profile picture" />
    <p>{{ props.comment.author.username }}</p>
  </div>
  <p class="mt-3 lg:mt-1 lg:pl-14 break-words lg:pr-12">
    {{ props.comment.body }}
  </p>
  <div class="border-b-2 mt-4 border-fadeGrey"></div>
</template>

<script setup>
const props = defineProps(["comment"]);
</script>
