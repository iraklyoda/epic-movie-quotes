import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useRouter, useRoute } from "vue-router";
import { setJwtToken } from "@/helpers/jwt/index.js";
import i18n from "@/config/i18n";
import { setLocale } from "@vee-validate/i18n";

export const useUserStore = defineStore("user", () => {
  const token = ref(false);
  const user = {
    data: {},
    token: null,
  };
  const hello = ref("hello");
  const router = useRouter();
  const route = useRoute();

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
      if (error.response !== undefined) {
        alert(error.response.data.message);
      }
    }
  };

  const login = async (user) => {
    try {
      console.log(user);
      let response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/login",
        user
      );
      alert("Login Successful!");
      if (remember_me.value) {
        setJwtToken(
          response.data.access_token,
          response.data.expires_in * 542141
        );
      } else {
        setJwtToken(response.data.access_token, response.data.expires_in);
      }
      router.push({ name: "NewsFeed" });
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  function logout() {
    document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    router.push({ name: "Landing" });
  }

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

  const setUser = (userData) => {
    user.token = userData.token;
  };

  const appLanguage = ref(
    localStorage.getItem("appLanguage") || i18n.global.locale.value
  );

  function setAppLanguage(lang) {
    appLanguage.value = lang;
    setLocale(lang);
    i18n.global.locale.value = lang;
    localStorage.setItem("appLanguage", lang);
  }

  // Dialogs
  const registerOpen = ref(false);
  const authOpen = ref(false);
  const forgotOpen = ref(false);
  const checkOpen = ref(false);
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

  return {
    registerOpen,
    authOpen,
    forgotOpen,
    checkOpen,
    sentOpen,
    createOpen,
    closeRegister,
    closeAuth,
    closeForgot,
    closeCheck,
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
    resetRequest,
    updatePassword,
    hello,
    appLanguage,
    setAppLanguage,
  };
});
