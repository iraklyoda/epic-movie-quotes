<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-16 text-2xl text-white font-medium lg:text-3xl lg:mt-16">
        {{ $t("createAccount") }}
      </h2>
      <p class="mt-3 text-niceGrey">{{ $t("startJourney") }}</p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 lg:w-3/5">
      <input-component
        v-model="nameInput"
        name="username"
        :label="$t('name')"
        :placeholder="$t('enterName')"
        :required="true"
        rules="required|min:3|max:15|alpha_num|lowercase"
      />
      <input-component
        v-model="emailInput"
        name="email"
        type="email"
        :label="$t('email')"
        :placeholder="$t('enterEmail')"
        :required="true"
        rules="required|email"
      />
      <input-component
        v-model="passwordInput"
        name="password"
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
        name="confirmation"
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
        class="text-red-300 text-xs mb-3 lg:text-base"
        v-if="store.registerError"
      >
        {{ $t(store.registerError) }}
      </p>
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
const nameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
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
  const user = {
    username: values.username,
    email: values.email,
    password: values.password,
  };
  store.register(user);
  router.push({name: "CheckEmail"});
}


defineEmits(["login"]);
</script>
