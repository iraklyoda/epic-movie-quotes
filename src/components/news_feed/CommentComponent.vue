<template>
  <div class="pr-16">
    <div class="mt-5 flex items-center gap-4">
      <img
        :src="profilePicture"
        alt="profile picture"
        class="h-10 w-10 rounded-full object-cover object-center"
      />
      <div>
        <p>{{ props.comment.author.username }}</p>
        <p class="mt-3 break-words lg:mt-1 lg:pr-12">
          {{ props.comment.body }}
        </p>
      </div>
    </div>
    <div class="mt-4 w-full w-full border-b-2 border-fadeGrey"></div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const root = ref(import.meta.env.VITE_APP_ROOT);
const props = defineProps(["comment"]);

const profilePicture = computed(() => {
  if (props.comment.author.profile_picture.includes("https")) {
    return props.comment.author.profile_picture;
  } else {
    return root.value + props.comment.author.profile_picture;
  }
});
</script>
