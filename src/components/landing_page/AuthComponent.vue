<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl font-medium text-white lg:mt-16 lg:text-3xl">
        {{ $t("logInToYourAccount") }}
      </h2>
      <p class="mt-3 text-niceGrey">{{ $t("welcomeBack") }}</p>
    </div>
    <Form @submit="onSubmit" class="mx-auto mt-8 w-4/5 lg:w-3/5" v-slot="{ errors }">
      <input-component
        name="username"
        :errors="errors.username"
        :label="$t('name')"
        :placeholder="$t('enterName')"
        :required="true"
        rules="required|min:3"
      />
      <input-component
        name="password"
        :errors="errors.password"
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
      <p class="mt-1 text-xs text-red-300 lg:text-base" v-if="loginError">
        {{ $t(loginError) }}
      </p>
      <div class="my-3 flex justify-between text-white">
        <div class="flex gap-2">
          <input
            @click="setRememberToken"
            type="checkbox"
            :value="true"
            name="remember_me"
            id="remember_token"
            class="accent-success"
          />
          <label for="remember_token" class="text-md"
            >{{ $t("rememberMe") }}
          </label>
        </div>
        <div class="text-BlueRibbon underline">
          <button
            type="button"
            @click="router.push({ name: 'ForgotPassword' })"
          >
            {{ $t("forgotPassword") }}
          </button>
        </div>
      </div>
      <button class="w-full rounded-md bg-niceRed hover:bg-hoverRed active:bg-activeRed py-1 text-white lg:p-2">
        {{ $t("getStarted") }}
      </button>
      <form :action="googleLogin">
        <button
          class="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md border py-1 text-white lg:p-2"
        >
          <google-icon class="mb-1" />
          <p>{{ $t("signUpGoogle") }}</p>
        </button>
      </form>
      <p class="mt-3 text-center text-niceGrey lg:mt-9">
        {{ $t("dontHaveAnAccount") }}
        <button
          type="button"
          @click="router.push({ name: 'Register' })"
          class="text-BlueRibbon underline"
        >
          {{ $t("signUp") }}
        </button>
      </p>
    </Form>
  </dialog-component>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";
import axiosInstance from "@/config/axios/jwtAxios";
import axios from "@/config/axios/index.js";
import Echo from "laravel-echo";
const authStore = useAuthStore();

const passwordFieldType = ref("password");
const googleLogin = ref(import.meta.env.VITE_APP_ROOT_API + "/google/login");

function switchVisibility() {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
}

const loginError = ref(null);
const login = async (user) => {
  try {
    const response = await axiosInstance.post(
      import.meta.env.VITE_APP_ROOT_API + "/login",
      user
    );
    authStore.authenticated = true;
    loginError.value = null;
    router.push({ name: "NewsFeed" });
  } catch (error) {
    console.log(error);
    const errorMessage = error.response.data.error;
    if (errorMessage === "Wrong email or password!") {
      loginError.value = "wrongUser";
    } else if (errorMessage === "Email is not verified") {
      loginError.value = "EmailIsNotVerified";
    } else if (errorMessage === "Non primary email is not verified") {
      loginError.value = "SecondaryEmailNotVerified";
    }
  }
};

function onSubmit(values) {
  login(values);
}
</script>
