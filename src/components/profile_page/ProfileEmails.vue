<template>
  <SuccessComponent
    v-if="userStore.successAddEmail"
    msg="Please check email to verify new address"
  />
  <div>
    <nav class="py-8 pl-9 lg:hidden">
      <router-link :to="{ name: 'ProfilePage' }">
        <LeftArrowIcon class="scale-125" />
      </router-link>
    </nav>
    <main class="bg-headerBlue">
      <!--        Email-->
      <div class="block px-9 pt-12" v-if="!userStore.user.google_id">
        <p>Primary Email</p>
        <!--          Primary -->
        <div class="relative flex items-center gap-8">
          <p
            class="> my-2 w-full rounded-md border border-1 border-validGreen bg-fadeGreen py-2 pl-4 text-lg"
          >
            {{ userStore.user.email }}
          </p>
          <CheckValid class="right-24 top-4 -ml-14" />
        </div>
        <div
          class="mt-4 border-b-2 border-fadeGrey lg:mt-10 lg:w-10/12 lg:border-fadeLightGray"
        ></div>
        <!--          All emails-->
        <div v-for="email in userStore.user.emails" v-bind:key="email.id">
          <div class="relative flex items-center gap-6 py-8">
            <p
              class="w-full rounded-md py-2 pl-4 text-lg"
              :class="{
                'bg-lightGrey text-black': email.is_email_verified === 1,
                'border border-2 border-carrotOrange bg-carrotOrangeFade text-white':
                  email.is_email_verified === 0,
              }"
            >
              <AlertIcon
                v-if="email.is_email_verified === 0"
                class="absolute right-3 top-12"
              />
              {{ email.email }}
            </p>
          </div>
          <div
            class="flex items-center justify-between"
            v-if="email.is_email_verified === 1"
          >
            <button
              type="button"
              class="flex w-fit items-center gap-2 rounded-md border-2 border-white bg-transparent px-3 py-1 text-lg"
              v-if="email.is_email_verified === 1"
              @click="makePrimary(email.id)"
            >
              <span>Make this primary</span>
            </button>
            <span
              class="whitespace-nowrap text-lg text-niceGrey lg:text-lightGrey"
              >Remove</span
            >
          </div>
          <div
            class="flex justify-between"
            v-if="email.is_email_verified === 0"
          >
            <span
              class="whitespace-nowrap text-lg text-niceGrey lg:text-lightGrey"
              v-if="email.is_email_verified === 0"
              >Not verified</span
            >
            <span
              class="whitespace-nowrap text-lg text-niceGrey lg:text-lightGrey"
              >Remove</span
            >
          </div>
          <div
            class="mt-4 border-b-2 border-fadeGrey lg:mt-10 lg:w-10/12 lg:border-fadeLightGray"
          ></div>
        </div>
        <router-link
          :to="{ name: 'AddEmail' }"
          class="mt-12 flex w-fit items-center gap-2 rounded-md border-2 border-white bg-transparent px-7 px-2 py-1.5 text-lg"
        >
          <AddIcon />
          <p>Add Email</p>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useProfileStore } from "@/stores/profile.js";
import axios from "@/config/axios";
const userStore = useProfileStore();

function makePrimary(id) {
  const primary = async (id) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/email/make-primary/" + id
      );
      userStore.getProfile();
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };
  primary(id);
}
</script>
