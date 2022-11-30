<template>
  <div class="mt-7 flex items-center gap-4 ">
    <img src="@/assets/images/user/profile_picture.png" alt="profile picture" />
    <p>Maia Nakashidze</p>
  </div>
  <p class="w-5/6 mt-3 lg:ml-14">
    {{props.comment.body}}
  </p>
  <div class="border-b-2 mt-4 border-fadeGrey "></div>
</template>

<script setup>
const props = defineProps(["comment"]);
</script>