<template>
  <div
    class="w-screen h-screen bg-footerBlue font-helvetica lg:bg-SteelGray lg:w-150 lg:h-auto lg:pb-4 lg:-mt-8 lg:rounded-xl"
  >
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl text-white font-medium lg:text-3xl lg:mt-16">
        {{ $t("logInToYourAccount") }}
      </h2>
      <p class="mt-3 text-niceGrey">{{ $t("welcomeBack") }}</p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 mt-8 lg:w-3/5">
      <input-component
        v-model="nameInput"
        name="name"
        :label="$t('name')"
        :placeholder="$t('enterName')"
        :required="true"
        rules="required|min:3"
      />
      <input-component
        v-model="passwordInput"
        name="password"
        :label="$t('password')"
        :placeholder="$t('password')"
        :type="passwordFieldType"
        :required="true"
        :visibility="true"
        rules="required"
      >
        <button
          type="button"
          @click="switchVisibility"
          class="absolute right-2.5 top-2 scale-110 lg:top-3.5"
        >
          <visibility-icon />
        </button>
      </input-component>
      <div class="flex justify-between my-3 text-white">
        <div class="flex gap-2">
          <input
            v-model="rememberMe"
            @click="setRememberToken"
            type="checkbox"
            :value="true"
            name="remember_token"
            id="remember_token"
            class="accent-success"
          />
          <label for="remember_token" class="text-md"
            >{{ $t("rememberMe") }}
          </label>
        </div>
        <div class="text-BlueRibbon underline">
          <button type="button" @click="$emit('forgotPassword')">
            {{ $t("forgotPassword") }}
          </button>
        </div>
      </div>
      <button class="bg-niceRed py-1 w-full rounded-md text-white lg:p-2">
        {{ $t("getStarted") }}
      </button>
      <form :action="googleLogin">
        <button
          class="py-1 border w-full rounded-md text-white mt-4 flex items-center justify-center gap-1.5 lg:p-2"
        >
          <google-icon class="mb-1" />
          <p>{{ $t("signUpGoogle") }}</p>
        </button>
      </form>
      <p class="text-center mt-3 text-niceGrey lg:mt-9">
        {{ $t("dontHaveAnAccount") }}
        <button
          type="button"
          @click="$emit('register')"
          class="text-BlueRibbon underline"
        >
          {{ $t("signUp") }}
        </button>
      </p>
    </Form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Form } from "vee-validate";
import InputComponent from "@/components/ui/InputComponent.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";

import { useUserStore } from "@/stores/user.js";

const store = useUserStore();


const nameInput = ref("");
const passwordInput = ref("");
const passwordFieldType = ref("password");
const rememberMe = ref(false);
const googleLogin = ref(import.meta.env.VITE_APP_ROOT_API + "/google/login");


function setRememberToken() {
  store.rememberMe = !store.rememberMe;
}

function switchVisibility() {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
}

function onSubmit() {
  console.log("Happy User Making Happy Dance");
  const user = {
    username: nameInput.value,
    password: passwordInput.value,
    remember_me: rememberMe.value,
  };

  store.login(user);
}

defineEmits(["register", "forgotPassword"]);
</script>
