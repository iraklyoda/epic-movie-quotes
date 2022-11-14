import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "@/config/axios/index.js";
import { useRouter } from "vue-router";
import { setJwtToken } from "@/helpers/jwt/index.js";

export const useUserStore = defineStore("user", () => {
  const token = ref(false);
  const user = {
    data: {},
    token: null,
  };
  const router = useRouter();

  const register = async (user) => {
    console.log(user);
    try {
      let response = await axios.post(
        import.meta.env.VITE_APP_ROOT_API + "/register",
        user
      );
      console.log(response.status);
      setJwtToken(response.data.access_token, response.data.expires_in);
      router.push({ name: "NewsFeed" });
    } catch (error) {
      if (error.response !== undefined) {
        alert(error.response.data.message);
      }
    }
  };

  const login = async (user) => {
    try {
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

  const logout = async () => {
    try {
      await axios.post(import.meta.env.VITE_APP_ROOT_API + "/logout");
      alert("Logout Successful!");
      document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      router.push({ name: "Landing" });
    } catch (error) {
      console.log(error);
      alert(error.response.data.error);
    }
  };

  const setUser = (userData) => {
    user.token = userData.token;
  };

  return {
    login,
    logout,
    register,
    token,
    setUser,
  };
});
