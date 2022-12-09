<template>
  <SuccessComponent
    v-if="userStore.successAddEmail"
    msg="Please check email to verify new address"
  />
  <div>
    <nav class="py-8 pl-9">
      <router-link :to="{ name: 'ProfilePage' }">
        <LeftArrowIcon class="scale-125" />
      </router-link>
    </nav>
    <main class="bg-headerBlue pb-8">
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
        <div class="mt-4 border-b-2 border-fadeGrey"></div>
        <!--          All emails-->
        <div v-for="email in userStore.user.emails" v-bind:key="email.id">
          <div class="relative flex items-center gap-6 py-8">
            <p
              class="w-full rounded-md py-2 text-lg"
              :class="{
                'bg-lightGrey pl-4 text-black': email.is_email_verified === 1,
                'text-white': email.is_email_verified === 0,
              }"
            >
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
              @click="userStore.makePrimary(email.id)"
            >
              <span>Make this primary</span>
            </button>
            <button
              type="button"
              @click="userStore.deleteEmail(email.id)"
              class="cursor-pointer whitespace-nowrap text-lg text-niceGrey lg:text-lightGrey"
            >
              Remove
            </button>
          </div>
          <div
            class="flex justify-between"
            v-if="email.is_email_verified === 0"
          >
            <div
              v-if="email.is_email_verified === 0"
              class="flex items-center gap-2"
            >
              <AlertIcon />
              <span
                class="whitespace-nowrap text-lg italic text-carrotOrange lg:text-lightGrey"
              >
                Not verified</span
              >
            </div>
            <button
              type="button"
              @click="userStore.deleteEmail(email.id)"
              class="cursor-pointer whitespace-nowrap text-lg text-niceGrey lg:text-lightGrey"
            >
              Remove
            </button>
          </div>
          <div class="mt-4 border-b-2 border-fadeGrey"></div>
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
import AlertIcon from "@/components/icons/AlertIcon.vue";
const userStore = useProfileStore();
</script>
