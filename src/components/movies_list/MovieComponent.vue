<template>
  <figure class="mt-6 lg:mt-2">
    <router-link :to="{ name: 'MoviePage', params: { id: id } }">
      <img
        :src="root + img"
        alt="Good Time"
        class="w-full h-80 object-cover hover:scale-95 transition-transform rounded-xl"
      />
    </router-link>
    <figcaption class="my-4">{{ title }}</figcaption>
    <div class="flex gap-2">
      <p>10</p>
      <ChatIcon />
    </div>
  </figure>
</template>
<script setup>
const root = import.meta.env.VITE_APP_ROOT;

defineProps({
  title: {
    required: true,
  },
  img: {
    required: true,
  },
  id: {
    required: true,
  },
});
</script>
