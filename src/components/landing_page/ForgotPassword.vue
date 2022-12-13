<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl font-medium text-white lg:mt-16 lg:text-3xl">
        {{ $t("forgotPassword") }}?
      </h2>
      <p class="mx-auto mt-3 w-96 text-niceGrey">
        {{ $t("passwordResetInstructions") }}
      </p>
    </div>
    <Form
      @submit="onSubmit"
      class="mx-auto mt-8 w-4/5 lg:w-3/5"
      v-slot="{ errors }"
    >
      <input-component
        v-model="emailInput"
        :errors="errors.email"
        name="email"
        type="email"
        :label="$t('email')"
        :placeholder="$t('enterEmail')"
        :required="true"
        rules="required|email"
      />
      <p class="-mt-2 mb-2 text-xs text-red-300 lg:text-base">
        {{ error ? $t(error) : "" }}
      </p>
      <button class="w-full rounded-md bg-niceRed py-1 text-white lg:p-2"
      :class="{'animate-spin': store.loading}">
        {{ $t("sendInstructions") }}
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
import { ref, computed } from "vue";
const emailInput = ref("");
import { useUserStore } from "@/stores/user.js";
import DialogComponent from "@/components/ui/DialogComponent.vue";
import router from "@/router";
const store = useUserStore();

const error = computed(() => {
  if (store.resetErrors === "User not found") {
    return "userNotFound";
  }
  return false;
});

function onSubmit(values) {
  store.loading = true;
  store.resetRequest(values);
  console.log(emailInput.value);
}
</script>
