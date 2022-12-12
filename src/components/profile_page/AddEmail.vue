<template>
  <router-link
    :to="{ name: 'ProfilePage' }"
    class="fixed top-0 left-0 z-10 hidden h-screen w-screen bg-black opacity-40 lg:block"
  >
  </router-link>
  <div
    class="z-20 lg:fixed lg:top-1/2 lg:left-1/2 lg:w-150 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:transform lg:bg-cinder"
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
      <section
        class="hidden bg-headerBlue py-10 px-9 lg:block lg:bg-transparent lg:pt-16"
      >
        <Form @submit="onSubmit">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <label for="username" class="pb-2">{{ $t("newEmail") }}</label>
              <Field
                v-model="email"
                name="email"
                id="email"
                :placeholder="$t('addNewEmail')"
                class="mb-4 rounded-md bg-lightGrey py-2 pl-2 text-black"
                rules="required|email"
              />
            </div>
            <ErrorMessage
              name="email"
              class="text-md text-red-300 lg:text-base"
            />
            <p
              class="text-md text-red-300 lg:text-base"
              v-if="profileStore.addEmailErrors"
            >
              {{ $t(profileStore.addEmailErrors) }}
            </p>
          </div>
          <div
            class="mt-24 flex items-center justify-between px-9 lg:mt-12 lg:justify-end lg:gap-4 lg:pb-4"
          >
            <router-link :to="{ name: 'ProfilePage' }">
              <p>{{ $t("cancel") }}</p>
            </router-link>
            <button
              class="rounded-lg bg-niceRed px-2 py-2"
              :class="{ 'animate-spin': profileStore.loading }"
            >
              {{ $t("add") }}
            </button>
          </div>
        </Form>
      </section>
      <section
        class="bg-headerBlue py-10 px-9 lg:hidden lg:bg-transparent lg:pt-16"
      >
        <Form @submit="onSubmitMobile">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <label for="username" class="pb-2">{{ $t("newEmail") }}</label>
              <Field
                v-model="email"
                name="email"
                id="email"
                :placeholder="$t('addNewEmail')"
                class="mb-4 rounded-md bg-lightGrey py-2 pl-2 text-black"
                rules="required|email"
              />
            </div>
            <ErrorMessage
              name="email"
              class="text-md text-red-300 lg:text-base"
            />
            <p
              class="text-md mt-2 text-red-300 lg:text-base"
              v-if="profileStore.addEmailErrors"
            >
              {{ $t(profileStore.addEmailErrors) }}
            </p>
          </div>
          <div
            class="mt-24 flex items-center justify-between px-9 lg:mt-12 lg:justify-end lg:gap-4 lg:pb-4"
          >
            <router-link :to="{ name: 'ProfilePage' }">
              <p>{{$t("cancel")}}</p>
            </router-link>
            <button
              class="rounded-lg bg-niceRed px-2 py-2"
              :class="{ 'animate-spin': profileStore.loading }"
            >
              {{ $t("add") }}
            </button>
          </div>
        </Form>
      </section>
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

function onSubmit(values) {
  console.log(values);
  submitted.value = true;
  const create = async () => {
    profileStore.loading = true;
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/create-email",
        {
          email: email.value,
        }
      );
      profileStore.loading = false;
      profileStore.successAddEmail = true;
      profileStore.getProfile();
      router.push({ name: "ProfilePage" });
    } catch (e) {
      console.log(e);
      profileStore.loading = false;
      if (e.response.data.message === "The email has already been taken.") {
        profileStore.addEmailErrors = "EmailBeenTaken";
        setTimeout(() => {
          profileStore.addEmailErrors = null;
        }, 3000);
      }
    }
  };
  create();
}

function onSubmitMobile(values) {
  console.log(values);
  const change = async () => {
    profileStore.loading = true;
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/create-email",
        {
          email: email.value,
        }
      );
      profileStore.loading = false;
      console.log(response);
      profileStore.successAddEmail = true;
      profileStore.getProfile();
      router.push({ name: "ProfileEmails" });
    } catch (e) {
      profileStore.loading = false;
      console.log(e);
      if (e.response.data.message === "The email has already been taken.") {
        profileStore.addEmailErrors = "EmailBeenTaken";
      }
    }
  };
  change();
  console.log();
}
</script>
