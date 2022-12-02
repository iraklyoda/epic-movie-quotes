<template>
  <dialog-component>
    <div class="h-0.5"></div>
    <div class="text-center">
      <h2 class="mt-20 text-2xl text-white font-medium lg:text-3xl lg:mt-16">
        {{ $t("forgotPassword") }}?
      </h2>
      <p class="mt-3 text-niceGrey w-96 mx-auto">
        {{ $t("passwordResetInstructions") }}
      </p>
    </div>
    <Form @submit="onSubmit" class="mx-auto w-4/5 mt-8 lg:w-3/5">
      <input-component
        v-model="emailInput"
        name="email"
        type="email"
        :label="$t('email')"
        :placeholder="$t('enterEmail')"
        :required="true"
        rules="required|email"
      />
      <p class="text-red-300 text-xs lg:text-base -mt-2 mb-2">
        {{ error ? $t(error) : "" }}
      </p>
      <button class="bg-niceRed py-1 w-full rounded-md text-white lg:p-2">
        {{ $t("sendInstructions") }}
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
import { ref, onMounted, computed } from "vue";
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
  router.push({ name: "CheckPassword" });
  store.resetRequest(values);
  console.log(emailInput.value);
}
</script>
