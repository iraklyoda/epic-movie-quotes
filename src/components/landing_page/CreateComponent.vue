<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl font-medium text-white lg:mt-16 lg:text-3xl">
        {{ $t("createNewPassword") }}
      </h2>
      <p class="mx-auto mt-3 w-96 text-niceGrey">
        {{ $t("newPasswordMustBe") }}
      </p>
    </div>
    <Form
      @submit="onSubmit"
      class="mx-auto mt-8 w-4/5 lg:w-3/5"
      v-slot="{ errors }"
    >
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
      <button class="w-full rounded-md bg-niceRed py-1 text-white lg:p-2">
        {{ $t("resetPassword") }}
      </button>
      <button
        type="button"
        @click="router.push({ name: 'Login' })"
        class="my-8 flex w-full items-center justify-center gap-2"
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
    password_confirmation: values.password_confirmation,
    token: route.params.token,
  };
  store.updatePassword(newPassword);
}

defineEmits(["login"]);
</script>
