import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import axiosInstance from "@/config/axios/jwtAxios.js";
import { useRouter } from "vue-router";
import i18n from "@/config/i18n";
import { setLocale } from "@vee-validate/i18n";

import { useAuthStore } from "@/stores/auth";

export const useUserStore = defineStore("user", () => {
  const authStore = useAuthStore();
  const token = ref(false);
  const hello = ref("hello");
  const router = useRouter();

  const registerError = ref("");
  const register = async (user) => {
    console.log(user);
    try {
      let response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/register",
        user
      );
      registerError.value = "";
      console.log(response.status);
    } catch (error) {
      console.log(error);
      registerError.value = "emailBusy";
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get(import.meta.env.VITE_APP_ROOT_API + "/logout");
      authStore.authenticated = false;
    } catch (err) {
      console.log(err);
    } finally {
      router.push({ name: "Landing" });
    }
  };

  const resetErrors = ref(null);

  const resetRequest = async (email) => {
    try {
      await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/forgot-password",
        email
      );
      resetErrors.value = null;
      alert("Email Sent");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.msg);
      resetErrors.value = error.response.data.msg;
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/reset-password",
        newPassword
      );
      alert("Password Updated");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.msg);
    }
  };

  // Change Language
  const langOpen = ref(false);
  const appLanguage = ref(
    localStorage.getItem("appLanguage") || i18n.global.locale.value
  );

  function langDropDown() {
    langOpen.value = !langOpen.value;
    console.log(langOpen.value);
  }

  function langDown() {
    langOpen.value = false;
  }

  function setAppLanguage(lang) {
    appLanguage.value = lang;
    setLocale(lang);
    i18n.global.locale.value = lang;
    localStorage.setItem("appLanguage", lang);
  }

  const currentLanguage = computed(() => {
    if (appLanguage.value === "ka") {
      return "Ka";
    } else {
      return "En";
    }
  });

  function changeLocale() {
    if (appLanguage.value === "en") {
      setAppLanguage("ka");
    } else {
      setAppLanguage("en");
    }
    langDown();
  }

  return {
    langOpen,
    langDropDown,
    langDown,
    changeLocale,
    currentLanguage,
    resetErrors,
    logout,
    register,
    token,
    resetRequest,
    updatePassword,
    hello,
    appLanguage,
    setAppLanguage,
    registerError,
  };
});
