<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl text-white font-medium lg:text-3xl lg:mt-16">
        {{ $t("logInToYourAccount") }}
      </h2>
      <p class="mt-3 text-niceGrey">{{ $t("welcomeBack") }}</p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 mt-8 lg:w-3/5">
      <input-component
        name="username"
        :label="$t('name')"
        :placeholder="$t('enterName')"
        :required="true"
        rules="required|min:3"
      />
      <input-component
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
      <p class="text-red-300 text-xs mt-1 lg:text-base" v-if="loginError">
        {{ $t(loginError) }}
      </p>
      <div class="flex justify-between my-3 text-white">
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

const loginError = ref("");
const login = async (user) => {
  try {
    const response = await axiosInstance.post(
      import.meta.env.VITE_APP_ROOT_API + "/login",
      user
    );
    console.log(response);
    authStore.authenticated = true;
    loginError.value = "";
    router.push({ name: "NewsFeed" });
  } catch (error) {
    console.log(error);
    if (error.response.data.error === "Wrong email or password!") {
      loginError.value = "wrongUser";
    }
  }
};

function onSubmit(values) {
  login(values);
}
</script>
