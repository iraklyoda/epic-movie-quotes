<template>
  <router-view />
  <div
    class="lg:block"
    :class="{
      hidden:
        route.name === 'ChangeName' ||
        route.name === 'ChangePassword' ||
        route.name === 'ProfileEmails' ||
        route.name === 'AddEmail',
      'lg:hidden': route.name === 'ProfileEmails',
    }"
  >
    <nav class="py-8 pl-9 lg:hidden">
      <router-link :to="{ name: 'NewsFeed' }">
        <LeftArrowIcon class="scale-125" />
      </router-link>
    </nav>
    <p class="hidden pl-12 pt-8 text-xl lg:block">{{ $t("myProfile") }}</p>
    <!--    Success Messages-->
    <SuccessComponent
      v-if="userStore.successChanges"
      :msg="$t('changesMadeSuccessfully')"
    />
    <SuccessComponent
      v-if="userStore.successUsername"
      :msg="$t('usernameChangedSuccessfully')"
    />
    <SuccessComponent
      v-if="userStore.successPassword"
      :msg="$t('passwordChangedSuccessfully')"
    />
    <SuccessComponent
      v-if="userStore.successAddEmail"
      :msg="$t('pleaseCheckEmailToVerify')"
    />
    <SuccessComponent
      v-if="userStore.successChangePrimaryEmail"
      :msg="userStore.user.email + ' ' + $t('hasBeenSetAsPrimary')"
    />
    <!--    Success Messages-->
    <Form @submit="onSubmit">
      <div class="h-auto pb-12 lg:mt-16 lg:w-9/12">
        <section class="bg-headerBlue pb-12 lg:rounded-xl lg:bg-cinder">
          <!--        Profile Picture-->
          <div class="flex flex-col items-center">
            <img
              :src="userStore.profilePicture"
              alt="profile picture"
              class="mt-10 h-40 w-40 rounded-full object-cover object-center hover:animate-spin lg:-mt-14"
            />
            <Field
              v-slot="{ handleChange, handleBlur, value }"
              name="profile_picture"
              v-model="img"
            >
              <input
                type="file"
                @change="handleChange"
                @blur="handleBlur"
                id="profile_picture"
              />
              <label
                class="cursor-pointer pt-2 text-lg"
                for="profile_picture"
                >{{ $t("uploadNewPhoto") }}</label
              >
              <div v-if="value">
                {{ value.name }}
              </div>
            </Field>
          </div>
          <!--        Add Email -->
          <!--    Username-->
          <div class="px-9 pt-12 lg:pl-20">
            <p v-if="!editUsername">{{ $t("username") }}</p>
            <div v-if="!editUsername"
              class="mt-1 flex justify-between gap-6 lg:items-center lg:justify-start"
            >
              <p
                class="text-lg lg:w-8/12 lg:rounded-md lg:bg-lightGrey lg:py-2 lg:pl-4 lg:text-black"
              >
                {{ userStore.user.username }}
              </p>
              <!--          Mobile Version -->
              <router-link :to="{ name: 'ChangeName' }" class="lg:hidden">
                <span class="text-niceGrey lg:text-lightGrey">{{
                  $t("edit")
                }}</span>
              </router-link>
              <!--          Desktop -->
              <button
                type="button"
                class="hidden text-niceGrey lg:block lg:text-lightGrey"
                @click="editUsername = true"
                v-if="!editUsername"
              >
                {{ $t("edit") }}
              </button>
            </div>
            <div v-if="editUsername">
              <div class="flex flex-col mt-1">
                <label for="username" class="pb-2">{{
                  $t("enterNewUsername")
                }}</label>
                <Field
                  :placeholder="userStore.user.username"
                  name="username"
                  id="username"
                  class="mb-2 text-lg lg:w-8/12 lg:rounded-md lg:bg-lightGrey lg:py-2 lg:pl-4 lg:text-black"
                  rules="required|min:3|max:15|alpha_num|lowercase"
                />
              </div>
              <ErrorMessage
                name="username"
                class="text-md mt-3 text-red-300 lg:text-base"
              />
              <p
                v-if="userStore.changeUsernameErrors"
                class="text-md mt-3 text-red-300 lg:text-base"
              >
                {{ $t(userStore.changeUsernameErrors) }}
              </p>
            </div>

            <div
              class="mt-4 border-b-2 border-fadeGrey lg:mt-10 lg:w-10/12 lg:border-fadeLightGray"
            ></div>
          </div>
          <!--          Google Email-->
          <div class="px-9 pt-2 lg:pl-20" v-if="userStore.user.google_id">
            <p>{{ $t("email") }}</p>
            <div
              class="mt-1 flex justify-between gap-6 lg:items-center lg:justify-start"
            >
              <p
                class="text-lg lg:w-8/12 lg:rounded-md lg:bg-lightGrey lg:py-2 lg:pl-4 lg:text-black"
              >
                {{ userStore.user.email }}
              </p>
              <!--          Mobile Version -->
            </div>
          </div>
          <div
            class="relative flex items-center gap-6 py-4 pl-20 pr-8"
            v-if="userStore.user.google_id"
          ></div>
          <!--        Email-->
          <div
            class="hidden px-9 pt-12 lg:block lg:pl-20"
            v-if="!userStore.user.google_id"
          >
            <p>{{ $t("email") }}</p>
            <!--          Primary -->
            <div class="relative flex items-center gap-8">
              <p
                class="> text-lg lg:my-2 lg:w-8/12 lg:rounded-md lg:border lg:border-1 lg:border-validGreen lg:bg-fadeGreen lg:py-2 lg:pl-4 lg:text-white lg:text-black"
              >
                {{ userStore.user.email }}
              </p>
              <CheckValid class="right-24 top-4 -ml-14" />
              <span class="whitespace-nowrap text-niceGrey lg:text-lightGrey">{{
                $t("primaryMail")
              }}</span>
            </div>
            <!--          All emails-->
            <div
              class="relative flex items-center gap-6 py-4"
              v-for="email in userStore.user.emails"
              v-bind:key="email.id"
            >
              <div class="relative text-lg lg:w-8/12">
                <p
                  class="lg:rounded-md lg:py-2 lg:pl-4 lg:text-black"
                  :class="{
                    'lg:bg-lightGrey': email.is_email_verified === 1,
                    'lg:border lg:border-2 lg:border-carrotOrange lg:bg-carrotOrangeFade lg:text-white':
                      email.is_email_verified === 0,
                  }"
                >
                  {{ email.email }}
                </p>
                <AlertIcon
                  class="absolute right-3 top-4"
                  v-if="email.is_email_verified === 0"
                />
              </div>
              <button
                type="button"
                class="whitespace-nowrap text-niceGrey lg:text-lightGrey"
                v-if="email.is_email_verified === 1"
                @click="userStore.makePrimary(email.id)"
              >
                {{ $t("makeThisPrimary") }}
              </button>
              <span
                class="whitespace-nowrap text-niceGrey lg:text-lightGrey"
                v-if="email.is_email_verified === 0"
                >{{ $t("notVerified") }}</span
              >
              <button
                type="button"
                class="whitespace-nowrap text-niceGrey lg:text-lightGrey"
                @click="userStore.deleteEmail(email.id)"
              >
                {{ $t("remove") }}
              </button>
            </div>
            <router-link
              :to="{ name: 'AddEmail' }"
              class="mt-12 flex w-fit items-center gap-2 rounded-md border-2 border-white bg-transparent px-7 px-2 py-1.5 text-lg"
            >
              <AddIcon />
              <p>{{ $t("addEmail") }}</p>
            </router-link>
            <button type="button" @click="window.scrollTo(0, -1)"></button>
            <div
              class="mt-4 border-b-2 border-fadeGrey lg:mt-10 lg:w-10/12 lg:border-fadeLightGray"
            ></div>
          </div>
          <!--    Password-->
          <div class="px-9 pt-8 lg:pl-20" v-if="!userStore.user.google_id">
            <p>{{ $t("password") }}</p>
            <div
              class="mt-1 flex justify-between lg:items-center lg:justify-start lg:gap-6"
            >
              <p
                class="text-lg lg:w-8/12 lg:rounded-md lg:bg-lightGrey lg:py-2 lg:pl-4 lg:text-black"
              >
                ●●●●●●●●●
              </p>
              <!--            Mobile version-->
              <router-link :to="{ name: 'ChangePassword' }" class="lg:hidden">
                <span class="text-niceGrey lg:text-lightGrey">{{
                  $t("edit")
                }}</span>
              </router-link>
              <!--            Desktop Version -->
              <button
                class="hidden lg:block lg:text-lightGrey"
                type="button"
                @click="editPassword = true"
                v-if="!editPassword"
              >
                {{ $t("edit") }}
              </button>
            </div>
            <!--          Password -->
            <div v-if="editPassword" class="lg:w-8/12">
              <div
                class="w-full rounded-md border border-2 border-fadeLightGray bg-cinder px-6 py-2 lg:mt-6 lg:bg-transparent"
              >
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
              <div class="relative">
                <profile-input
                  v-model:modelValue="passwordInput"
                  id="new_password"
                  name="new_password"
                  :type="passwordFieldType"
                  :label="$t('newPassword')"
                  rules="required|min:8|max:15|alpha_num|lowercase"
                />
                <VisibilityIcon
                  class="absolute right-4 top-12 scale-125 cursor-pointer"
                  @click="switchVisibility"
                />
                <ErrorMessage name="new_password" class="text-red-400" />
              </div>
              <div class="relative">
                <profile-input
                  id="new_password_confirmation"
                  name="new_password_confirmation"
                  :type="passwordFieldType"
                  :label="$t('confirmNewPassword')"
                  rules="required|confirmed:@new_password"
                />
                <VisibilityIcon
                  class="absolute right-4 top-12 scale-125 cursor-pointer"
                  @click="switchVisibility"
                />
                <ErrorMessage
                  name="new_password_confirmation"
                  class="text-red-400"
                />
              </div>
            </div>
            <div class="mt-4 border-b-2 border-fadeGrey lg:hidden"></div>
            <!--    Mobile Email -->
            <div
              class="pt-8 lg:hidden lg:pl-20"
              v-if="!userStore.user.google_id"
            >
              <div class="flex items-center justify-between">
                <p>{{ $t("email") }}</p>
                <router-link :to="{ name: 'ProfileEmails' }">
                  <RightArrow />
                </router-link>
              </div>
            </div>
          </div>
        </section>
        <div
          class="mt-2 flex items-center justify-end gap-2"
          :class="{
            'hidden lg:flex': !img,
            'lg:hidden': !editUsername && !editPassword && !img,
            'lg:flex': editUsername || editPassword || img,
          }"
        >
          <button type="button" class="text-niceGrey" @click="cancel">
            {{ $t("cancel") }}
          </button>
          <button class="rounded-md bg-niceRed px-2 py-2">
            {{ $t("saveChanges") }}
          </button>
        </div>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import { useProfileStore } from "@/stores/profile.js";
