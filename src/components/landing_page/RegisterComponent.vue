<template>
  <div
    class="w-screen h-screen bg-footerBlue font-helvetica lg:bg-SteelGray lg:w-150 lg:h-auto lg:pb-4 lg:-mt-8 lg:rounded-xl"
  >
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-16 text-2xl text-white font-medium lg:text-3xl lg:mt-16">
        Create an account
      </h2>
      <p class="mt-3 text-niceGrey">Start your journey!</p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 lg:w-3/5">
      <input-component
        v-model="nameInput"
        name="name"
        label="Name"
        placeholder="Enter your name"
        :required="true"
        rules="required|min:3"
      />
      <input-component
        v-model="emailInput"
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        :required="true"
        rules="required|email"
      />
      <input-component
        v-model="passwordInput"
        name="password"
        label="Password"
        :type="passwordFieldType"
        placeholder="Password"
        :required="true"
        :visibility="true"
        rules="required"
      >
        <button
          @click="switchVisibility"
          class="absolute right-2.5 top-2 scale-110 lg:top-3.5"
        >
          <visibility-icon />
        </button>
      </input-component>
      <input-component
        name="confirmation"
        label="Confirm password"
        :type="passwordFieldType"
        placeholder="Confirm your password"
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
      <button class="bg-niceRed py-1 w-full rounded-md text-white lg:p-2">
        Get started
      </button>
      <button
        type="button"
        class="py-1 border w-full rounded-md text-white mt-4 flex items-center justify-center gap-1.5 lg:p-2"
      >
        <google-icon class="mb-1" />
        <p>Sign up with google</p>
      </button>
      <p class="text-center mt-3 text-niceGrey lg:mt-9">
        Already have an account?
        <button type="button" @click="$emit('login')" class="text-BlueRibbon underline">
          Log in
        </button>
      </p>
    </Form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form } from "vee-validate";
import InputComponent from "@/components/ui/InputComponent.vue";
import GoogleIcon from "@/components/icons/GoogleIcon.vue";

const nameInput = ref("");
const emailInput = ref("");
const passwordInput = ref("");
const passwordFieldType = ref("password");

function switchVisibility() {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
}

function onSubmit() {
  console.log("Happy User Making Happy Dance");
  console.log(nameInput.value, emailInput.value, passwordInput.value);
}

defineEmits(["login"]);
</script>
