import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from "@/config/axios/jwtAxios";

export const useProfileStore = defineStore("profile", () => {
  const user = ref([]);
  const profilePicture = ref("");
  const getProfile = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/me"
      );
      user.value = response.data.user;
      console.log(response.data);
      if (response.data.user.google_id) {
        profilePicture.value = response.data.user.profile_picture;
      } else {
        profilePicture.value = root + response.data.user.profile_picture;
      }
      console.log(user.value);
    } catch (e) {
      console.log(e);
    }
  };
  const usernameEditOpen = ref(false);

  const successUsername = ref(false);
  const successPassword = ref(false);
  const successChanges = ref(false);
  const successAddEmail = ref(false);

  const root = import.meta.env.VITE_APP_ROOT;

  onMounted(() => {
    getProfile();
  });
  return {
    user,
    getProfile,
    successUsername,
    successPassword,
    successChanges,
    usernameEditOpen,
    profilePicture,
    successAddEmail,
  };
});