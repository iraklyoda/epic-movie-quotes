import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from "@/config/axios/jwtAxios";

export const useProfileStore = defineStore("profile", () => {
  const user = ref([]);
  const getProfile = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/me"
      );
      user.value = response.data.user;
      console.log(user.value);
    } catch (e) {
      console.log(e);
    }
  };
  const success = ref(true);
  return { user, getProfile, success };
});
