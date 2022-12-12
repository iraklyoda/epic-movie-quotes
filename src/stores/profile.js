import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import axios from "@/config/axios/jwtAxios";

export const useProfileStore = defineStore("profile", () => {
  const user = ref([]);
  const profilePicture = ref("");
  const usernameEditOpen = ref(false);
  const successUsername = ref(false);
  const successPassword = ref(false);
  const successChanges = ref(false);
  const successAddEmail = ref(false);
  const successChangePrimaryEmail = ref(false);

  const addEmailErrors = ref(false);
  const changeUsernameErrors = ref(false);

  const loading = ref(false);
  const root = import.meta.env.VITE_APP_ROOT;

  const getProfile = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_APP_ROOT_API + "/me"
      );
      user.value = response.data.user;
      if (response.data.user.profile_picture.includes("https")) {
        profilePicture.value = response.data.user.profile_picture;
      } else {
        profilePicture.value = root + response.data.user.profile_picture;
      }
    } catch (e) {
      console.log(e);
    }
  };

  function makePrimary(id) {
    const primary = async (id) => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_APP_ROOT_API +
            "/profile/email/make-primary/" +
            id
        );
        getProfile();
        successChangePrimaryEmail.value = true;
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    primary(id);
  }

  function deleteEmail(id) {
    console.log("delete");
    const deleteMail = async (id) => {
      try {
        const response = await axios.post(
          import.meta.env.VITE_APP_ROOT_API + "/profile/email/delete/" + id
        );
        getProfile();
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    deleteMail(id);
  }
  onMounted(() => {
    getProfile();
  });
  return {
    user,
    getProfile,
    makePrimary,
    deleteEmail,
    loading,
    successUsername,
    successPassword,
    successChanges,
    successChangePrimaryEmail,
    usernameEditOpen,
    profilePicture,
    successAddEmail,
    addEmailErrors,
    changeUsernameErrors,
  };
});
