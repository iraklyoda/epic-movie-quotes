import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from "@/config/axios/jwtAxios";

export const useProfileStore = defineStore("profile", () => {
  const user = ref([]);

  const getProfile = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/profile"
      );
      user.value = response.data;
      console.log(user.value);
    } catch (e) {
      console.log(e);
    }
  };
  return { user, getProfile };
});
