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
  const user = {
    data: {},
    token: null,
  };
  const hello = ref("hello");
  const router = useRouter();
  const remember_me = ref(false);

  const register = async (user) => {
    console.log(user);
    try {
      let response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/register",
        user
      );
      console.log(response.status);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (user) => {
    try {
      const response = await axiosInstance.post(
        import.meta.env.VITE_APP_ROOT_API + "/login",
        user
      );
      authStore.authenticated = true;
      router.push({ name: "NewsFeed" });
    } catch (error) {
      console.log(user);
      console.log(error);
      alert(error.response);
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
      switchForgotToPassword();
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
      switchCreateToLogin();
      alert("Password Updated");
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data.msg);
    }
  };

  const setUser = (userData) => {
    user.token = userData.token;
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

  // Dialogs
  const registerOpen = ref(false);
  const authOpen = ref(false);
  const forgotOpen = ref(false);
  const checkOpen = ref(false);
  const passwordOpen = ref(false);
  const sentOpen = ref(false);
  const createOpen = ref(false);

  function closeRegister() {
    registerOpen.value = false;
  }
  function closeAuth() {
    authOpen.value = false;
  }
  function closeForgot() {
    forgotOpen.value = false;
  }
  function closeCheck() {
    checkOpen.value = false;
  }
  function closePassword() {
    passwordOpen.value = false;
  }
  function closeSent() {
    sentOpen.value = false;
  }
  function closeCreate() {
    createOpen.value = false;
  }
  function switchToLogin() {
    forgotOpen.value = false;
    registerOpen.value = false;
    authOpen.value = true;
  }
  function switchToRegister() {
    authOpen.value = false;
    registerOpen.value = true;
  }
  function switchToForgotPassword() {
    authOpen.value = false;
    forgotOpen.value = true;
  }
  function switchSentToLogin() {
    sentOpen.value = false;
    authOpen.value = true;
  }
  function switchCreateToLogin() {
    createOpen.value = false;
    authOpen.value = true;
  }
  function switchForgotToPassword() {
    forgotOpen.value = false;
    passwordOpen.value = true;
  }

  return {
    langOpen,
    langDropDown,
    langDown,
    changeLocale,
    currentLanguage,
    registerOpen,
    authOpen,
    forgotOpen,
    checkOpen,
    passwordOpen,
    sentOpen,
    createOpen,
    closeRegister,
    closeAuth,
    closeForgot,
    closeCheck,
    closePassword,
    closeSent,
    closeCreate,
    switchToLogin,
    switchToRegister,
    switchToForgotPassword,
    switchSentToLogin,
    switchCreateToLogin,
    login,
    resetErrors,
    logout,
    register,
    token,
    setUser,
    remember_me,
    resetRequest,
    updatePassword,
    hello,
    appLanguage,
    setAppLanguage,
  };
});
