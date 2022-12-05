<template>
  <nav class="py-8 pl-9">
    <router-link :to="{ name: 'ProfilePage' }">
      <LeftArrowIcon class="scale-125" />
    </router-link>
  </nav>
  <main v-if="!submitted">
    <section class="bg-headerBlue py-10 px-9">
      <Form @submit="onSubmit">
        <div class="flex flex-col">
          <label for="username" class="pb-2">{{
            $t("enterNewUsername")
          }}</label>
          <Field
            v-model="username"
            :placeholder="profileStore.user.username"
            name="username"
            id="username"
            class="rounded-md bg-lightGrey py-2 pl-2 text-black"
            rules="required|min:3|max:15|alpha_num|lowercase"
          />
        </div>
        <ErrorMessage name="username" class="mt-2" />
      </Form>
    </section>
    <div class="mt-24 flex items-center justify-between px-9">
      <router-link :to="{ name: 'ProfilePage' }">
        <p>Cancel</p>
      </router-link>
      <button @click="onSubmit" class="rounded-lg bg-red-500 px-2 py-2">
        Add
      </button>
    </div>
  </main>
  <section v-else class="mx-9 rounded-lg bg-headerBlue py-8">
    <p class="pt-8 text-center">Are you sure to make changes?</p>
    <div class="mt-8 border-b-2 border-fadeGrey"></div>
    <div class="mt-4 flex items-center justify-between px-9">
      <p @click="submitted = false" class="cursor-pointer">Cancel</p>
      <button class="rounded-lg bg-red-500 px-2 py-2" @click="changeName">
        Confirm
      </button>
    </div>
  </section>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "@/config/axios/jwtAxios.js";
import { useProfileStore } from "@/stores/profile.js";
import router from "@/router";
import { ref } from "vue";

const profileStore = useProfileStore();

const submitted = ref(false);
const username = ref("");

function onSubmit() {
  submitted.value = true;
}

function changeName() {
  axios
    .post(import.meta.env.VITE_APP_ROOT_API + "/profile/update-username", {
      username: username.value,
    })
    .then(function (response) {
      console.log(response);
      profileStore.getProfile();
      router.push({ name: "ProfilePage" });
      profileStore.usernameSuccess = true;
    })
    .catch(function (error) {
      console.log(error);
    });
  console.log();
}
</script>
