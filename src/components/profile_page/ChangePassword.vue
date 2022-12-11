<template>
  <router-link :to="{ name: 'ProfilePage' }" class="hidden lg:block">
  </router-link>
  <div
    class="lg:top-1/4 lg:left-1/2 lg:w-150 lg:-translate-x-1/2 lg:transform lg:bg-cinder"
  >
    <nav class="py-8 pl-9 lg:py-6">
      <div class="lg:hidden">
        <router-link :to="{ name: 'ProfilePage' }">
          <LeftArrowIcon class="scale-125" />
        </router-link>
      </div>
      <div class="hidden lg:block">
        <p class="text-xl">Update password</p>
      </div>
    </nav>
    <div class="hidden border-b-2 border-fadeGrey lg:block"></div>
    <main v-if="!submitted">
      <section class="bg-headerBlue py-10 px-9 lg:bg-transparent lg:pt-16">
        <Form @submit="onSubmit">
          <div class="w-full rounded-md bg-cinder px-6 py-2 lg:bg-black">
            <p>{{ $t("passwordsShouldContain") }}</p>
            <div class="mt-4 flex items-center gap-2">
              <div
                class="h-1.5 w-1.5 rounded-full"
                :class="{
                  'bg-niceGrey': passwordInput.length < 8,
                  'bg-validGreen': passwordInput.length >= 8,
                }"
              ></div>
              <p
                class="text-sm"
                :class="{
                  'text-niceGrey': passwordInput.length < 8,
                  'text-white': passwordInput.length >= 8,
                }"
              >
                8 {{ $t("orMoreCharacters") }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <div
                class="h-1.5 w-1.5 rounded-full"
                :class="{
                  'bg-niceGrey':
                    passwordInput.length < 8 || passwordInput.length > 15,
                  'bg-validGreen':
                    passwordInput.length >= 8 && passwordInput.length <= 15,
                }"
              ></div>
              <p
                class="text-sm"
                :class="{
                  'text-niceGrey':
                    passwordInput.length < 8 || passwordInput.length > 15,
                  'text-white':
                    passwordInput.length >= 8 && passwordInput.length <= 15,
                }"
              >
                {{ $t("max") }} 15 {{ $t("characters") }}
              </p>
            </div>
          </div>
          <!--          Password-->
          <div class="mt-8">
            <div class="flex flex-col">
              <label for="password" class="pb-2">{{ $t("newPassword") }}</label>
              <Field
                v-model="passwordInput"
                type="password"
                name="new_password"
                id="username"
                class="rounded-md bg-lightGrey py-2 pl-2 text-black"
                rules="required|min:8|max:15|alpha_num|lowercase"
              />
            </div>
            <ErrorMessage
              name="new_password"
              class="text-md mt-3 text-red-300 lg:text-base"
            />
          </div>
          <div class="mt-4">
            <div class="flex flex-col">
              <label for="confirmation" class="pb-2">{{
                $t("confirmNewPassword")
              }}</label>
              <Field
                type="password"
                name="new_password_confirmation"
                id="confirmation"
                class="rounded-md bg-lightGrey py-2 pl-2 text-black"
                rules="required|confirmed:@new_password"
              />
            </div>
            <ErrorMessage
              name="new_password_confirmation"
              class="text-md mt-3 text-red-300 lg:text-base"
            />
          </div>
          <div
            class="mt-24 flex items-center justify-between px-9 lg:mt-12 lg:justify-end lg:gap-4 lg:pb-4"
          >
            <router-link :to="{ name: 'ProfilePage' }">
              <p>Cancel</p>
            </router-link>
            <button class="rounded-lg bg-red-500 px-2 py-2">Add</button>
          </div>
        </Form>
      </section>
    </main>
    <section
      v-else
      class="mx-9 rounded-lg bg-headerBlue py-8 lg:bg-transparent"
    >
      <p class="pt-8 text-center">{{$t('areYouSureToMakeChanges')}}</p>
      <div class="mt-8 border-b-2 border-fadeGrey"></div>
      <div class="mt-4 flex items-center justify-between px-9">
        <p @click="submitted = false" class="cursor-pointer">{{$t("cancel")}}</p>
        <button class="rounded-lg bg-red-500 px-2 py-2" @click="changePassword">
          {{$t("confirm")}}
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import { useRoute } from "vue-router";
import { ref } from "vue";
import axios from "@/config/axios/jwtAxios";
import router from "@/router";
import { useProfileStore } from "@/stores/profile";
const profileStore = useProfileStore();

const passwordInput = ref("");

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const submitted = ref(false);
const passwordValues = ref({});

function onSubmit(values) {
  submitted.value = true;
  passwordValues.value = values;

  console.log();
}

function changePassword() {
  const change = async () => {
    try {
      await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/update-user",
        passwordValues.value
      );
      profileStore.getProfile();
      profileStore.successPassword = true;
      router.push({ name: "ProfilePage" });
    } catch (e) {
      console.log(e);
    }
  };
  change();
}
</script>