import { usePageStore } from "@/stores/page.js";
import { useRoute } from "vue-router";
import { onBeforeMount, ref } from "vue";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import ProfileInput from "@/components/profile_page/ProfileInput.vue";
import axios from "@/config/axios/index.js";
import AddIcon from "@/components/icons/AddIcon.vue";
import RightArrow from "@/components/icons/RightArrow.vue";
import AlertIcon from "@/components/icons/AlertIcon.vue";
const route = useRoute();
const userStore = useProfileStore();
const pageStore = usePageStore();
pageStore.menuOpen = false;
const img = ref(null);

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const editUsername = ref(false);
const editPassword = ref(false);
const editPicture = ref(false);

const passwordInput = ref("");

function cancel() {
  passwordInput.value = "";
  editUsername.value = false;
  editPassword.value = false;
  editPicture.value = false;
  img.value = null;
}

// Passwords
const passwordFieldType = ref("password");
function switchVisibility() {
  passwordFieldType.value =
    passwordFieldType.value === "password" ? "text" : "password";
}

function onSubmit(values) {
  const update = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/profile/update-user",
        values,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      editUsername.value = false;
      editPassword.value = false;
      editPicture.value = false;
      img.value = null;
      userStore.getProfile();
      userStore.successChanges = true;
    } catch (e) {
      if (e.response.data.message === "The username has already been taken.") {
        userStore.changeUsernameErrors = "UsernameBeenTaken";
        setTimeout(() => {
          userStore.changeUsernameErrors = null;
        }, 3000);
      }
    }
  };
  update();
}

onBeforeMount(() => {
  userStore.getProfile();
});
</script>
