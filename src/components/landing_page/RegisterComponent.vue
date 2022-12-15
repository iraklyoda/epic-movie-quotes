<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-16 text-2xl font-medium text-white lg:mt-16 lg:text-3xl">
        {{ $t("createAccount") }}
      </h2>
      <p class="mt-3 text-niceGrey">{{ $t("startJourney") }}</p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 lg:w-3/5" v-slot="{ errors }">
      <input-component
        name="username"
        :errors="errors.username"
        :label="$t('name')"
        :placeholder="$t('enterName')"
        :required="true"
        rules="required|min:3|max:15|alpha_num|lowercase"
      />
      <p
        class="mb-3 text-sm text-red-300 lg:text-base"
        v-if="store.usernameExists"
      >
        {{ $t(store.usernameExists) }}
      </p>
      <input-component
        name="email"
        :errors="errors.email"
        type="email"
        :label="$t('email')"
        :placeholder="$t('enterEmail')"
        :required="true"
        rules="required|email"
      />
      <p
        class="mb-3 text-sm text-red-300 lg:text-base"
        v-if="store.emailExists"
      >
        {{ $t(store.emailExists) }}
      </p>
      <input-component
        name="password"
        :errors="errors.password"
        :label="$t('password')"
        :placeholder="$t('password')"
        :type="passwordFieldType"
        :required="true"
        :visibility="true"
        rules="required|min:8|max:15|alpha_num|lowercase"
      >
        <button
          type="button"
          @click="switchVisibility"
          class="absolute right-2.5 top-2 scale-110 lg:top-3.5"
        >
          <visibility-icon />
        </button>
      </input-component>
      <input-component
        name="password_confirmation"
        :errors="errors.password_confirmation"
        :label="$t('confirmPassword')"
        :placeholder="$t('confirmYourPassword')"
        :type="passwordFieldType"
        :required="true"
        rules="required|confirmed:@password"
      >
        <button
          type="button"
          @click="switchVisibility"
          class="absolute right-2.5 top-2 scale-110 lg:top-3.5"
        >
          <visibility-icon />
        </button>
      </input-component>
      <p
        class="mb-3 text-xs text-red-300 lg:text-base"
        v-if="store.registerError"
      >
        {{ $t(store.registerError) }}
      </p>
      <button
        class="mt-1 w-full rounded-md bg-niceRed hover:bg-hoverRed py-1 text-white lg:p-2"
        :class="{ 'animate-spin': store.loading }"
      >
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
        {{ $t("alreadyHaveAnAccount") }}
        <button
          type="button"
          @click="router.push({ name: 'Login' })"
          class="text-BlueRibbon underline"
        >
          {{ $t("logIn") }}
        </button>
      </p>
    </Form>
  </dialog-component>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
const googleLogin = ref(import.meta.env.VITE_APP_ROOT_API + "/google/login");
import { useUserStore } from "@/stores/user.js";
import DialogComponent from "@/components/ui/DialogComponent.vue";
import router from "@/router";

const store = useUserStore();

const passwordFieldType = ref("password");
function switchVisibility() {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
}

function onSubmit(values) {
  store.register(values);
}

defineEmits(["login"]);
</script>
