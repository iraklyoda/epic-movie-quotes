<template>
  <div class="ml-9 max-w-3xl lg:bg-cinder lg:rounded-xl lg:mb-4">
    <div class="lg:ml-6">
      <div class="mt-7 flex items-center gap-4 lg:pt-6">
        <img
          src="@/assets/images/user/profile_picture.png"
          alt="profile picture"
        />
        <p>Maia Nakashidze</p>
      </div>
      <figure class="mt-3.5">
        <figcaption class="text-sm sm:text-base">
          "Follow Your dream."movie- Billy Elliot. (2000)
        </figcaption>
        <img
          src="@/assets/images/user/movie_picture.png"
          alt="movie"
          class="w-11/12 max-w-3xl mt-4"
        />
      </figure>
      <section class="flex mt-5 text-xl items-center">
        <span>3</span>
        <comment-icon class="ml-3"></comment-icon>
        <span class="ml-6">10</span>
        <heart-icon class="ml-3"></heart-icon>
      </section>
      <div class="border-b-2 mt-4 border-fadeGrey w-11/12 max-w-3xl"></div>
      <comment-component></comment-component>
      <comment-component></comment-component>
      <section class="mt-4 flex w-11/12 max-w-3xl mb-4 lg:pb-6">
        <img
          src="@/assets/images/user/profile_picture.png"
          alt="profile picture"
        />
        <input
          placeholder="Write a comment"
          class="block ml-3 pl-4 w-full bg-footerBlue rounded-md"
        />
      </section>
    </div>
  </div>
  <div class="hidden lg:block lg:pb-1"></div>
  <div class="bg-headerBlue py-4 lg:hidden"></div>
</template>

<script setup>
import CommentComponent from "@/components/news_feed/CommentComponent.vue";
</script>
