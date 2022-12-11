<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl text-white font-medium lg:text-3xl lg:mt-16">
        {{ $t("createNewPassword") }}
      </h2>
      <p class="mt-3 text-niceGrey w-96 mx-auto">
        {{ $t("newPasswordMustBe") }}
      </p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 mt-8 lg:w-3/5" v-slot="{ errors }">
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
        name="confirmation"
        :errors="errors.confirmation"
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
      <button class="bg-niceRed py-1 w-full rounded-md text-white lg:p-2">
        {{ $t("resetPassword") }}
      </button>
      <button
        type="button"
        @click="router.push({ name: 'Login' })"
        class="w-full flex justify-center items-center gap-2 my-8"
      >
        <left-arrow-icon></left-arrow-icon>
        <span class="text-niceGrey">{{ $t("backToLogIn") }}</span>
      </button>
    </Form>
  </dialog-component>
</template>

<script setup>
import { Form } from "vee-validate";
import InputComponent from "@/components/ui/InputComponent.vue";
import { ref } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useRoute, useRouter } from "vue-router";
import DialogComponent from "@/components/ui/DialogComponent.vue";
const store = useUserStore();
const router = useRouter();

const route = useRoute();

function switchVisibility() {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
}
const passwordFieldType = ref("password");

function onSubmit(values) {
  const newPassword = {
    email: route.params.email,
    password: values.password,
    token: route.params.token,
  };
  console.log(values);
  console.log(route.params);
  console.log(newPassword);
  console.log(passwordFieldType.value);
  store.updatePassword(newPassword);
}

defineEmits(["login"]);
</script>
