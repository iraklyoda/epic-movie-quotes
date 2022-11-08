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

  const register = (user) => {
    console.log(user);
    axios
      .post("http://localhost:8000/api/register", user)
      .then(function (response) {
        console.log(response.status);
        router.push({
          name: "NewsFeed",
        });
      })
      .catch(function (error) {
        alert(error.response.data.message);
      });
  };

  const login = (user) => {
    console.log(user);
    axios
      .post("http://localhost:8000/api/login", user)
      .then(function (response) {
        alert("Login Successful!");
        setJwtToken(response.data.access_token, response.data.expires_in);
        router.push({ name: "NewsFeed" });
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
  };

  const logout = () => {
    axios
      .post("http://localhost:8000/api/logout")
      .then(function () {
        alert("Logout Successful!");
        document.cookie = `jwt_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        router.push({ name: "Landing" });
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.error);
      });
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
