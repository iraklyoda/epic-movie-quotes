import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
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

  const remember_me = ref(false);

  const register = async (user) => {
    console.log(user);
    try {
      let response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/register",
        user
      );
      console.log(response.status);
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
      setJwtToken(response.data.access_token, response.data.expires_in);
      router.push({ name: "NewsFeed" });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  function logout() {
    document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    router.push({ name: "Landing" });
  }

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

  return {
    login,
    logout,
    register,
    token,
    setUser,
    hello,
    appLanguage,
    setAppLanguage,
  };
});
