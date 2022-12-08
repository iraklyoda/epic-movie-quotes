<template>
  <router-link
    :to="{ name: 'ProfilePage' }"
    class="absolute top-0 left-0 z-10 hidden h-screen w-screen bg-black opacity-40 lg:block"
  >
  </router-link>
  <div
    class="z-20 lg:absolute lg:top-1/4 lg:left-1/2 lg:w-150 lg:-translate-x-1/2 lg:transform lg:bg-cinder"
  >
    <nav class="py-8 pl-9 lg:py-6">
      <div class="lg:hidden">
        <router-link :to="{ name: 'ProfilePage' }">
          <LeftArrowIcon class="scale-125" />
        </router-link>
      </div>
      <div class="hidden lg:block">
        <p class="text-xl">{{ $t("addNewEmail") }}</p>
      </div>
    </nav>
    <div class="hidden border-b-2 border-fadeGrey lg:block"></div>
    <main>
      <section class="bg-headerBlue py-10 px-9 lg:bg-transparent lg:pt-16">
        <Form @submit="onSubmit">
          <div class="flex flex-col">
            <label for="username" class="pb-2">{{ $t("newEmail") }}</label>
            <Field
              v-model="email"
              name="email"
              id="email"
              :placeholder="$t('addNewEmail')"
              class="rounded-md bg-lightGrey py-2 pl-2 text-black"
              rules="required|email"
            />
          </div>
          <ErrorMessage name="email" class="mt-2" />
        </Form>
      </section>
      <div
        class="mt-24 flex items-center justify-between px-9 lg:mt-12 lg:justify-end lg:gap-4 lg:pb-4"
      >
        <router-link :to="{ name: 'ProfilePage' }">
          <p>Cancel</p>
        </router-link>
        <button @click="changeName()" class="hidden lg:block rounded-lg bg-red-500 px-2 py-2">
          Add
        </button>
        <button @click="changeNameMobile()" class="lg:hidden rounded-lg bg-red-500 px-2 py-2">
          Add
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage } from "vee-validate";
import axios from "@/config/axios/jwtAxios.js";
import { useProfileStore } from "@/stores/profile.js";
import router from "@/router";
import { useRoute } from "vue-router";
import { ref } from "vue";

const profileStore = useProfileStore();
const route = useRoute();

const submitted = ref(false);
const email = ref("");

function onSubmit() {
  submitted.value = true;
}

function changeName() {
  const change = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/create-email",
        {
          email: email.value,
        }
      );
      console.log(response);
      profileStore.successAddEmail = true;
      profileStore.getProfile();
      router.push({ name: "ProfilePage" });
    } catch (e) {
      console.log(e);
    }
  };
  change();
  console.log();
}

function changeNameMobile() {
  const change = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/create-email",
        {
          email: email.value,
        }
      );
      console.log(response);
      profileStore.successAddEmail = true;
      profileStore.getProfile();
      router.push({ name: "ProfileEmails" });
    } catch (e) {
      console.log(e);
    }
  };
  change();
  console.log();
}
</script>
